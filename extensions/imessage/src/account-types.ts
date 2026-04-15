import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";

export type IMessageAccountConfig = Omit<
  NonNullable<NonNullable<CrabforkConfig["channels"]>["imessage"]>,
  "accounts" | "defaultAccount"
>;
