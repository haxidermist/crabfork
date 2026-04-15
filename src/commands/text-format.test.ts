import { describe, expect, it } from "vitest";
import { shortenText } from "./text-format.js";

describe("shortenText", () => {
  it("returns original text when it fits", () => {
    expect(shortenText("crabfork", 16)).toBe("crabfork");
  });

  it("truncates and appends ellipsis when over limit", () => {
    expect(shortenText("crabfork-status-output", 10)).toBe("crabfork-…");
  });

  it("counts multi-byte characters correctly", () => {
    expect(shortenText("hello🙂world", 7)).toBe("hello🙂…");
  });
});
