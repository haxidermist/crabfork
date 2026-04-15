import type { CrabforkConfig } from "../config/types.crabfork.js";
import { resolvePluginTools } from "../plugins/tools.js";
import { getActiveSecretsRuntimeSnapshot } from "../secrets/runtime.js";
import { normalizeDeliveryContext } from "../utils/delivery-context.js";
import {
  resolveCrabforkPluginToolInputs,
  type CrabforkPluginToolOptions,
} from "./crabfork-tools.plugin-context.js";
import { applyPluginToolDeliveryDefaults } from "./plugin-tool-delivery-defaults.js";
import type { AnyAgentTool } from "./tools/common.js";

type ResolveCrabforkPluginToolsOptions = CrabforkPluginToolOptions & {
  pluginToolAllowlist?: string[];
  currentChannelId?: string;
  currentThreadTs?: string;
  currentMessageId?: string | number;
  sandboxRoot?: string;
  modelHasVision?: boolean;
  modelProvider?: string;
  allowMediaInvokeCommands?: boolean;
  requesterAgentIdOverride?: string;
  requireExplicitMessageTarget?: boolean;
  disableMessageTool?: boolean;
  disablePluginTools?: boolean;
};

export function resolveCrabforkPluginToolsForOptions(params: {
  options?: ResolveCrabforkPluginToolsOptions;
  resolvedConfig?: CrabforkConfig;
  existingToolNames?: Set<string>;
}): AnyAgentTool[] {
  if (params.options?.disablePluginTools) {
    return [];
  }

  const runtimeSnapshot = getActiveSecretsRuntimeSnapshot();
  const deliveryContext = normalizeDeliveryContext({
    channel: params.options?.agentChannel,
    to: params.options?.agentTo,
    accountId: params.options?.agentAccountId,
    threadId: params.options?.agentThreadId,
  });

  const pluginTools = resolvePluginTools({
    ...resolveCrabforkPluginToolInputs({
      options: params.options,
      resolvedConfig: params.resolvedConfig,
      runtimeConfig: runtimeSnapshot?.config,
    }),
    existingToolNames: params.existingToolNames ?? new Set<string>(),
    toolAllowlist: params.options?.pluginToolAllowlist,
  });

  return applyPluginToolDeliveryDefaults({
    tools: pluginTools,
    deliveryContext,
  });
}
