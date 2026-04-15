import os from "node:os";
import { vi } from "vitest";

export type SkillsHomeEnvSnapshot = {
  previousHome: string | undefined;
  previousCrabforkHome: string | undefined;
  previousUserProfile: string | undefined;
};

export function setMockSkillsHomeEnv(fakeHome: string): SkillsHomeEnvSnapshot {
  const snapshot: SkillsHomeEnvSnapshot = {
    previousHome: process.env.HOME,
    previousCrabforkHome: process.env.CRABFORK_HOME,
    previousUserProfile: process.env.USERPROFILE,
  };
  process.env.HOME = fakeHome;
  delete process.env.CRABFORK_HOME;
  delete process.env.USERPROFILE;
  vi.spyOn(os, "homedir").mockReturnValue(fakeHome);
  return snapshot;
}

export async function restoreMockSkillsHomeEnv(
  snapshot: SkillsHomeEnvSnapshot,
  cleanup?: () => Promise<void> | void,
) {
  vi.restoreAllMocks();
  if (snapshot.previousHome === undefined) {
    delete process.env.HOME;
  } else {
    process.env.HOME = snapshot.previousHome;
  }
  if (snapshot.previousCrabforkHome === undefined) {
    delete process.env.CRABFORK_HOME;
  } else {
    process.env.CRABFORK_HOME = snapshot.previousCrabforkHome;
  }
  if (snapshot.previousUserProfile === undefined) {
    delete process.env.USERPROFILE;
  } else {
    process.env.USERPROFILE = snapshot.previousUserProfile;
  }
  await cleanup?.();
}
