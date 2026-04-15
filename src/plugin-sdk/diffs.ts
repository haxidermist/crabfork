// Narrow plugin-sdk surface for the bundled diffs plugin.
// Keep this list additive and scoped to the bundled diffs surface.

export { definePluginEntry } from "./plugin-entry.js";
export type { CrabforkConfig } from "../config/config.js";
export { resolvePreferredCrabforkTmpDir } from "../infra/tmp-crabfork-dir.js";
export type {
  AnyAgentTool,
  CrabforkPluginApi,
  CrabforkPluginConfigSchema,
  CrabforkPluginToolContext,
  PluginLogger,
} from "../plugins/types.js";
