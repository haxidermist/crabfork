import { describe, expect, it } from "vitest";
import { buildVitestCapabilityShimAliasMap } from "./bundled-capability-runtime.js";

describe("buildVitestCapabilityShimAliasMap", () => {
  it("keeps scoped and unscoped capability shim aliases aligned", () => {
    const aliasMap = buildVitestCapabilityShimAliasMap();

    expect(aliasMap["crabfork/plugin-sdk/llm-task"]).toBe(
      aliasMap["@crabfork/plugin-sdk/llm-task"],
    );
    expect(aliasMap["crabfork/plugin-sdk/config-runtime"]).toBe(
      aliasMap["@crabfork/plugin-sdk/config-runtime"],
    );
    expect(aliasMap["crabfork/plugin-sdk/media-runtime"]).toBe(
      aliasMap["@crabfork/plugin-sdk/media-runtime"],
    );
    expect(aliasMap["crabfork/plugin-sdk/provider-onboard"]).toBe(
      aliasMap["@crabfork/plugin-sdk/provider-onboard"],
    );
    expect(aliasMap["crabfork/plugin-sdk/speech-core"]).toBe(
      aliasMap["@crabfork/plugin-sdk/speech-core"],
    );
  });
});
