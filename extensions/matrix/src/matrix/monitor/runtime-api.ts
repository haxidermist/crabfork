// Narrow Matrix monitor helper seam.
// Keep monitor internals off the broad package runtime-api barrel so monitor
// tests and shared workers do not pull unrelated Matrix helper surfaces.

export { ensureConfiguredAcpBindingReady } from "crabfork/plugin-sdk/acp-binding-runtime";
export type { NormalizedLocation } from "crabfork/plugin-sdk/channel-inbound";
export type { PluginRuntime, RuntimeLogger } from "crabfork/plugin-sdk/plugin-runtime";
export type { BlockReplyContext, ReplyPayload } from "crabfork/plugin-sdk/reply-runtime";
export type { MarkdownTableMode, CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
export type { RuntimeEnv } from "crabfork/plugin-sdk/runtime";
export {
  addAllowlistUserEntriesFromConfigEntry,
  buildAllowlistResolutionSummary,
  canonicalizeAllowlistWithResolvedIds,
  formatAllowlistMatchMeta,
  patchAllowlistUsersInConfigEntries,
  summarizeMapping,
} from "crabfork/plugin-sdk/allow-from";
export { createReplyPrefixOptions } from "crabfork/plugin-sdk/channel-reply-pipeline";
export { createTypingCallbacks } from "crabfork/plugin-sdk/channel-reply-pipeline";
export {
  formatLocationText,
  logInboundDrop,
  toLocationContext,
} from "crabfork/plugin-sdk/channel-inbound";
export { getAgentScopedMediaLocalRoots } from "crabfork/plugin-sdk/agent-media-payload";
export { logTypingFailure, resolveAckReaction } from "crabfork/plugin-sdk/channel-feedback";
export {
  buildChannelKeyCandidates,
  resolveChannelEntryMatch,
} from "crabfork/plugin-sdk/channel-targets";
