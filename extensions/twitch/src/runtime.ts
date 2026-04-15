import type { PluginRuntime } from "crabfork/plugin-sdk/core";
import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setTwitchRuntime, getRuntime: getTwitchRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Twitch runtime not initialized");
export { getTwitchRuntime, setTwitchRuntime };
