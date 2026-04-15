import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CrabforkConfig } from "../../config/config.js";

const dockerMocks = vi.hoisted(() => ({
  dockerContainerState: vi.fn(),
  ensureSandboxContainer: vi.fn(),
  execDocker: vi.fn(),
  execDockerRaw: vi.fn(),
}));

vi.mock("./docker.js", async () => {
  const actual = await vi.importActual<typeof import("./docker.js")>("./docker.js");
  return {
    ...actual,
    dockerContainerState: dockerMocks.dockerContainerState,
    ensureSandboxContainer: dockerMocks.ensureSandboxContainer,
    execDocker: dockerMocks.execDocker,
    execDockerRaw: dockerMocks.execDockerRaw,
  };
});

const { dockerSandboxBackendManager } = await import("./docker-backend.js");

function createConfig(): CrabforkConfig {
  return {
    agents: {
      defaults: {
        sandbox: {
          mode: "all",
          scope: "session",
          workspaceAccess: "none",
          docker: {
            image: "crabfork-sandbox:bookworm-slim",
          },
          browser: {
            enabled: true,
            image: "crabfork-sandbox-browser:bookworm-slim",
          },
        },
      },
      list: [],
    },
  };
}

describe("docker sandbox backend manager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dockerMocks.dockerContainerState.mockResolvedValue({
      exists: true,
      running: true,
    });
    dockerMocks.execDocker.mockResolvedValue({
      code: 0,
      stdout: "unused-image",
      stderr: "",
    });
  });

  it("matches ordinary sandbox runtimes against sandbox.docker.image", async () => {
    dockerMocks.execDocker.mockResolvedValueOnce({
      code: 0,
      stdout: "crabfork-sandbox:bookworm-slim\n",
      stderr: "",
    });

    const result = await dockerSandboxBackendManager.describeRuntime({
      entry: {
        containerName: "sandbox-1",
        backendId: "docker",
        runtimeLabel: "sandbox-1",
        sessionKey: "agent:coder:main",
        createdAtMs: 1,
        lastUsedAtMs: 1,
        image: "stale-entry-image",
        configLabelKind: "Image",
      },
      config: createConfig(),
      agentId: "coder",
    });

    expect(result).toEqual({
      running: true,
      actualConfigLabel: "crabfork-sandbox:bookworm-slim",
      configLabelMatch: true,
    });
  });

  it("matches browser runtimes against sandbox.browser.image", async () => {
    dockerMocks.execDocker.mockResolvedValueOnce({
      code: 0,
      stdout: "crabfork-sandbox-browser:bookworm-slim\n",
      stderr: "",
    });

    const result = await dockerSandboxBackendManager.describeRuntime({
      entry: {
        containerName: "browser-1",
        backendId: "docker",
        runtimeLabel: "browser-1",
        sessionKey: "agent:coder:main",
        createdAtMs: 1,
        lastUsedAtMs: 1,
        image: "stale-entry-image",
        configLabelKind: "BrowserImage",
      },
      config: createConfig(),
      agentId: "coder",
    });

    expect(result).toEqual({
      running: true,
      actualConfigLabel: "crabfork-sandbox-browser:bookworm-slim",
      configLabelMatch: true,
    });
  });

  it("defaults docker-backed runtime matching to sandbox.docker.image when label kind is missing", async () => {
    dockerMocks.execDocker.mockResolvedValueOnce({
      code: 0,
      stdout: "crabfork-sandbox:bookworm-slim\n",
      stderr: "",
    });

    const result = await dockerSandboxBackendManager.describeRuntime({
      entry: {
        containerName: "sandbox-legacy",
        backendId: "docker",
        runtimeLabel: "sandbox-legacy",
        sessionKey: "agent:coder:main",
        createdAtMs: 1,
        lastUsedAtMs: 1,
        image: "stale-entry-image",
      },
      config: createConfig(),
      agentId: "coder",
    });

    expect(result).toEqual({
      running: true,
      actualConfigLabel: "crabfork-sandbox:bookworm-slim",
      configLabelMatch: true,
    });
  });
});
