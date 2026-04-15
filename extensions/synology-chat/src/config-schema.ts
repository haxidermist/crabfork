import { buildChannelConfigSchema } from "crabfork/plugin-sdk/channel-config-schema";
import { z } from "crabfork/plugin-sdk/zod";

export const SynologyChatChannelConfigSchema = buildChannelConfigSchema(
  z
    .object({
      dangerouslyAllowNameMatching: z.boolean().optional(),
      dangerouslyAllowInheritedWebhookPath: z.boolean().optional(),
    })
    .passthrough(),
);
