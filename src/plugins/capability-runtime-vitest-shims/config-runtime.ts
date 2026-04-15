import { resolveActiveTalkProviderConfig } from "../../config/talk.js";
import type { CrabforkConfig } from "../../config/types.js";

export { resolveActiveTalkProviderConfig };

export function getRuntimeConfigSnapshot(): CrabforkConfig | null {
  return null;
}
