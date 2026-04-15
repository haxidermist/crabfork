import type { CrabforkConfig } from "../../config/types.crabfork.js";
import type { RuntimeEnv } from "../../runtime.js";

export type ChannelPairingAdapter = {
  idLabel: string;
  normalizeAllowEntry?: (entry: string) => string;
  notifyApproval?: (params: {
    cfg: CrabforkConfig;
    id: string;
    accountId?: string;
    runtime?: RuntimeEnv;
  }) => Promise<void>;
};
