import type { AnyAgentTool } from "./pi-tools.types.js";
import type { ToolPolicyLike } from "./tool-policy.js";

export type ToolPolicyPipelineStep = {
  policy: ToolPolicyLike | undefined;
  label: string;
  stripPluginOnlyAllowlist?: boolean;
  suppressUnavailableCoreToolWarning?: boolean;
  suppressUnavailableCoreToolWarningAllowlist?: string[];
};

export function buildDefaultToolPolicyPipelineSteps(params: {
  profilePolicy?: ToolPolicyLike;
  profile?: string;
  profileUnavailableCoreWarningAllowlist?: string[];
  providerProfilePolicy?: ToolPolicyLike;
  providerProfile?: string;
  providerProfileUnavailableCoreWarningAllowlist?: string[];
  globalPolicy?: ToolPolicyLike;
  globalProviderPolicy?: ToolPolicyLike;
  agentPolicy?: ToolPolicyLike;
  agentProviderPolicy?: ToolPolicyLike;
  groupPolicy?: ToolPolicyLike;
  agentId?: string;
}): ToolPolicyPipelineStep[] {
  const agentId = params.agentId?.trim();
  const profile = params.profile?.trim();
  const providerProfile = params.providerProfile?.trim();
  return [
    {
      policy: params.profilePolicy,
      label: profile ? `tools.profile (${profile})` : "tools.profile",
      stripPluginOnlyAllowlist: true,
      suppressUnavailableCoreToolWarningAllowlist: params.profileUnavailableCoreWarningAllowlist,
    },
    {
      policy: params.providerProfilePolicy,
      label: providerProfile
        ? `tools.byProvider.profile (${providerProfile})`
        : "tools.byProvider.profile",
      stripPluginOnlyAllowlist: true,
      suppressUnavailableCoreToolWarningAllowlist:
        params.providerProfileUnavailableCoreWarningAllowlist,
    },
    { policy: params.globalPolicy, label: "tools.allow", stripPluginOnlyAllowlist: true },
    {
      policy: params.globalProviderPolicy,
      label: "tools.byProvider.allow",
      stripPluginOnlyAllowlist: true,
    },
    {
      policy: params.agentPolicy,
      label: agentId ? `agents.${agentId}.tools.allow` : "agent tools.allow",
      stripPluginOnlyAllowlist: true,
    },
    {
      policy: params.agentProviderPolicy,
      label: agentId ? `agents.${agentId}.tools.byProvider.allow` : "agent tools.byProvider.allow",
      stripPluginOnlyAllowlist: true,
    },
    { policy: params.groupPolicy, label: "group tools.allow", stripPluginOnlyAllowlist: true },
  ];
}

// Crabfork: no tool policy filtering — all tools available to all agents.
export function applyToolPolicyPipeline(params: {
  tools: AnyAgentTool[];
  toolMeta: (tool: AnyAgentTool) => { pluginId: string } | undefined;
  warn: (message: string) => void;
  steps: ToolPolicyPipelineStep[];
}): AnyAgentTool[] {
  return params.tools;
}

export function resetToolPolicyWarningCacheForTest(): void {
  // no-op
}
