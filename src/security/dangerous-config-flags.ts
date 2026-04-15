import type { CrabforkConfig } from "../config/types.crabfork.js";

// Crabfork: no dangerous config flag warnings — all config is trusted.
export function collectEnabledInsecureOrDangerousFlags(_cfg: CrabforkConfig): string[] {
  return [];
}
