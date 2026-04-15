import { chunkMarkdownText } from "crabfork/plugin-sdk/reply-runtime";

export const telegramOutboundBaseAdapter = {
  deliveryMode: "direct" as const,
  chunker: chunkMarkdownText,
  chunkerMode: "markdown" as const,
  textChunkLimit: 4000,
  pollMaxOptions: 10,
};
