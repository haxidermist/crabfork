import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";

export type SignalAccountConfig = Omit<
  Exclude<NonNullable<CrabforkConfig["channels"]>["signal"], undefined>,
  "accounts"
>;
