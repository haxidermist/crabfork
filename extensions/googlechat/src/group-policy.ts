import { resolveChannelGroupRequireMention } from "crabfork/plugin-sdk/channel-policy";
import type { CrabforkConfig } from "crabfork/plugin-sdk/core";

type GoogleChatGroupContext = {
  cfg: CrabforkConfig;
  accountId?: string | null;
  groupId?: string | null;
};

export function resolveGoogleChatGroupRequireMention(params: GoogleChatGroupContext): boolean {
  return resolveChannelGroupRequireMention({
    cfg: params.cfg,
    channel: "googlechat",
    groupId: params.groupId,
    accountId: params.accountId,
  });
}
