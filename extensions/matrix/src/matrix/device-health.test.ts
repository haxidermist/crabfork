import { describe, expect, it } from "vitest";
import { isCrabforkManagedMatrixDevice, summarizeMatrixDeviceHealth } from "./device-health.js";

describe("matrix device health", () => {
  it("detects Crabfork-managed device names", () => {
    expect(isCrabforkManagedMatrixDevice("Crabfork Gateway")).toBe(true);
    expect(isCrabforkManagedMatrixDevice("Crabfork Debug")).toBe(true);
    expect(isCrabforkManagedMatrixDevice("Element iPhone")).toBe(false);
    expect(isCrabforkManagedMatrixDevice(null)).toBe(false);
  });

  it("summarizes stale Crabfork-managed devices separately from the current device", () => {
    const summary = summarizeMatrixDeviceHealth([
      {
        deviceId: "du314Zpw3A",
        displayName: "Crabfork Gateway",
        current: true,
      },
      {
        deviceId: "BritdXC6iL",
        displayName: "Crabfork Gateway",
        current: false,
      },
      {
        deviceId: "G6NJU9cTgs",
        displayName: "Crabfork Debug",
        current: false,
      },
      {
        deviceId: "phone123",
        displayName: "Element iPhone",
        current: false,
      },
    ]);

    expect(summary.currentDeviceId).toBe("du314Zpw3A");
    expect(summary.currentCrabforkDevices).toEqual([
      expect.objectContaining({ deviceId: "du314Zpw3A" }),
    ]);
    expect(summary.staleCrabforkDevices).toEqual([
      expect.objectContaining({ deviceId: "BritdXC6iL" }),
      expect.objectContaining({ deviceId: "G6NJU9cTgs" }),
    ]);
  });
});
