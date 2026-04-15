import { formatTrimmedAllowFromEntries } from "crabfork/plugin-sdk/channel-config-helpers";
import type { ChannelStatusIssue } from "crabfork/plugin-sdk/channel-contract";
import { PAIRING_APPROVED_MESSAGE } from "crabfork/plugin-sdk/channel-status";
import {
  DEFAULT_ACCOUNT_ID,
  getChatChannelMeta,
  type ChannelPlugin,
  type CrabforkConfig,
} from "crabfork/plugin-sdk/core";
import { resolveChannelMediaMaxBytes } from "crabfork/plugin-sdk/media-runtime";
import { collectStatusIssuesFromLastError } from "crabfork/plugin-sdk/status-helpers";
import {
  resolveIMessageConfigAllowFrom,
  resolveIMessageConfigDefaultTo,
} from "./config-accessors.js";
import { looksLikeIMessageTargetId, normalizeIMessageMessagingTarget } from "./normalize.js";
export { chunkTextForOutbound } from "crabfork/plugin-sdk/text-chunking";

export {
  collectStatusIssuesFromLastError,
  DEFAULT_ACCOUNT_ID,
  formatTrimmedAllowFromEntries,
  getChatChannelMeta,
  looksLikeIMessageTargetId,
  normalizeIMessageMessagingTarget,
  PAIRING_APPROVED_MESSAGE,
  resolveChannelMediaMaxBytes,
  resolveIMessageConfigAllowFrom,
  resolveIMessageConfigDefaultTo,
};

export type { ChannelPlugin, ChannelStatusIssue, CrabforkConfig };
