import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "crabfork",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "crabfork", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("leaves gateway --dev for subcommands after leading root options", () => {
    const res = parseCliProfileArgs([
      "node",
      "crabfork",
      "--no-color",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual([
      "node",
      "crabfork",
      "--no-color",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "crabfork", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "crabfork", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "crabfork", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "crabfork", "status"]);
  });

  it("parses interleaved --profile after the command token", () => {
    const res = parseCliProfileArgs(["node", "crabfork", "status", "--profile", "work", "--deep"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "crabfork", "status", "--deep"]);
  });

  it("parses interleaved --dev after the command token", () => {
    const res = parseCliProfileArgs(["node", "crabfork", "status", "--dev"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "crabfork", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "crabfork", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it.each([
    ["--dev first", ["node", "crabfork", "--dev", "--profile", "work", "status"]],
    ["--profile first", ["node", "crabfork", "--profile", "work", "--dev", "status"]],
    ["interleaved after command", ["node", "crabfork", "status", "--profile", "work", "--dev"]],
  ])("rejects combining --dev with --profile (%s)", (_name, argv) => {
    const res = parseCliProfileArgs(argv);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join(path.resolve("/home/peter"), ".crabfork-dev");
    expect(env.CRABFORK_PROFILE).toBe("dev");
    expect(env.CRABFORK_STATE_DIR).toBe(expectedStateDir);
    expect(env.CRABFORK_CONFIG_PATH).toBe(path.join(expectedStateDir, "crabfork.json"));
    expect(env.CRABFORK_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      CRABFORK_STATE_DIR: "/custom",
      CRABFORK_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.CRABFORK_STATE_DIR).toBe("/custom");
    expect(env.CRABFORK_GATEWAY_PORT).toBe("19099");
    expect(env.CRABFORK_CONFIG_PATH).toBe(path.join("/custom", "crabfork.json"));
  });

  it("uses CRABFORK_HOME when deriving profile state dir", () => {
    const env: Record<string, string | undefined> = {
      CRABFORK_HOME: "/srv/crabfork-home",
      HOME: "/home/other",
    };
    applyCliProfileEnv({
      profile: "work",
      env,
      homedir: () => "/home/fallback",
    });

    const resolvedHome = path.resolve("/srv/crabfork-home");
    expect(env.CRABFORK_STATE_DIR).toBe(path.join(resolvedHome, ".crabfork-work"));
    expect(env.CRABFORK_CONFIG_PATH).toBe(
      path.join(resolvedHome, ".crabfork-work", "crabfork.json"),
    );
  });
});

describe("formatCliCommand", () => {
  it.each([
    {
      name: "no profile is set",
      cmd: "crabfork doctor --fix",
      env: {},
      expected: "crabfork doctor --fix",
    },
    {
      name: "profile is default",
      cmd: "crabfork doctor --fix",
      env: { CRABFORK_PROFILE: "default" },
      expected: "crabfork doctor --fix",
    },
    {
      name: "profile is Default (case-insensitive)",
      cmd: "crabfork doctor --fix",
      env: { CRABFORK_PROFILE: "Default" },
      expected: "crabfork doctor --fix",
    },
    {
      name: "profile is invalid",
      cmd: "crabfork doctor --fix",
      env: { CRABFORK_PROFILE: "bad profile" },
      expected: "crabfork doctor --fix",
    },
    {
      name: "--profile is already present",
      cmd: "crabfork --profile work doctor --fix",
      env: { CRABFORK_PROFILE: "work" },
      expected: "crabfork --profile work doctor --fix",
    },
    {
      name: "--dev is already present",
      cmd: "crabfork --dev doctor",
      env: { CRABFORK_PROFILE: "dev" },
      expected: "crabfork --dev doctor",
    },
  ])("returns command unchanged when $name", ({ cmd, env, expected }) => {
    expect(formatCliCommand(cmd, env)).toBe(expected);
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("crabfork doctor --fix", { CRABFORK_PROFILE: "work" })).toBe(
      "crabfork --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("crabfork doctor --fix", { CRABFORK_PROFILE: "  jbcrabfork  " })).toBe(
      "crabfork --profile jbcrabfork doctor --fix",
    );
  });

  it("handles command with no args after crabfork", () => {
    expect(formatCliCommand("crabfork", { CRABFORK_PROFILE: "test" })).toBe(
      "crabfork --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm crabfork doctor", { CRABFORK_PROFILE: "work" })).toBe(
      "pnpm crabfork --profile work doctor",
    );
  });

  it("inserts --container when a container hint is set", () => {
    expect(
      formatCliCommand("crabfork gateway status --deep", { CRABFORK_CONTAINER_HINT: "demo" }),
    ).toBe("crabfork --container demo gateway status --deep");
  });

  it("ignores unsafe container hints", () => {
    expect(
      formatCliCommand("crabfork gateway status --deep", {
        CRABFORK_CONTAINER_HINT: "demo; rm -rf /",
      }),
    ).toBe("crabfork gateway status --deep");
  });

  it("preserves both --container and --profile hints", () => {
    expect(
      formatCliCommand("crabfork doctor", {
        CRABFORK_CONTAINER_HINT: "demo",
        CRABFORK_PROFILE: "work",
      }),
    ).toBe("crabfork --container demo doctor");
  });

  it("does not prepend --container for update commands", () => {
    expect(formatCliCommand("crabfork update", { CRABFORK_CONTAINER_HINT: "demo" })).toBe(
      "crabfork update",
    );
    expect(
      formatCliCommand("pnpm crabfork update --channel beta", { CRABFORK_CONTAINER_HINT: "demo" }),
    ).toBe("pnpm crabfork update --channel beta");
  });
});
