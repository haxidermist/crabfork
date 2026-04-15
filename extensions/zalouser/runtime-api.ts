// Private runtime barrel for the bundled Zalo Personal extension.
// Keep this barrel thin and aligned with the local extension surface.

export * from "./api.js";
export { setZalouserRuntime } from "./src/runtime.js";
export type { ReplyPayload } from "crabfork/plugin-sdk/reply-runtime";
export type {
  BaseProbeResult,
  ChannelAccountSnapshot,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelMessageActionAdapter,
  ChannelStatusIssue,
} from "crabfork/plugin-sdk/channel-contract";
export type {
  CrabforkConfig,
  GroupToolPolicyConfig,
  MarkdownTableMode,
} from "crabfork/plugin-sdk/config-runtime";
export type {
  PluginRuntime,
  AnyAgentTool,
  ChannelPlugin,
  CrabforkPluginToolContext,
} from "crabfork/plugin-sdk/core";
export type { RuntimeEnv } from "crabfork/plugin-sdk/runtime";
export {
  DEFAULT_ACCOUNT_ID,
  buildChannelConfigSchema,
  normalizeAccountId,
} from "crabfork/plugin-sdk/core";
export { chunkTextForOutbound } from "crabfork/plugin-sdk/text-chunking";
export {
  isDangerousNameMatchingEnabled,
  resolveDefaultGroupPolicy,
  resolveOpenProviderRuntimeGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "crabfork/plugin-sdk/config-runtime";
export {
  mergeAllowlist,
  summarizeMapping,
  formatAllowFromLowercase,
} from "crabfork/plugin-sdk/allow-from";
export { resolveInboundMentionDecision } from "crabfork/plugin-sdk/channel-inbound";
export { createChannelPairingController } from "crabfork/plugin-sdk/channel-pairing";
export { createChannelReplyPipeline } from "crabfork/plugin-sdk/channel-reply-pipeline";
export { buildBaseAccountStatusSnapshot } from "crabfork/plugin-sdk/status-helpers";
export { resolveSenderCommandAuthorization } from "crabfork/plugin-sdk/command-auth";
export {
  evaluateGroupRouteAccessForPolicy,
  resolveSenderScopedGroupPolicy,
} from "crabfork/plugin-sdk/group-access";
export { loadOutboundMediaFromUrl } from "crabfork/plugin-sdk/outbound-media";
export {
  deliverTextOrMediaReply,
  isNumericTargetId,
  resolveSendableOutboundReplyParts,
  sendPayloadWithChunkedTextAndMedia,
  type OutboundReplyPayload,
} from "crabfork/plugin-sdk/reply-payload";
export { resolvePreferredCrabforkTmpDir } from "crabfork/plugin-sdk/browser-security-runtime";
