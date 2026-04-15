import type { CrabforkConfig } from "../../config/types.crabfork.js";

export function makeModelFallbackCfg(overrides: Partial<CrabforkConfig> = {}): CrabforkConfig {
  return {
    agents: {
      defaults: {
        model: {
          primary: "openai/gpt-4.1-mini",
          fallbacks: ["anthropic/claude-haiku-3-5"],
        },
      },
    },
    ...overrides,
  } as CrabforkConfig;
}
