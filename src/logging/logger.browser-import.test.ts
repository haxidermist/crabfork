import { afterEach, describe, expect, it, vi } from "vitest";
import { importFreshModule } from "../../test/helpers/import-fresh.js";

type LoggerModule = typeof import("./logger.js");

const originalGetBuiltinModule = (
  process as NodeJS.Process & { getBuiltinModule?: (id: string) => unknown }
).getBuiltinModule;

async function importBrowserSafeLogger(params?: {
  resolvePreferredCrabforkTmpDir?: ReturnType<typeof vi.fn>;
}): Promise<{
  module: LoggerModule;
  resolvePreferredCrabforkTmpDir: ReturnType<typeof vi.fn>;
}> {
  const resolvePreferredCrabforkTmpDir =
    params?.resolvePreferredCrabforkTmpDir ??
    vi.fn(() => {
      throw new Error("resolvePreferredCrabforkTmpDir should not run during browser-safe import");
    });

  vi.doMock("../infra/tmp-crabfork-dir.js", async () => {
    const actual = await vi.importActual<typeof import("../infra/tmp-crabfork-dir.js")>(
      "../infra/tmp-crabfork-dir.js",
    );
    return {
      ...actual,
      resolvePreferredCrabforkTmpDir,
    };
  });

  Object.defineProperty(process, "getBuiltinModule", {
    configurable: true,
    value: undefined,
  });

  const module = await importFreshModule<LoggerModule>(
    import.meta.url,
    "./logger.js?scope=browser-safe",
  );
  return { module, resolvePreferredCrabforkTmpDir };
}

describe("logging/logger browser-safe import", () => {
  afterEach(() => {
    vi.doUnmock("../infra/tmp-crabfork-dir.js");
    Object.defineProperty(process, "getBuiltinModule", {
      configurable: true,
      value: originalGetBuiltinModule,
    });
  });

  it("does not resolve the preferred temp dir at import time when node fs is unavailable", async () => {
    const { module, resolvePreferredCrabforkTmpDir } = await importBrowserSafeLogger();

    expect(resolvePreferredCrabforkTmpDir).not.toHaveBeenCalled();
    expect(module.DEFAULT_LOG_DIR).toBe("/tmp/crabfork");
    expect(module.DEFAULT_LOG_FILE).toBe("/tmp/crabfork/crabfork.log");
  });

  it("disables file logging when imported in a browser-like environment", async () => {
    const { module, resolvePreferredCrabforkTmpDir } = await importBrowserSafeLogger();

    expect(module.getResolvedLoggerSettings()).toMatchObject({
      level: "silent",
      file: "/tmp/crabfork/crabfork.log",
    });
    expect(module.isFileLogLevelEnabled("info")).toBe(false);
    expect(() => module.getLogger().info("browser-safe")).not.toThrow();
    expect(resolvePreferredCrabforkTmpDir).not.toHaveBeenCalled();
  });
});
