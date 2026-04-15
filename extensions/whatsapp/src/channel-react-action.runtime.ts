import { readStringOrNumberParam, readStringParam } from "crabfork/plugin-sdk/channel-actions";
import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";

export { resolveReactionMessageId } from "crabfork/plugin-sdk/channel-actions";
export { handleWhatsAppAction } from "./action-runtime.js";
export { isWhatsAppGroupJid, normalizeWhatsAppTarget } from "./normalize.js";
export { readStringOrNumberParam, readStringParam, type CrabforkConfig };
