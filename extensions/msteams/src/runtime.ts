import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";
import type { PluginRuntime } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setMSTeamsRuntime, getRuntime: getMSTeamsRuntime } =
  createPluginRuntimeStore<PluginRuntime>("MSTeams runtime not initialized");
export { getMSTeamsRuntime, setMSTeamsRuntime };
