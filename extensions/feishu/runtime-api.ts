// Private runtime barrel for the bundled Feishu extension.
// Keep this barrel thin and generic-only.

export type {
  AllowlistMatch,
  AnyAgentTool,
  BaseProbeResult,
  ChannelGroupContext,
  ChannelMessageActionName,
  ChannelMeta,
  ChannelOutboundAdapter,
  ChannelPlugin,
  HistoryEntry,
  CrabforkConfig,
  CrabforkPluginApi,
  OutboundIdentity,
  PluginRuntime,
  ReplyPayload,
} from "crabfork/plugin-sdk/core";
export type { CrabforkConfig as ClawdbotConfig } from "crabfork/plugin-sdk/core";
export type { RuntimeEnv } from "crabfork/plugin-sdk/runtime";
export type { GroupToolPolicyConfig } from "crabfork/plugin-sdk/config-runtime";
export {
  DEFAULT_ACCOUNT_ID,
  buildChannelConfigSchema,
  createActionGate,
  createDedupeCache,
} from "crabfork/plugin-sdk/core";
export {
  PAIRING_APPROVED_MESSAGE,
  buildProbeChannelStatusSummary,
  createDefaultChannelRuntimeState,
} from "crabfork/plugin-sdk/channel-status";
export { buildAgentMediaPayload } from "crabfork/plugin-sdk/agent-media-payload";
export { createChannelPairingController } from "crabfork/plugin-sdk/channel-pairing";
export { createReplyPrefixContext } from "crabfork/plugin-sdk/channel-reply-pipeline";
export {
  evaluateSupplementalContextVisibility,
  filterSupplementalContextItems,
  resolveChannelContextVisibilityMode,
} from "crabfork/plugin-sdk/config-runtime";
export { loadSessionStore, resolveSessionStoreEntry } from "crabfork/plugin-sdk/config-runtime";
export { readJsonFileWithFallback } from "crabfork/plugin-sdk/json-store";
export { createPersistentDedupe } from "crabfork/plugin-sdk/persistent-dedupe";
export { normalizeAgentId } from "crabfork/plugin-sdk/routing";
export { chunkTextForOutbound } from "crabfork/plugin-sdk/text-chunking";
export {
  isRequestBodyLimitError,
  readRequestBodyWithLimit,
  requestBodyErrorToText,
} from "crabfork/plugin-sdk/webhook-ingress";
export { setFeishuRuntime } from "./src/runtime.js";
