export type McpLoopbackRuntime = {
  port: number;
  token: string;
};

let activeRuntime: McpLoopbackRuntime | undefined;

export function getActiveMcpLoopbackRuntime(): McpLoopbackRuntime | undefined {
  return activeRuntime ? { ...activeRuntime } : undefined;
}

export function setActiveMcpLoopbackRuntime(runtime: McpLoopbackRuntime): void {
  activeRuntime = { ...runtime };
}

export function clearActiveMcpLoopbackRuntime(token: string): void {
  if (activeRuntime?.token === token) {
    activeRuntime = undefined;
  }
}

export function createMcpLoopbackServerConfig(port: number) {
  return {
    mcpServers: {
      crabfork: {
        type: "http",
        url: `http://127.0.0.1:${port}/mcp`,
        headers: {
          Authorization: "Bearer ${CRABFORK_MCP_TOKEN}",
          "x-session-key": "${CRABFORK_MCP_SESSION_KEY}",
          "x-crabfork-agent-id": "${CRABFORK_MCP_AGENT_ID}",
          "x-crabfork-account-id": "${CRABFORK_MCP_ACCOUNT_ID}",
          "x-crabfork-message-channel": "${CRABFORK_MCP_MESSAGE_CHANNEL}",
          "x-crabfork-sender-is-owner": "${CRABFORK_MCP_SENDER_IS_OWNER}",
        },
      },
    },
  };
}
