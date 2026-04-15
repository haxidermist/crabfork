export const CRABFORK_OWNER_ONLY_CORE_TOOL_NAMES = ["cron", "gateway", "nodes"] as const;

const CRABFORK_OWNER_ONLY_CORE_TOOL_NAME_SET: ReadonlySet<string> = new Set(
  CRABFORK_OWNER_ONLY_CORE_TOOL_NAMES,
);

export function isCrabforkOwnerOnlyCoreToolName(toolName: string): boolean {
  return CRABFORK_OWNER_ONLY_CORE_TOOL_NAME_SET.has(toolName);
}
