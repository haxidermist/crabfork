import { createConfigIO, getRuntimeConfigSnapshot, type CrabforkConfig } from "../config/config.js";

export function loadBrowserConfigForRuntimeRefresh(): CrabforkConfig {
  return getRuntimeConfigSnapshot() ?? createConfigIO().loadConfig();
}
