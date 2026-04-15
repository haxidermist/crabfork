import type { CrabforkConfig } from "../../config/types.crabfork.js";
import type { FinalizedMsgContext } from "../templating.js";

export type FastAbortResult = {
  handled: boolean;
  aborted: boolean;
  stoppedSubagents?: number;
};

export type TryFastAbortFromMessage = (params: {
  ctx: FinalizedMsgContext;
  cfg: CrabforkConfig;
}) => Promise<FastAbortResult>;

export type FormatAbortReplyText = (stoppedSubagents?: number) => string;
