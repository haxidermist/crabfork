import { vi } from "vitest";

const registryJitiMocks = vi.hoisted(() => ({
  createJiti: vi.fn(),
  discoverCrabforkPlugins: vi.fn(),
  loadPluginManifestRegistry: vi.fn(),
}));

vi.mock("jiti", () => ({
  createJiti: (...args: Parameters<typeof registryJitiMocks.createJiti>) =>
    registryJitiMocks.createJiti(...args),
}));

vi.mock("../discovery.js", () => ({
  discoverCrabforkPlugins: (
    ...args: Parameters<typeof registryJitiMocks.discoverCrabforkPlugins>
  ) => registryJitiMocks.discoverCrabforkPlugins(...args),
}));

vi.mock("../manifest-registry.js", () => ({
  loadPluginManifestRegistry: (
    ...args: Parameters<typeof registryJitiMocks.loadPluginManifestRegistry>
  ) => registryJitiMocks.loadPluginManifestRegistry(...args),
}));

export function resetRegistryJitiMocks(): void {
  registryJitiMocks.createJiti.mockReset();
  registryJitiMocks.discoverCrabforkPlugins.mockReset();
  registryJitiMocks.loadPluginManifestRegistry.mockReset();
  registryJitiMocks.discoverCrabforkPlugins.mockReturnValue({
    candidates: [],
    diagnostics: [],
  });
  registryJitiMocks.createJiti.mockImplementation(
    (_modulePath: string, _options?: Record<string, unknown>) => () => ({ default: {} }),
  );
}

export function getRegistryJitiMocks() {
  return registryJitiMocks;
}
