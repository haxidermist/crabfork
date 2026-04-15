import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { syncPluginVersions } from "../../scripts/sync-plugin-versions.js";
import { cleanupTempDirs, makeTempDir } from "../../test/helpers/temp-dir.js";

const tempDirs: string[] = [];

function writeJson(filePath: string, value: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

describe("syncPluginVersions", () => {
  afterEach(() => {
    cleanupTempDirs(tempDirs);
  });

  it("preserves workspace crabfork devDependencies and plugin host floors", () => {
    const rootDir = makeTempDir(tempDirs, "crabfork-sync-plugin-versions-");

    writeJson(path.join(rootDir, "package.json"), {
      name: "crabfork",
      version: "2026.4.1",
    });
    writeJson(path.join(rootDir, "extensions/bluebubbles/package.json"), {
      name: "@crabfork/bluebubbles",
      version: "2026.3.30",
      devDependencies: {
        crabfork: "workspace:*",
      },
      peerDependencies: {
        crabfork: ">=2026.3.30",
      },
      crabfork: {
        install: {
          minHostVersion: ">=2026.3.30",
        },
        compat: {
          pluginApi: ">=2026.3.30",
        },
        build: {
          crabforkVersion: "2026.3.30",
        },
      },
    });

    const summary = syncPluginVersions(rootDir);
    const updatedPackage = JSON.parse(
      fs.readFileSync(path.join(rootDir, "extensions/bluebubbles/package.json"), "utf8"),
    ) as {
      version?: string;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
      crabfork?: {
        install?: {
          minHostVersion?: string;
        };
        compat?: {
          pluginApi?: string;
        };
        build?: {
          crabforkVersion?: string;
        };
      };
    };

    expect(summary.updated).toContain("@crabfork/bluebubbles");
    expect(updatedPackage.version).toBe("2026.4.1");
    expect(updatedPackage.devDependencies?.crabfork).toBe("workspace:*");
    expect(updatedPackage.peerDependencies?.crabfork).toBe(">=2026.4.1");
    expect(updatedPackage.crabfork?.install?.minHostVersion).toBe(">=2026.3.30");
    expect(updatedPackage.crabfork?.compat?.pluginApi).toBe(">=2026.4.1");
    expect(updatedPackage.crabfork?.build?.crabforkVersion).toBe("2026.4.1");
  });
});
