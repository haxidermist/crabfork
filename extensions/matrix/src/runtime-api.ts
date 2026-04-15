export {
  DEFAULT_ACCOUNT_ID,
  normalizeAccountId,
  normalizeOptionalAccountId,
} from "crabfork/plugin-sdk/account-id";
export {
  createActionGate,
  jsonResult,
  readNumberParam,
  readReactionParams,
  readStringArrayParam,
  readStringParam,
  ToolAuthorizationError,
} from "crabfork/plugin-sdk/channel-actions";
export { buildChannelConfigSchema } from "crabfork/plugin-sdk/channel-config-primitives";
export type { ChannelPlugin } from "crabfork/plugin-sdk/channel-core";
export type {
  BaseProbeResult,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelMessageActionAdapter,
  ChannelMessageActionContext,
  ChannelMessageActionName,
  ChannelMessageToolDiscovery,
  ChannelOutboundAdapter,
  ChannelResolveKind,
  ChannelResolveResult,
  ChannelToolSend,
} from "crabfork/plugin-sdk/channel-contract";
export {
  formatLocationText,
  logInboundDrop,
  toLocationContext,
  type NormalizedLocation,
} from "crabfork/plugin-sdk/channel-inbound";
export { resolveAckReaction, logTypingFailure } from "crabfork/plugin-sdk/channel-feedback";
export type { ChannelSetupInput } from "crabfork/plugin-sdk/setup";
export type {
  CrabforkConfig,
  ContextVisibilityMode,
  DmPolicy,
  GroupPolicy,
} from "crabfork/plugin-sdk/config-runtime";
export type { GroupToolPolicyConfig } from "crabfork/plugin-sdk/config-runtime";
export type { WizardPrompter } from "crabfork/plugin-sdk/matrix-runtime-shared";
export type { SecretInput } from "crabfork/plugin-sdk/secret-input";
export {
  GROUP_POLICY_BLOCKED_LABEL,
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
  warnMissingProviderGroupPolicyFallbackOnce,
} from "crabfork/plugin-sdk/config-runtime";
export {
  addWildcardAllowFrom,
  formatDocsLink,
  hasConfiguredSecretInput,
  mergeAllowFromEntries,
  moveSingleAccountChannelSectionToDefaultAccount,
  promptAccountId,
  promptChannelAccessConfig,
  splitSetupEntries,
} from "crabfork/plugin-sdk/setup";
export type { RuntimeEnv } from "crabfork/plugin-sdk/runtime";
export {
  assertHttpUrlTargetsPrivateNetwork,
  closeDispatcher,
  createPinnedDispatcher,
  isPrivateOrLoopbackHost,
  resolvePinnedHostnameWithPolicy,
  ssrfPolicyFromDangerouslyAllowPrivateNetwork,
  ssrfPolicyFromAllowPrivateNetwork,
  type LookupFn,
  type SsrFPolicy,
} from "crabfork/plugin-sdk/ssrf-runtime";
export { dispatchReplyFromConfigWithSettledDispatcher } from "crabfork/plugin-sdk/inbound-reply-dispatch";
export {
  ensureConfiguredAcpBindingReady,
  resolveConfiguredAcpBindingRecord,
} from "crabfork/plugin-sdk/acp-binding-runtime";
export {
  buildProbeChannelStatusSummary,
  collectStatusIssuesFromLastError,
  PAIRING_APPROVED_MESSAGE,
} from "crabfork/plugin-sdk/channel-status";
export {
  getSessionBindingService,
  resolveThreadBindingIdleTimeoutMsForChannel,
  resolveThreadBindingMaxAgeMsForChannel,
} from "crabfork/plugin-sdk/conversation-runtime";
export { resolveOutboundSendDep } from "crabfork/plugin-sdk/outbound-runtime";
export { resolveAgentIdFromSessionKey } from "crabfork/plugin-sdk/routing";
export { chunkTextForOutbound } from "crabfork/plugin-sdk/text-chunking";
export { createChannelReplyPipeline } from "crabfork/plugin-sdk/channel-reply-pipeline";
export { loadOutboundMediaFromUrl } from "crabfork/plugin-sdk/outbound-media";
export { normalizePollInput, type PollInput } from "crabfork/plugin-sdk/media-runtime";
export { writeJsonFileAtomically } from "crabfork/plugin-sdk/json-store";
export {
  buildChannelKeyCandidates,
  resolveChannelEntryMatch,
} from "crabfork/plugin-sdk/channel-targets";
export {
  evaluateGroupRouteAccessForPolicy,
  resolveSenderScopedGroupPolicy,
} from "crabfork/plugin-sdk/channel-policy";
export {
  formatZonedTimestamp,
  type PluginRuntime,
  type RuntimeLogger,
} from "crabfork/plugin-sdk/matrix-runtime-shared";
export type { ReplyPayload } from "crabfork/plugin-sdk/reply-runtime";
// resolveMatrixAccountStringValues already comes from plugin-sdk/matrix.
// Re-exporting auth-precedence here makes Jiti try to define the same export twice.

export function buildTimeoutAbortSignal(params: { timeoutMs?: number; signal?: AbortSignal }): {
  signal?: AbortSignal;
  cleanup: () => void;
} {
  const { timeoutMs, signal } = params;
  if (!timeoutMs && !signal) {
    return { signal: undefined, cleanup: () => {} };
  }
  if (!timeoutMs) {
    return { signal, cleanup: () => {} };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(controller.abort.bind(controller), timeoutMs);
  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener("abort", onAbort, { once: true });
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onAbort);
    },
  };
}
