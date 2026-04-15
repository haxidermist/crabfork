export const CRABFORK_CLI_ENV_VAR = "CRABFORK_CLI";
export const CRABFORK_CLI_ENV_VALUE = "1";

export function markCrabforkExecEnv<T extends Record<string, string | undefined>>(env: T): T {
  return {
    ...env,
    [CRABFORK_CLI_ENV_VAR]: CRABFORK_CLI_ENV_VALUE,
  };
}

export function ensureCrabforkExecMarkerOnProcess(
  env: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  env[CRABFORK_CLI_ENV_VAR] = CRABFORK_CLI_ENV_VALUE;
  return env;
}
