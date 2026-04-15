import { normalizeOptionalString } from "../../../src/shared/string-coerce.js";
import { isRecord } from "../../../src/utils.js";

export type JsonObject = Record<string, unknown>;

export type ExternalPluginCompatibility = {
  pluginApiRange?: string;
  builtWithCrabforkVersion?: string;
  pluginSdkVersion?: string;
  minGatewayVersion?: string;
};

export type ExternalPluginValidationIssue = {
  fieldPath: string;
  message: string;
};

export type ExternalCodePluginValidationResult = {
  compatibility?: ExternalPluginCompatibility;
  issues: ExternalPluginValidationIssue[];
};

export const EXTERNAL_CODE_PLUGIN_REQUIRED_FIELD_PATHS = [
  "crabfork.compat.pluginApi",
  "crabfork.build.crabforkVersion",
] as const;

function readCrabforkBlock(packageJson: unknown) {
  const root = isRecord(packageJson) ? packageJson : undefined;
  const crabfork = isRecord(root?.crabfork) ? root.crabfork : undefined;
  const compat = isRecord(crabfork?.compat) ? crabfork.compat : undefined;
  const build = isRecord(crabfork?.build) ? crabfork.build : undefined;
  const install = isRecord(crabfork?.install) ? crabfork.install : undefined;
  return { root, crabfork, compat, build, install };
}

export function normalizeExternalPluginCompatibility(
  packageJson: unknown,
): ExternalPluginCompatibility | undefined {
  const { root, compat, build, install } = readCrabforkBlock(packageJson);
  const version = normalizeOptionalString(root?.version);
  const minHostVersion = normalizeOptionalString(install?.minHostVersion);
  const compatibility: ExternalPluginCompatibility = {};

  const pluginApi = normalizeOptionalString(compat?.pluginApi);
  if (pluginApi) {
    compatibility.pluginApiRange = pluginApi;
  }

  const minGatewayVersion = normalizeOptionalString(compat?.minGatewayVersion) ?? minHostVersion;
  if (minGatewayVersion) {
    compatibility.minGatewayVersion = minGatewayVersion;
  }

  const builtWithCrabforkVersion = normalizeOptionalString(build?.crabforkVersion) ?? version;
  if (builtWithCrabforkVersion) {
    compatibility.builtWithCrabforkVersion = builtWithCrabforkVersion;
  }

  const pluginSdkVersion = normalizeOptionalString(build?.pluginSdkVersion);
  if (pluginSdkVersion) {
    compatibility.pluginSdkVersion = pluginSdkVersion;
  }

  return Object.keys(compatibility).length > 0 ? compatibility : undefined;
}

export function listMissingExternalCodePluginFieldPaths(packageJson: unknown): string[] {
  const { compat, build } = readCrabforkBlock(packageJson);
  const missing: string[] = [];
  if (!normalizeOptionalString(compat?.pluginApi)) {
    missing.push("crabfork.compat.pluginApi");
  }
  if (!normalizeOptionalString(build?.crabforkVersion)) {
    missing.push("crabfork.build.crabforkVersion");
  }
  return missing;
}

export function validateExternalCodePluginPackageJson(
  packageJson: unknown,
): ExternalCodePluginValidationResult {
  const issues = listMissingExternalCodePluginFieldPaths(packageJson).map((fieldPath) => ({
    fieldPath,
    message: `${fieldPath} is required for external code plugins published to ClawHub.`,
  }));
  return {
    compatibility: normalizeExternalPluginCompatibility(packageJson),
    issues,
  };
}
