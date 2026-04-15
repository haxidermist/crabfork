import { describe, expect, it } from "vitest";
import { normalizePackageTagInput } from "./package-tag.js";

describe("normalizePackageTagInput", () => {
  const packageNames = ["crabfork", "@crabfork/plugin"] as const;

  it.each([
    { input: undefined, expected: null },
    { input: "   ", expected: null },
    { input: "crabfork@beta", expected: "beta" },
    { input: "@crabfork/plugin@2026.2.24", expected: "2026.2.24" },
    { input: "crabfork@   ", expected: null },
    { input: "crabfork", expected: null },
    { input: " @crabfork/plugin ", expected: null },
    { input: " latest ", expected: "latest" },
    { input: "@other/plugin@beta", expected: "@other/plugin@beta" },
    { input: "crabforker@beta", expected: "crabforker@beta" },
  ] satisfies ReadonlyArray<{ input: string | undefined; expected: string | null }>)(
    "normalizes %j",
    ({ input, expected }) => {
      expect(normalizePackageTagInput(input, packageNames)).toBe(expected);
    },
  );
});
