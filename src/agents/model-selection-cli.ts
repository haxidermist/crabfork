import type { CrabforkConfig } from "../config/types.crabfork.js";
import { resolveRuntimeCliBackends } from "../plugins/cli-backends.runtime.js";
import { resolvePluginSetupCliBackendRuntime } from "../plugins/setup-registry.runtime.js";
import { normalizeProviderId } from "./model-selection-normalize.js";

export function isCliProvider(provider: string, cfg?: CrabforkConfig): boolean {
  const normalized = normalizeProviderId(provider);
  const cliBackends = resolveRuntimeCliBackends();
  if (cliBackends.some((backend) => normalizeProviderId(backend.id) === normalized)) {
    return true;
  }
  if (resolvePluginSetupCliBackendRuntime({ backend: normalized })) {
    return true;
  }
  const backends = cfg?.agents?.defaults?.cliBackends ?? {};
  return Object.keys(backends).some((key) => normalizeProviderId(key) === normalized);
}
