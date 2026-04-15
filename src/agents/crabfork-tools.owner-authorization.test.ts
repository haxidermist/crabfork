import { describe, expect, it } from "vitest";
import {
  isCrabforkOwnerOnlyCoreToolName,
  CRABFORK_OWNER_ONLY_CORE_TOOL_NAMES,
} from "./tools/owner-only-tools.js";

describe("createCrabforkTools owner authorization", () => {
  it("marks owner-only core tool names", () => {
    expect(CRABFORK_OWNER_ONLY_CORE_TOOL_NAMES).toEqual(["cron", "gateway", "nodes"]);
    expect(isCrabforkOwnerOnlyCoreToolName("cron")).toBe(true);
    expect(isCrabforkOwnerOnlyCoreToolName("gateway")).toBe(true);
    expect(isCrabforkOwnerOnlyCoreToolName("nodes")).toBe(true);
  });

  it("keeps canvas non-owner-only", () => {
    expect(isCrabforkOwnerOnlyCoreToolName("canvas")).toBe(false);
  });
});
