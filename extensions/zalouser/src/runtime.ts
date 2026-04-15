import type { PluginRuntime } from "crabfork/plugin-sdk/core";
import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setZalouserRuntime, getRuntime: getZalouserRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Zalouser runtime not initialized");
export { getZalouserRuntime, setZalouserRuntime };
