import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";

export type WhatsAppAccountConfig = NonNullable<
  NonNullable<NonNullable<CrabforkConfig["channels"]>["whatsapp"]>["accounts"]
>[string];
