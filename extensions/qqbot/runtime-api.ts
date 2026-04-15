export type { ChannelPlugin, CrabforkPluginApi, PluginRuntime } from "crabfork/plugin-sdk/core";
export type { CrabforkConfig } from "crabfork/plugin-sdk/config-runtime";
export type {
  CrabforkPluginService,
  CrabforkPluginServiceContext,
  PluginLogger,
} from "crabfork/plugin-sdk/core";
export type { ResolvedQQBotAccount, QQBotAccountConfig } from "./src/types.js";
export { getQQBotRuntime, setQQBotRuntime } from "./src/runtime.js";
