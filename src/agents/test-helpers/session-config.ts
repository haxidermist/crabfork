import type { CrabforkConfig } from "../../config/types.crabfork.js";

export function createPerSenderSessionConfig(
  overrides: Partial<NonNullable<CrabforkConfig["session"]>> = {},
): NonNullable<CrabforkConfig["session"]> {
  return {
    mainKey: "main",
    scope: "per-sender",
    ...overrides,
  };
}
