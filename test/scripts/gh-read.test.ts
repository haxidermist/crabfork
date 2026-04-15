import { describe, expect, it } from "vitest";
import {
  buildReadPermissions,
  normalizeRepo,
  parsePermissionKeys,
  parseRepoArg,
} from "../../scripts/gh-read.js";

describe("gh-read helpers", () => {
  it("finds repo from gh args", () => {
    expect(parseRepoArg(["pr", "view", "42", "-R", "crabfork/crabfork"])).toBe("crabfork/crabfork");
    expect(parseRepoArg(["run", "list", "--repo=crabfork/docs"])).toBe("crabfork/docs");
    expect(parseRepoArg(["pr", "view", "42"])).toBeNull();
  });

  it("normalizes repo strings from common git formats", () => {
    expect(normalizeRepo("crabfork/crabfork")).toBe("crabfork/crabfork");
    expect(normalizeRepo("github.com/crabfork/crabfork")).toBe("crabfork/crabfork");
    expect(normalizeRepo("https://github.com/crabfork/crabfork.git")).toBe("crabfork/crabfork");
    expect(normalizeRepo("git@github.com:crabfork/crabfork.git")).toBe("crabfork/crabfork");
    expect(normalizeRepo("invalid")).toBeNull();
  });

  it("builds a read-only permission subset from granted permissions", () => {
    expect(
      buildReadPermissions(
        {
          actions: "write",
          issues: "read",
          administration: "write",
          metadata: "read",
          statuses: null,
        },
        ["actions", "issues", "metadata", "statuses", "administration"],
      ),
    ).toEqual({
      administration: "read",
      actions: "read",
      issues: "read",
      metadata: "read",
    });
  });

  it("parses permission key overrides", () => {
    expect(parsePermissionKeys(undefined)).toContain("pull_requests");
    expect(parsePermissionKeys("actions, contents ,issues")).toEqual([
      "actions",
      "contents",
      "issues",
    ]);
  });
});
