export type MatrixManagedDeviceInfo = {
  deviceId: string;
  displayName: string | null;
  current: boolean;
};

export type MatrixDeviceHealthSummary = {
  currentDeviceId: string | null;
  staleCrabforkDevices: MatrixManagedDeviceInfo[];
  currentCrabforkDevices: MatrixManagedDeviceInfo[];
};

const CRABFORK_DEVICE_NAME_PREFIX = "Crabfork ";

export function isCrabforkManagedMatrixDevice(displayName: string | null | undefined): boolean {
  return displayName?.startsWith(CRABFORK_DEVICE_NAME_PREFIX) === true;
}

export function summarizeMatrixDeviceHealth(
  devices: MatrixManagedDeviceInfo[],
): MatrixDeviceHealthSummary {
  const currentDeviceId = devices.find((device) => device.current)?.deviceId ?? null;
  const crabForkDevices = devices.filter((device) =>
    isCrabforkManagedMatrixDevice(device.displayName),
  );
  return {
    currentDeviceId,
    staleCrabforkDevices: crabForkDevices.filter((device) => !device.current),
    currentCrabforkDevices: crabForkDevices.filter((device) => device.current),
  };
}
