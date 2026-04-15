import type { PluginRuntime } from "crabfork/plugin-sdk/core";
import { createPluginRuntimeStore } from "crabfork/plugin-sdk/runtime-store";

const { setRuntime: setWhatsAppRuntime, getRuntime: getWhatsAppRuntime } =
  createPluginRuntimeStore<PluginRuntime>("WhatsApp runtime not initialized");
export { getWhatsAppRuntime, setWhatsAppRuntime };
