import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";
import type { PluginRuntime } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setGoogleChatRuntime, getRuntime: getGoogleChatRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Google Chat runtime not initialized");
export { getGoogleChatRuntime, setGoogleChatRuntime };
