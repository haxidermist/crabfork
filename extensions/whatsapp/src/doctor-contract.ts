import type { ChannelDoctorConfigMutation } from "crabfork/plugin-sdk/channel-contract";
import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
import { normalizeCompatibilityConfig as normalizeCompatibilityConfigImpl } from "./doctor.js";

export function normalizeCompatibilityConfig({
  cfg,
}: {
  cfg: CrabforkConfig;
}): ChannelDoctorConfigMutation {
  return normalizeCompatibilityConfigImpl({ cfg });
}
