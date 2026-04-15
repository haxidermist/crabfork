import { definePluginEntry, type CrabforkPluginApi } from "./runtime-api.js";

export default definePluginEntry({
  id: "open-prose",
  name: "OpenProse",
  description: "Plugin-shipped prose skills bundle",
  register(_api: CrabforkPluginApi) {
    // OpenProse is delivered via plugin-shipped skills.
  },
});
