import { afterEach, describe, expect, it, vi } from "vitest";
import { captureFullEnv } from "../test-utils/env.js";
import { SUPERVISOR_HINT_ENV_VARS } from "./supervisor-markers.js";

const spawnMock = vi.hoisted(() => vi.fn());
const triggerCrabforkRestartMock = vi.hoisted(() => vi.fn());

vi.mock("node:child_process", async () => {
  const { mockNodeBuiltinModule } = await import("../../test/helpers/node-builtin-mocks.js");
  return mockNodeBuiltinModule(
    () => vi.importActual<typeof import("node:child_process")>("node:child_process"),
    {
      spawn: (...args: unknown[]) => spawnMock(...args),
    },
  );
});
vi.mock("./restart.js", () => ({
  triggerCrabforkRestart: (...args: unknown[]) => triggerCrabforkRestartMock(...args),
}));

import { restartGatewayProcessWithFreshPid } from "./process-respawn.js";

const originalArgv = [...process.argv];
const originalExecArgv = [...process.execArgv];
const envSnapshot = captureFullEnv();
const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");

function setPlatform(platform: string) {
  if (!originalPlatformDescriptor) {
    return;
  }
  Object.defineProperty(process, "platform", {
    ...originalPlatformDescriptor,
    value: platform,
  });
}

afterEach(() => {
  envSnapshot.restore();
  process.argv = [...originalArgv];
  process.execArgv = [...originalExecArgv];
  spawnMock.mockClear();
  triggerCrabforkRestartMock.mockClear();
  if (originalPlatformDescriptor) {
    Object.defineProperty(process, "platform", originalPlatformDescriptor);
  }
});

function clearSupervisorHints() {
  for (const key of SUPERVISOR_HINT_ENV_VARS) {
    delete process.env[key];
  }
}

function expectLaunchdSupervisedWithoutKickstart(params?: { launchJobLabel?: string }) {
  setPlatform("darwin");
  if (params?.launchJobLabel) {
    process.env.LAUNCH_JOB_LABEL = params.launchJobLabel;
  }
  process.env.CRABFORK_LAUNCHD_LABEL = "ai.crabfork.gateway";
  const result = restartGatewayProcessWithFreshPid();
  expect(result).toEqual({ mode: "supervised" });
  expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
  expect(spawnMock).not.toHaveBeenCalled();
}

describe("restartGatewayProcessWithFreshPid", () => {
  it("returns disabled when CRABFORK_NO_RESPAWN is set", () => {
    process.env.CRABFORK_NO_RESPAWN = "1";
    const result = restartGatewayProcessWithFreshPid();
    expect(result.mode).toBe("disabled");
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("keeps CRABFORK_NO_RESPAWN ahead of inherited supervisor hints", () => {
    clearSupervisorHints();
    setPlatform("darwin");
    process.env.CRABFORK_NO_RESPAWN = "1";
    process.env.LAUNCH_JOB_LABEL = "ai.crabfork.gateway";

    const result = restartGatewayProcessWithFreshPid();

    expect(result).toEqual({ mode: "disabled" });
    expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("returns supervised when launchd hints are present on macOS (no kickstart)", () => {
    clearSupervisorHints();
    expectLaunchdSupervisedWithoutKickstart({ launchJobLabel: "ai.crabfork.gateway" });
  });

  it("returns supervised on macOS when launchd label is set (no kickstart)", () => {
    expectLaunchdSupervisedWithoutKickstart({ launchJobLabel: "ai.crabfork.gateway" });
  });

  it("launchd supervisor never returns failed regardless of triggerCrabforkRestart outcome", () => {
    clearSupervisorHints();
    setPlatform("darwin");
    process.env.CRABFORK_LAUNCHD_LABEL = "ai.crabfork.gateway";
    // Even if triggerCrabforkRestart *would* fail, launchd path must not call it.
    triggerCrabforkRestartMock.mockReturnValue({
      ok: false,
      method: "launchctl",
      detail: "Bootstrap failed: 5: Input/output error",
    });
    const result = restartGatewayProcessWithFreshPid();
    expect(result.mode).toBe("supervised");
    expect(result.mode).not.toBe("failed");
    expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
  });

  it("does not schedule kickstart on non-darwin platforms", () => {
    setPlatform("linux");
    process.env.INVOCATION_ID = "abc123";
    process.env.CRABFORK_LAUNCHD_LABEL = "ai.crabfork.gateway";

    const result = restartGatewayProcessWithFreshPid();

    expect(result.mode).toBe("supervised");
    expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("returns supervised when XPC_SERVICE_NAME is set by launchd", () => {
    clearSupervisorHints();
    setPlatform("darwin");
    process.env.XPC_SERVICE_NAME = "ai.crabfork.gateway";
    const result = restartGatewayProcessWithFreshPid();
    expect(result.mode).toBe("supervised");
    expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("spawns detached child with current exec argv", () => {
    delete process.env.CRABFORK_NO_RESPAWN;
    clearSupervisorHints();
    setPlatform("linux");
    process.execArgv = ["--import", "tsx"];
    process.argv = ["/usr/local/bin/node", "/repo/dist/index.js", "gateway", "run"];
    spawnMock.mockReturnValue({ pid: 4242, unref: vi.fn() });

    const result = restartGatewayProcessWithFreshPid();

    expect(result).toEqual({ mode: "spawned", pid: 4242 });
    expect(spawnMock).toHaveBeenCalledWith(
      process.execPath,
      ["--import", "tsx", "/repo/dist/index.js", "gateway", "run"],
      expect.objectContaining({
        detached: true,
        stdio: "inherit",
      }),
    );
  });

  it("returns supervised when CRABFORK_LAUNCHD_LABEL is set (stock launchd plist)", () => {
    clearSupervisorHints();
    expectLaunchdSupervisedWithoutKickstart();
  });

  it("returns supervised when CRABFORK_SYSTEMD_UNIT is set", () => {
    clearSupervisorHints();
    setPlatform("linux");
    process.env.CRABFORK_SYSTEMD_UNIT = "crabfork-gateway.service";
    const result = restartGatewayProcessWithFreshPid();
    expect(result.mode).toBe("supervised");
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("returns supervised when Crabfork gateway task markers are set on Windows", () => {
    clearSupervisorHints();
    setPlatform("win32");
    process.env.CRABFORK_SERVICE_MARKER = "crabfork";
    process.env.CRABFORK_SERVICE_KIND = "gateway";
    triggerCrabforkRestartMock.mockReturnValue({ ok: true, method: "schtasks" });
    const result = restartGatewayProcessWithFreshPid();
    expect(result.mode).toBe("supervised");
    expect(triggerCrabforkRestartMock).toHaveBeenCalledOnce();
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("keeps generic service markers out of non-Windows supervisor detection", () => {
    clearSupervisorHints();
    setPlatform("linux");
    process.env.CRABFORK_SERVICE_MARKER = "crabfork";
    process.env.CRABFORK_SERVICE_KIND = "gateway";
    spawnMock.mockReturnValue({ pid: 4242, unref: vi.fn() });

    const result = restartGatewayProcessWithFreshPid();

    expect(result).toEqual({ mode: "spawned", pid: 4242 });
    expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
  });

  it("returns disabled on Windows without Scheduled Task markers", () => {
    clearSupervisorHints();
    setPlatform("win32");

    const result = restartGatewayProcessWithFreshPid();

    expect(result.mode).toBe("disabled");
    expect(result.detail).toContain("Scheduled Task");
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("ignores node task script hints for gateway restart detection on Windows", () => {
    clearSupervisorHints();
    setPlatform("win32");
    process.env.CRABFORK_TASK_SCRIPT = "C:\\crabfork\\node.cmd";
    process.env.CRABFORK_TASK_SCRIPT_NAME = "node.cmd";
    process.env.CRABFORK_SERVICE_MARKER = "crabfork";
    process.env.CRABFORK_SERVICE_KIND = "node";

    const result = restartGatewayProcessWithFreshPid();

    expect(result.mode).toBe("disabled");
    expect(triggerCrabforkRestartMock).not.toHaveBeenCalled();
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it("returns failed when spawn throws", () => {
    delete process.env.CRABFORK_NO_RESPAWN;
    clearSupervisorHints();
    setPlatform("linux");

    spawnMock.mockImplementation(() => {
      throw new Error("spawn failed");
    });
    const result = restartGatewayProcessWithFreshPid();
    expect(result.mode).toBe("failed");
    expect(result.detail).toContain("spawn failed");
  });
});
