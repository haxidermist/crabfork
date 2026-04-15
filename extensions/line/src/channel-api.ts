export { clearAccountEntryFields } from "crabfork/plugin-sdk/core";
import { DEFAULT_ACCOUNT_ID } from "crabfork/plugin-sdk/account-id";
import type { CrabforkConfig } from "crabfork/plugin-sdk/account-resolution";
import type { ChannelPlugin } from "crabfork/plugin-sdk/core";
import {
  listLineAccountIds,
  normalizeAccountId,
  resolveDefaultLineAccountId,
  resolveLineAccount,
} from "./accounts.js";
import { resolveExactLineGroupConfigKey } from "./group-keys.js";
import type { LineConfig, ResolvedLineAccount } from "./types.js";

export {
  DEFAULT_ACCOUNT_ID,
  listLineAccountIds,
  normalizeAccountId,
  resolveDefaultLineAccountId,
  resolveExactLineGroupConfigKey,
  resolveLineAccount,
};

export type { ChannelPlugin, LineConfig, CrabforkConfig, ResolvedLineAccount };
