import {
  createAccountListHelpers,
  resolveMergedAccountConfig,
} from "crabfork/plugin-sdk/account-helpers";
import { normalizeAccountId } from "crabfork/plugin-sdk/account-id";
import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
import { normalizeOptionalString } from "crabfork/plugin-sdk/text-runtime";
import { resolveZaloToken } from "./token.js";
import type { ResolvedZaloAccount, ZaloAccountConfig, ZaloConfig } from "./types.js";

export type { ResolvedZaloAccount };

const { listAccountIds: listZaloAccountIds, resolveDefaultAccountId: resolveDefaultZaloAccountId } =
  createAccountListHelpers("zalo");
export { listZaloAccountIds, resolveDefaultZaloAccountId };

function mergeZaloAccountConfig(cfg: CrabforkConfig, accountId: string): ZaloAccountConfig {
  return resolveMergedAccountConfig<ZaloAccountConfig>({
    channelConfig: cfg.channels?.zalo as ZaloAccountConfig | undefined,
    accounts: (cfg.channels?.zalo as ZaloConfig | undefined)?.accounts as
      | Record<string, Partial<ZaloAccountConfig>>
      | undefined,
    accountId,
    omitKeys: ["defaultAccount"],
  });
}

export function resolveZaloAccount(params: {
  cfg: CrabforkConfig;
  accountId?: string | null;
  allowUnresolvedSecretRef?: boolean;
}): ResolvedZaloAccount {
  const accountId = normalizeAccountId(
    params.accountId ?? (params.cfg.channels?.zalo as ZaloConfig | undefined)?.defaultAccount,
  );
  const baseEnabled = (params.cfg.channels?.zalo as ZaloConfig | undefined)?.enabled !== false;
  const merged = mergeZaloAccountConfig(params.cfg, accountId);
  const accountEnabled = merged.enabled !== false;
  const enabled = baseEnabled && accountEnabled;
  const tokenResolution = resolveZaloToken(
    params.cfg.channels?.zalo as ZaloConfig | undefined,
    accountId,
    { allowUnresolvedSecretRef: params.allowUnresolvedSecretRef },
  );

  return {
    accountId,
    name: normalizeOptionalString(merged.name),
    enabled,
    token: tokenResolution.token,
    tokenSource: tokenResolution.source,
    config: merged,
  };
}

export function listEnabledZaloAccounts(cfg: CrabforkConfig): ResolvedZaloAccount[] {
  return listZaloAccountIds(cfg)
    .map((accountId) => resolveZaloAccount({ cfg, accountId }))
    .filter((account) => account.enabled);
}
