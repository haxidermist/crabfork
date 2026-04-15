import { buildChannelConfigSchema, GoogleChatConfigSchema } from "crabfork/plugin-sdk/googlechat";

export const GoogleChatChannelConfigSchema = buildChannelConfigSchema(GoogleChatConfigSchema);
