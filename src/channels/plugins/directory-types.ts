import type { CrabforkConfig } from "../../config/types.js";

export type DirectoryConfigParams = {
  cfg: CrabforkConfig;
  accountId?: string | null;
  query?: string | null;
  limit?: number | null;
};
