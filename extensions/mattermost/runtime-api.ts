// Private runtime barrel for the bundled Mattermost extension.
// Keep this barrel thin and generic-only.

export type {
  BaseProbeResult,
  ChannelAccountSnapshot,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelMessageActionName,
  ChannelPlugin,
  ChatType,
  HistoryEntry,
  CrabforkConfig,
  CrabforkPluginApi,
  PluginRuntime,
} from "crabfork/plugin-sdk/core";
export type { RuntimeEnv } from "crabfork/plugin-sdk/runtime";
export type { ReplyPayload } from "crabfork/plugin-sdk/reply-runtime";
export type { ModelsProviderData } from "crabfork/plugin-sdk/command-auth";
export type {
  BlockStreamingCoalesceConfig,
  DmPolicy,
  GroupPolicy,
} from "crabfork/plugin-sdk/config-runtime";
export {
  DEFAULT_ACCOUNT_ID,
  buildChannelConfigSchema,
  createDedupeCache,
  parseStrictPositiveInteger,
  resolveClientIp,
  isTrustedProxyAddress,
} from "crabfork/plugin-sdk/core";
export { buildComputedAccountStatusSnapshot } from "crabfork/plugin-sdk/channel-status";
export { createAccountStatusSink } from "crabfork/plugin-sdk/channel-lifecycle";
export { buildAgentMediaPayload } from "crabfork/plugin-sdk/agent-media-payload";
export {
  buildModelsProviderData,
  listSkillCommandsForAgents,
  resolveControlCommandGate,
  resolveStoredModelOverride,
} from "crabfork/plugin-sdk/command-auth";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  isDangerousNameMatchingEnabled,
  loadSessionStore,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  resolveStorePath,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "crabfork/plugin-sdk/config-runtime";
export { formatInboundFromLabel } from "crabfork/plugin-sdk/channel-inbound";
export { logInboundDrop } from "crabfork/plugin-sdk/channel-inbound";
export { createChannelPairingController } from "crabfork/plugin-sdk/channel-pairing";
export {
  DM_GROUP_ACCESS_REASON,
  readStoreAllowFromForDmPolicy,
  resolveDmGroupAccessWithLists,
  resolveEffectiveAllowFromLists,
} from "crabfork/plugin-sdk/channel-policy";
export { evaluateSenderGroupAccessForPolicy } from "crabfork/plugin-sdk/group-access";
export { createChannelReplyPipeline } from "crabfork/plugin-sdk/channel-reply-pipeline";
export { logTypingFailure } from "crabfork/plugin-sdk/channel-feedback";
export { loadOutboundMediaFromUrl } from "crabfork/plugin-sdk/outbound-media";
export { rawDataToString } from "crabfork/plugin-sdk/browser-node-runtime";
export { chunkTextForOutbound } from "crabfork/plugin-sdk/text-chunking";
export {
  DEFAULT_GROUP_HISTORY_LIMIT,
  buildPendingHistoryContextFromMap,
  clearHistoryEntriesIfEnabled,
  recordPendingHistoryEntryIfEnabled,
} from "crabfork/plugin-sdk/reply-history";
export { normalizeAccountId, resolveThreadSessionKeys } from "crabfork/plugin-sdk/routing";
export { resolveAllowlistMatchSimple } from "crabfork/plugin-sdk/allow-from";
export { registerPluginHttpRoute } from "crabfork/plugin-sdk/webhook-targets";
export {
  isRequestBodyLimitError,
  readRequestBodyWithLimit,
} from "crabfork/plugin-sdk/webhook-ingress";
export {
  applyAccountNameToChannelSection,
  applySetupAccountConfigPatch,
  migrateBaseNameToDefaultAccount,
} from "crabfork/plugin-sdk/setup";
export {
  getAgentScopedMediaLocalRoots,
  resolveChannelMediaMaxBytes,
} from "crabfork/plugin-sdk/media-runtime";
export { normalizeProviderId } from "crabfork/plugin-sdk/provider-model-shared";
export { setMattermostRuntime } from "./src/runtime.js";
