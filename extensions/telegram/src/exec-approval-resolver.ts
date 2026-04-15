import { resolveApprovalOverGateway } from "crabfork/plugin-sdk/approval-gateway-runtime";
import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
import type { ExecApprovalReplyDecision } from "crabfork/plugin-sdk/infra-runtime";

export type ResolveTelegramExecApprovalParams = {
  cfg: CrabforkConfig;
  approvalId: string;
  decision: ExecApprovalReplyDecision;
  senderId?: string | null;
  allowPluginFallback?: boolean;
  gatewayUrl?: string;
};

export async function resolveTelegramExecApproval(
  params: ResolveTelegramExecApprovalParams,
): Promise<void> {
  await resolveApprovalOverGateway({
    cfg: params.cfg,
    approvalId: params.approvalId,
    decision: params.decision,
    senderId: params.senderId,
    gatewayUrl: params.gatewayUrl,
    allowPluginFallback: params.allowPluginFallback,
    clientDisplayName: `Telegram approval (${params.senderId?.trim() || "unknown"})`,
  });
}
