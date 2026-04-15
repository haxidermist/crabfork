import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { withTempDir } from "./test-helpers/temp-dir.js";
import {
  ensureDir,
  resolveConfigDir,
  resolveHomeDir,
  resolveUserPath,
  shortenHomeInString,
  shortenHomePath,
  sleep,
} from "./utils.js";

describe("ensureDir", () => {
  it("creates nested directory", async () => {
    await withTempDir({ prefix: "crabfork-test-" }, async (tmp) => {
      const target = path.join(tmp, "nested", "dir");
      await ensureDir(target);
      expect(fs.existsSync(target)).toBe(true);
    });
  });
});

describe("sleep", () => {
  it("resolves after delay using fake timers", async () => {
    vi.useFakeTimers();
    const promise = sleep(1000);
    vi.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});

describe("resolveConfigDir", () => {
  it("prefers ~/.crabfork when legacy dir is missing", async () => {
    await withTempDir({ prefix: "crabfork-config-dir-" }, async (root) => {
      const newDir = path.join(root, ".crabfork");
      await fs.promises.mkdir(newDir, { recursive: true });
      const resolved = resolveConfigDir({} as NodeJS.ProcessEnv, () => root);
      expect(resolved).toBe(newDir);
    });
  });

  it("expands CRABFORK_STATE_DIR using the provided env", () => {
    const env = {
      HOME: "/tmp/crabfork-home",
      CRABFORK_STATE_DIR: "~/state",
    } as NodeJS.ProcessEnv;

    expect(resolveConfigDir(env)).toBe(path.resolve("/tmp/crabfork-home", "state"));
  });

  it("falls back to the config file directory when only CRABFORK_CONFIG_PATH is set", () => {
    const env = {
      HOME: "/tmp/crabfork-home",
      CRABFORK_CONFIG_PATH: "~/profiles/dev/crabfork.json",
    } as NodeJS.ProcessEnv;

    expect(resolveConfigDir(env)).toBe(path.resolve("/tmp/crabfork-home", "profiles", "dev"));
  });
});

describe("resolveHomeDir", () => {
  it("prefers CRABFORK_HOME over HOME", () => {
    vi.stubEnv("CRABFORK_HOME", "/srv/crabfork-home");
    vi.stubEnv("HOME", "/home/other");

    expect(resolveHomeDir()).toBe(path.resolve("/srv/crabfork-home"));

    vi.unstubAllEnvs();
  });
});

describe("shortenHomePath", () => {
  it("uses $CRABFORK_HOME prefix when CRABFORK_HOME is set", () => {
    vi.stubEnv("CRABFORK_HOME", "/srv/crabfork-home");
    vi.stubEnv("HOME", "/home/other");

    expect(shortenHomePath(`${path.resolve("/srv/crabfork-home")}/.crabfork/crabfork.json`)).toBe(
      "$CRABFORK_HOME/.crabfork/crabfork.json",
    );

    vi.unstubAllEnvs();
  });
});

describe("shortenHomeInString", () => {
  it("uses $CRABFORK_HOME replacement when CRABFORK_HOME is set", () => {
    vi.stubEnv("CRABFORK_HOME", "/srv/crabfork-home");
    vi.stubEnv("HOME", "/home/other");

    expect(
      shortenHomeInString(`config: ${path.resolve("/srv/crabfork-home")}/.crabfork/crabfork.json`),
    ).toBe("config: $CRABFORK_HOME/.crabfork/crabfork.json");

    vi.unstubAllEnvs();
  });
});

describe("resolveUserPath", () => {
  it("expands ~ to home dir", () => {
    expect(resolveUserPath("~", {}, () => "/Users/thoffman")).toBe(path.resolve("/Users/thoffman"));
  });

  it("expands ~/ to home dir", () => {
    expect(resolveUserPath("~/crabfork", {}, () => "/Users/thoffman")).toBe(
      path.resolve("/Users/thoffman", "crabfork"),
    );
  });

  it("resolves relative paths", () => {
    expect(resolveUserPath("tmp/dir")).toBe(path.resolve("tmp/dir"));
  });

  it("prefers CRABFORK_HOME for tilde expansion", () => {
    vi.stubEnv("CRABFORK_HOME", "/srv/crabfork-home");
    vi.stubEnv("HOME", "/home/other");

    expect(resolveUserPath("~/crabfork")).toBe(path.resolve("/srv/crabfork-home", "crabfork"));

    vi.unstubAllEnvs();
  });

  it("uses the provided env for tilde expansion", () => {
    const env = {
      HOME: "/tmp/crabfork-home",
      CRABFORK_HOME: "/srv/crabfork-home",
    } as NodeJS.ProcessEnv;

    expect(resolveUserPath("~/crabfork", env)).toBe(path.resolve("/srv/crabfork-home", "crabfork"));
  });

  it("keeps blank paths blank", () => {
    expect(resolveUserPath("")).toBe("");
    expect(resolveUserPath("   ")).toBe("");
  });

  it("returns empty string for undefined/null input", () => {
    expect(resolveUserPath(undefined as unknown as string)).toBe("");
    expect(resolveUserPath(null as unknown as string)).toBe("");
  });
});
