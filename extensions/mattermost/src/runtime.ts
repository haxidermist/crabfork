import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";
import type { PluginRuntime } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setMattermostRuntime, getRuntime: getMattermostRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Mattermost runtime not initialized");
export { getMattermostRuntime, setMattermostRuntime };
