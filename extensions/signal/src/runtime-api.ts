// Private runtime barrel for the bundled Signal extension.
// Prefer narrower SDK subpaths plus local extension seams over the legacy signal barrel.

export type { ChannelMessageActionAdapter } from "crabfork/plugin-sdk/channel-contract";
export { buildChannelConfigSchema, SignalConfigSchema } from "../config-api.js";
export { PAIRING_APPROVED_MESSAGE } from "crabfork/plugin-sdk/channel-status";
import type { CrabforkConfig as RuntimeCrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
export type { RuntimeCrabforkConfig as CrabforkConfig };
export type { CrabforkPluginApi, PluginRuntime } from "crabfork/plugin-sdk/core";
export type { ChannelPlugin } from "crabfork/plugin-sdk/core";
export {
  DEFAULT_ACCOUNT_ID,
  applyAccountNameToChannelSection,
  deleteAccountFromConfigSection,
  emptyPluginConfigSchema,
  formatPairingApproveHint,
  getChatChannelMeta,
  migrateBaseNameToDefaultAccount,
  normalizeAccountId,
  setAccountEnabledInConfigSection,
} from "crabfork/plugin-sdk/core";
export { resolveChannelMediaMaxBytes } from "crabfork/plugin-sdk/media-runtime";
export { formatCliCommand, formatDocsLink } from "crabfork/plugin-sdk/setup-tools";
export { chunkText } from "crabfork/plugin-sdk/reply-runtime";
export { detectBinary } from "crabfork/plugin-sdk/setup-tools";
export {
  resolveAllowlistProviderRuntimeGroupPolicy,
  resolveDefaultGroupPolicy,
} from "crabfork/plugin-sdk/config-runtime";
export {
  buildBaseAccountStatusSnapshot,
  buildBaseChannelStatusSummary,
  collectStatusIssuesFromLastError,
  createDefaultChannelRuntimeState,
} from "crabfork/plugin-sdk/status-helpers";
export { normalizeE164 } from "crabfork/plugin-sdk/text-runtime";
export { looksLikeSignalTargetId, normalizeSignalMessagingTarget } from "./normalize.js";
export {
  listEnabledSignalAccounts,
  listSignalAccountIds,
  resolveDefaultSignalAccountId,
  resolveSignalAccount,
} from "./accounts.js";
export { monitorSignalProvider } from "./monitor.js";
export { installSignalCli } from "./install-signal-cli.js";
export { probeSignal } from "./probe.js";
export { resolveSignalReactionLevel } from "./reaction-level.js";
export { removeReactionSignal, sendReactionSignal } from "./send-reactions.js";
export { sendMessageSignal } from "./send.js";
export { signalMessageActions } from "./message-actions.js";
export type { ResolvedSignalAccount } from "./accounts.js";
export type { SignalAccountConfig } from "./account-types.js";
