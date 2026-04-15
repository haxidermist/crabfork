import { describe, expect, it } from "vitest";
import { buildPlatformRuntimeLogHints, buildPlatformServiceStartHints } from "./runtime-hints.js";

describe("buildPlatformRuntimeLogHints", () => {
  it("renders launchd log hints on darwin", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "darwin",
        env: {
          CRABFORK_STATE_DIR: "/tmp/crabfork-state",
          CRABFORK_LOG_PREFIX: "gateway",
        },
        systemdServiceName: "crabfork-gateway",
        windowsTaskName: "Crabfork Gateway",
      }),
    ).toEqual([
      "Launchd stdout (if installed): /tmp/crabfork-state/logs/gateway.log",
      "Launchd stderr (if installed): /tmp/crabfork-state/logs/gateway.err.log",
    ]);
  });

  it("renders systemd and windows hints by platform", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "linux",
        systemdServiceName: "crabfork-gateway",
        windowsTaskName: "Crabfork Gateway",
      }),
    ).toEqual(["Logs: journalctl --user -u crabfork-gateway.service -n 200 --no-pager"]);
    expect(
      buildPlatformRuntimeLogHints({
        platform: "win32",
        systemdServiceName: "crabfork-gateway",
        windowsTaskName: "Crabfork Gateway",
      }),
    ).toEqual(['Logs: schtasks /Query /TN "Crabfork Gateway" /V /FO LIST']);
  });
});

describe("buildPlatformServiceStartHints", () => {
  it("builds platform-specific service start hints", () => {
    expect(
      buildPlatformServiceStartHints({
        platform: "darwin",
        installCommand: "crabfork gateway install",
        startCommand: "crabfork gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.crabfork.gateway.plist",
        systemdServiceName: "crabfork-gateway",
        windowsTaskName: "Crabfork Gateway",
      }),
    ).toEqual([
      "crabfork gateway install",
      "crabfork gateway",
      "launchctl bootstrap gui/$UID ~/Library/LaunchAgents/com.crabfork.gateway.plist",
    ]);
    expect(
      buildPlatformServiceStartHints({
        platform: "linux",
        installCommand: "crabfork gateway install",
        startCommand: "crabfork gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.crabfork.gateway.plist",
        systemdServiceName: "crabfork-gateway",
        windowsTaskName: "Crabfork Gateway",
      }),
    ).toEqual([
      "crabfork gateway install",
      "crabfork gateway",
      "systemctl --user start crabfork-gateway.service",
    ]);
  });
});
