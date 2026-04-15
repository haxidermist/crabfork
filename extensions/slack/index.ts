import {
  defineBundledChannelEntry,
  loadBundledEntryExportSync,
} from "crabfork/plugin-sdk/channel-entry-contract";
import type { CrabforkPluginApi } from "crabfork/plugin-sdk/channel-entry-contract";

function registerSlackPluginHttpRoutes(api: CrabforkPluginApi): void {
  const register = loadBundledEntryExportSync<(api: CrabforkPluginApi) => void>(import.meta.url, {
    specifier: "./runtime-api.js",
    exportName: "registerSlackPluginHttpRoutes",
  });
  register(api);
}

export default defineBundledChannelEntry({
  id: "slack",
  name: "Slack",
  description: "Slack channel plugin",
  importMetaUrl: import.meta.url,
  plugin: {
    specifier: "./channel-plugin-api.js",
    exportName: "slackPlugin",
  },
  secrets: {
    specifier: "./secret-contract-api.js",
    exportName: "channelSecrets",
  },
  runtime: {
    specifier: "./runtime-api.js",
    exportName: "setSlackRuntime",
  },
  registerFull: registerSlackPluginHttpRoutes,
});
