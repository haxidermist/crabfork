import { resolveApprovalOverGateway } from "crabfork/plugin-sdk/approval-gateway-runtime";
import type { ExecApprovalReplyDecision } from "crabfork/plugin-sdk/approval-runtime";
import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
import { isApprovalNotFoundError } from "crabfork/plugin-sdk/error-runtime";

export { isApprovalNotFoundError };

export async function resolveMatrixApproval(params: {
  cfg: CrabforkConfig;
  approvalId: string;
  decision: ExecApprovalReplyDecision;
  senderId?: string | null;
  gatewayUrl?: string;
}): Promise<void> {
  await resolveApprovalOverGateway({
    cfg: params.cfg,
    approvalId: params.approvalId,
    decision: params.decision,
    senderId: params.senderId,
    gatewayUrl: params.gatewayUrl,
    clientDisplayName: `Matrix approval (${params.senderId?.trim() || "unknown"})`,
  });
}
