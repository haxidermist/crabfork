import { describe, expect, it } from "vitest";
import { resolveIrcInboundTarget } from "./monitor.js";

describe("irc monitor inbound target", () => {
  it("keeps channel target for group messages", () => {
    expect(
      resolveIrcInboundTarget({
        target: "#crabfork",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: true,
      target: "#crabfork",
      rawTarget: "#crabfork",
    });
  });

  it("maps DM target to sender nick and preserves raw target", () => {
    expect(
      resolveIrcInboundTarget({
        target: "crabfork-bot",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: false,
      target: "alice",
      rawTarget: "crabfork-bot",
    });
  });

  it("falls back to raw target when sender nick is empty", () => {
    expect(
      resolveIrcInboundTarget({
        target: "crabfork-bot",
        senderNick: " ",
      }),
    ).toEqual({
      isGroup: false,
      target: "crabfork-bot",
      rawTarget: "crabfork-bot",
    });
  });
});
