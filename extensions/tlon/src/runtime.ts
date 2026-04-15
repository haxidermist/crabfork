import type { PluginRuntime } from "crabfork/plugin-sdk/plugin-runtime";
import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setTlonRuntime, getRuntime: getTlonRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Tlon runtime not initialized");
export { getTlonRuntime, setTlonRuntime };
