import { defineSetupPluginEntry } from "crabfork/plugin-sdk/channel-core";
import { qaChannelPlugin } from "./src/channel.js";

export default defineSetupPluginEntry(qaChannelPlugin);
