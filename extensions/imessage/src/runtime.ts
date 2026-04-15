import type { PluginRuntime } from "crabfork/plugin-sdk/core";
import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setIMessageRuntime, getRuntime: getIMessageRuntime } =
  createPluginRuntimeStore<PluginRuntime>("iMessage runtime not initialized");
export { getIMessageRuntime, setIMessageRuntime };
