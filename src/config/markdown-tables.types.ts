import type { MarkdownTableMode } from "./types.base.js";
import type { CrabforkConfig } from "./types.crabfork.js";

export type ResolveMarkdownTableModeParams = {
  cfg?: Partial<CrabforkConfig>;
  channel?: string | null;
  accountId?: string | null;
};

export type ResolveMarkdownTableMode = (
  params: ResolveMarkdownTableModeParams,
) => MarkdownTableMode;
