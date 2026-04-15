export { definePluginEntry } from "crabfork/plugin-sdk/core";
export type {
  AnyAgentTool,
  CrabforkPluginApi,
  CrabforkPluginToolContext,
  CrabforkPluginToolFactory,
} from "crabfork/plugin-sdk/core";
export {
  applyWindowsSpawnProgramPolicy,
  materializeWindowsSpawnProgram,
  resolveWindowsSpawnProgramCandidate,
} from "crabfork/plugin-sdk/windows-spawn";
