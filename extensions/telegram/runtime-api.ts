export type { CrabforkPluginApi } from "crabfork/plugin-sdk/plugin-entry";
export type { ChannelMessageActionAdapter } from "crabfork/plugin-sdk/channel-contract";
export type { TelegramApiOverride } from "./src/send.js";
export type {
  CrabforkPluginService,
  CrabforkPluginServiceContext,
  PluginLogger,
} from "crabfork/plugin-sdk/plugin-entry";
import type { CrabforkConfig as RuntimeCrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
export type { PluginRuntime } from "crabfork/plugin-sdk/runtime-store";
export type {
  AcpRuntime,
  AcpRuntimeCapabilities,
  AcpRuntimeDoctorReport,
  AcpRuntimeEnsureInput,
  AcpRuntimeEvent,
  AcpRuntimeHandle,
  AcpRuntimeStatus,
  AcpRuntimeTurnInput,
  AcpRuntimeErrorCode,
  AcpSessionUpdateTag,
} from "crabfork/plugin-sdk/acp-runtime";
export { AcpRuntimeError } from "crabfork/plugin-sdk/acp-runtime";

export {
  emptyPluginConfigSchema,
  formatPairingApproveHint,
  getChatChannelMeta,
} from "crabfork/plugin-sdk/channel-plugin-common";
export { clearAccountEntryFields } from "crabfork/plugin-sdk/channel-core";
export { buildChannelConfigSchema, TelegramConfigSchema } from "./config-api.js";
export { DEFAULT_ACCOUNT_ID, normalizeAccountId } from "crabfork/plugin-sdk/account-id";
export {
  PAIRING_APPROVED_MESSAGE,
  buildTokenChannelStatusSummary,
  projectCredentialSnapshotFields,
  resolveConfiguredFromCredentialStatuses,
} from "crabfork/plugin-sdk/channel-status";
export {
  jsonResult,
  readNumberParam,
  readReactionParams,
  readStringArrayParam,
  readStringOrNumberParam,
  readStringParam,
  resolvePollMaxSelections,
} from "crabfork/plugin-sdk/channel-actions";
export type { TelegramProbe } from "./src/probe.js";
export { auditTelegramGroupMembership, collectTelegramUnmentionedGroupIds } from "./src/audit.js";
export { resolveTelegramRuntimeGroupPolicy } from "./src/group-access.js";
export {
  buildTelegramExecApprovalPendingPayload,
  shouldSuppressTelegramExecApprovalForwardingFallback,
} from "./src/exec-approval-forwarding.js";
export { telegramMessageActions } from "./src/channel-actions.js";
export { monitorTelegramProvider } from "./src/monitor.js";
export { probeTelegram } from "./src/probe.js";
export {
  resolveTelegramFetch,
  resolveTelegramTransport,
  shouldRetryTelegramTransportFallback,
} from "./src/fetch.js";
export { makeProxyFetch } from "./src/proxy.js";
export {
  createForumTopicTelegram,
  deleteMessageTelegram,
  editForumTopicTelegram,
  editMessageReplyMarkupTelegram,
  editMessageTelegram,
  pinMessageTelegram,
  reactMessageTelegram,
  renameForumTopicTelegram,
  sendMessageTelegram,
  sendPollTelegram,
  sendStickerTelegram,
  sendTypingTelegram,
  unpinMessageTelegram,
} from "./src/send.js";
export {
  createTelegramThreadBindingManager,
  getTelegramThreadBindingManager,
  resetTelegramThreadBindingsForTests,
  setTelegramThreadBindingIdleTimeoutBySessionKey,
  setTelegramThreadBindingMaxAgeBySessionKey,
} from "./src/thread-bindings.js";
export { resolveTelegramToken } from "./src/token.js";
export { setTelegramRuntime } from "./src/runtime.js";
export type { ChannelPlugin } from "crabfork/plugin-sdk/channel-core";
export type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
export type TelegramAccountConfig = NonNullable<
  NonNullable<RuntimeCrabforkConfig["channels"]>["telegram"]
>;
export type TelegramActionConfig = NonNullable<TelegramAccountConfig["actions"]>;
export type TelegramNetworkConfig = NonNullable<TelegramAccountConfig["network"]>;
export { parseTelegramTopicConversation } from "./src/topic-conversation.js";
export { resolveTelegramPollVisibility } from "./src/poll-visibility.js";
