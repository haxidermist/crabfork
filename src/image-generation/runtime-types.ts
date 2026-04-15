import type { AuthProfileStore } from "../agents/auth-profiles/types.js";
import type { FallbackAttempt } from "../agents/model-fallback.types.js";
import type { CrabforkConfig } from "../config/types.crabfork.js";
import type {
  GeneratedImageAsset,
  ImageGenerationIgnoredOverride,
  ImageGenerationNormalization,
  ImageGenerationProvider,
  ImageGenerationResolution,
  ImageGenerationSourceImage,
} from "./types.js";

export type GenerateImageParams = {
  cfg: CrabforkConfig;
  prompt: string;
  agentDir?: string;
  authStore?: AuthProfileStore;
  modelOverride?: string;
  count?: number;
  size?: string;
  aspectRatio?: string;
  resolution?: ImageGenerationResolution;
  inputImages?: ImageGenerationSourceImage[];
};

export type GenerateImageRuntimeResult = {
  images: GeneratedImageAsset[];
  provider: string;
  model: string;
  attempts: FallbackAttempt[];
  normalization?: ImageGenerationNormalization;
  metadata?: Record<string, unknown>;
  ignoredOverrides: ImageGenerationIgnoredOverride[];
};

export type ListRuntimeImageGenerationProvidersParams = {
  config?: CrabforkConfig;
};

export type RuntimeImageGenerationProvider = ImageGenerationProvider;
