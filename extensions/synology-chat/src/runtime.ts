import type { PluginRuntime } from "crabfork/plugin-sdk/core";
import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setSynologyRuntime, getRuntime: getSynologyRuntime } =
  createPluginRuntimeStore<PluginRuntime>(
    "Synology Chat runtime not initialized - plugin not registered",
  );
export { getSynologyRuntime, setSynologyRuntime };
