// Private runtime barrel for the bundled Google Chat extension.
// Keep this barrel thin and avoid broad plugin-sdk surfaces during bootstrap.

export { DEFAULT_ACCOUNT_ID } from "crabfork/plugin-sdk/account-id";
export {
  createActionGate,
  jsonResult,
  readNumberParam,
  readReactionParams,
  readStringParam,
} from "crabfork/plugin-sdk/channel-actions";
export { buildChannelConfigSchema } from "crabfork/plugin-sdk/channel-config-primitives";
export type {
  ChannelMessageActionAdapter,
  ChannelMessageActionName,
  ChannelStatusIssue,
} from "crabfork/plugin-sdk/channel-contract";
export { missingTargetError } from "crabfork/plugin-sdk/channel-feedback";
export {
  createAccountStatusSink,
  runPassiveAccountLifecycle,
} from "crabfork/plugin-sdk/channel-lifecycle";
export { createChannelPairingController } from "crabfork/plugin-sdk/channel-pairing";
export { createChannelReplyPipeline } from "crabfork/plugin-sdk/channel-reply-pipeline";
export {
  evaluateGroupRouteAccessForPolicy,
  resolveDmGroupAccessWithLists,
  resolveSenderScopedGroupPolicy,
} from "crabfork/plugin-sdk/channel-policy";
export { PAIRING_APPROVED_MESSAGE } from "crabfork/plugin-sdk/channel-status";
export { chunkTextForOutbound } from "crabfork/plugin-sdk/text-chunking";
export type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  isDangerousNameMatchingEnabled,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "crabfork/plugin-sdk/config-runtime";
export { fetchRemoteMedia, resolveChannelMediaMaxBytes } from "crabfork/plugin-sdk/media-runtime";
export { loadOutboundMediaFromUrl } from "crabfork/plugin-sdk/outbound-media";
export type { PluginRuntime } from "crabfork/plugin-sdk/runtime-store";
export { fetchWithSsrFGuard } from "crabfork/plugin-sdk/ssrf-runtime";
export {
  GoogleChatConfigSchema,
  type GoogleChatAccountConfig,
  type GoogleChatConfig,
} from "crabfork/plugin-sdk/googlechat-runtime-shared";
export { extractToolSend } from "crabfork/plugin-sdk/tool-send";
export { resolveInboundMentionDecision } from "crabfork/plugin-sdk/channel-inbound";
export { resolveInboundRouteEnvelopeBuilderWithRuntime } from "crabfork/plugin-sdk/inbound-envelope";
export { resolveWebhookPath } from "crabfork/plugin-sdk/webhook-path";
export {
  registerWebhookTargetWithPluginRoute,
  resolveWebhookTargetWithAuthOrReject,
  withResolvedWebhookRequestPipeline,
} from "crabfork/plugin-sdk/webhook-targets";
export {
  createWebhookInFlightLimiter,
  readJsonWebhookBodyOrReject,
  type WebhookInFlightLimiter,
} from "crabfork/plugin-sdk/webhook-request-guards";
export { setGoogleChatRuntime } from "./src/runtime.js";
