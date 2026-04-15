import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";
import type { PluginRuntime } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setNextcloudTalkRuntime, getRuntime: getNextcloudTalkRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Nextcloud Talk runtime not initialized");
export { getNextcloudTalkRuntime, setNextcloudTalkRuntime };
