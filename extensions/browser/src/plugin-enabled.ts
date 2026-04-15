import type { CrabforkConfig } from "crabfork/plugin-sdk/browser-config-runtime";
import {
  normalizePluginsConfig,
  resolveEffectiveEnableState,
} from "crabfork/plugin-sdk/browser-config-runtime";

export function isDefaultBrowserPluginEnabled(cfg: CrabforkConfig): boolean {
  return resolveEffectiveEnableState({
    id: "browser",
    origin: "bundled",
    config: normalizePluginsConfig(cfg.plugins),
    rootConfig: cfg,
    enabledByDefault: true,
  }).enabled;
}
