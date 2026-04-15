import type { ChannelRuntimeSurface } from "crabfork/plugin-sdk/channel-contract";
import type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
import type { RuntimeEnv } from "crabfork/plugin-sdk/runtime-env";

export type MonitorTelegramOpts = {
  token?: string;
  accountId?: string;
  config?: CrabforkConfig;
  runtime?: RuntimeEnv;
  channelRuntime?: ChannelRuntimeSurface;
  abortSignal?: AbortSignal;
  useWebhook?: boolean;
  webhookPath?: string;
  webhookPort?: number;
  webhookSecret?: string;
  webhookHost?: string;
  proxyFetch?: typeof fetch;
  webhookUrl?: string;
  webhookCertPath?: string;
};

export type TelegramMonitorFn = (opts?: MonitorTelegramOpts) => Promise<void>;
