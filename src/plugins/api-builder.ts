import type { CrabforkConfig } from "../config/types.crabfork.js";
import type { PluginRuntime } from "./runtime/types.js";
import type { CrabforkPluginApi, PluginLogger } from "./types.js";

export type BuildPluginApiParams = {
  id: string;
  name: string;
  version?: string;
  description?: string;
  source: string;
  rootDir?: string;
  registrationMode: CrabforkPluginApi["registrationMode"];
  config: CrabforkConfig;
  pluginConfig?: Record<string, unknown>;
  runtime: PluginRuntime;
  logger: PluginLogger;
  resolvePath: (input: string) => string;
  handlers?: Partial<
    Pick<
      CrabforkPluginApi,
      | "registerTool"
      | "registerHook"
      | "registerHttpRoute"
      | "registerChannel"
      | "registerGatewayMethod"
      | "registerCli"
      | "registerReload"
      | "registerNodeHostCommand"
      | "registerSecurityAuditCollector"
      | "registerService"
      | "registerCliBackend"
      | "registerTextTransforms"
      | "registerConfigMigration"
      | "registerAutoEnableProbe"
      | "registerProvider"
      | "registerSpeechProvider"
      | "registerRealtimeTranscriptionProvider"
      | "registerRealtimeVoiceProvider"
      | "registerMediaUnderstandingProvider"
      | "registerImageGenerationProvider"
      | "registerVideoGenerationProvider"
      | "registerMusicGenerationProvider"
      | "registerWebFetchProvider"
      | "registerWebSearchProvider"
      | "registerInteractiveHandler"
      | "onConversationBindingResolved"
      | "registerCommand"
      | "registerContextEngine"
      | "registerCompactionProvider"
      | "registerAgentHarness"
      | "registerMemoryCapability"
      | "registerMemoryPromptSection"
      | "registerMemoryPromptSupplement"
      | "registerMemoryCorpusSupplement"
      | "registerMemoryFlushPlan"
      | "registerMemoryRuntime"
      | "registerMemoryEmbeddingProvider"
      | "on"
    >
  >;
};

const noopRegisterTool: CrabforkPluginApi["registerTool"] = () => {};
const noopRegisterHook: CrabforkPluginApi["registerHook"] = () => {};
const noopRegisterHttpRoute: CrabforkPluginApi["registerHttpRoute"] = () => {};
const noopRegisterChannel: CrabforkPluginApi["registerChannel"] = () => {};
const noopRegisterGatewayMethod: CrabforkPluginApi["registerGatewayMethod"] = () => {};
const noopRegisterCli: CrabforkPluginApi["registerCli"] = () => {};
const noopRegisterReload: CrabforkPluginApi["registerReload"] = () => {};
const noopRegisterNodeHostCommand: CrabforkPluginApi["registerNodeHostCommand"] = () => {};
const noopRegisterSecurityAuditCollector: CrabforkPluginApi["registerSecurityAuditCollector"] =
  () => {};
const noopRegisterService: CrabforkPluginApi["registerService"] = () => {};
const noopRegisterCliBackend: CrabforkPluginApi["registerCliBackend"] = () => {};
const noopRegisterTextTransforms: CrabforkPluginApi["registerTextTransforms"] = () => {};
const noopRegisterConfigMigration: CrabforkPluginApi["registerConfigMigration"] = () => {};
const noopRegisterAutoEnableProbe: CrabforkPluginApi["registerAutoEnableProbe"] = () => {};
const noopRegisterProvider: CrabforkPluginApi["registerProvider"] = () => {};
const noopRegisterSpeechProvider: CrabforkPluginApi["registerSpeechProvider"] = () => {};
const noopRegisterRealtimeTranscriptionProvider: CrabforkPluginApi["registerRealtimeTranscriptionProvider"] =
  () => {};
const noopRegisterRealtimeVoiceProvider: CrabforkPluginApi["registerRealtimeVoiceProvider"] =
  () => {};
const noopRegisterMediaUnderstandingProvider: CrabforkPluginApi["registerMediaUnderstandingProvider"] =
  () => {};
const noopRegisterImageGenerationProvider: CrabforkPluginApi["registerImageGenerationProvider"] =
  () => {};
const noopRegisterVideoGenerationProvider: CrabforkPluginApi["registerVideoGenerationProvider"] =
  () => {};
const noopRegisterMusicGenerationProvider: CrabforkPluginApi["registerMusicGenerationProvider"] =
  () => {};
const noopRegisterWebFetchProvider: CrabforkPluginApi["registerWebFetchProvider"] = () => {};
const noopRegisterWebSearchProvider: CrabforkPluginApi["registerWebSearchProvider"] = () => {};
const noopRegisterInteractiveHandler: CrabforkPluginApi["registerInteractiveHandler"] = () => {};
const noopOnConversationBindingResolved: CrabforkPluginApi["onConversationBindingResolved"] =
  () => {};
const noopRegisterCommand: CrabforkPluginApi["registerCommand"] = () => {};
const noopRegisterContextEngine: CrabforkPluginApi["registerContextEngine"] = () => {};
const noopRegisterCompactionProvider: CrabforkPluginApi["registerCompactionProvider"] = () => {};
const noopRegisterAgentHarness: CrabforkPluginApi["registerAgentHarness"] = () => {};
const noopRegisterMemoryCapability: CrabforkPluginApi["registerMemoryCapability"] = () => {};
const noopRegisterMemoryPromptSection: CrabforkPluginApi["registerMemoryPromptSection"] = () => {};
const noopRegisterMemoryPromptSupplement: CrabforkPluginApi["registerMemoryPromptSupplement"] =
  () => {};
const noopRegisterMemoryCorpusSupplement: CrabforkPluginApi["registerMemoryCorpusSupplement"] =
  () => {};
const noopRegisterMemoryFlushPlan: CrabforkPluginApi["registerMemoryFlushPlan"] = () => {};
const noopRegisterMemoryRuntime: CrabforkPluginApi["registerMemoryRuntime"] = () => {};
const noopRegisterMemoryEmbeddingProvider: CrabforkPluginApi["registerMemoryEmbeddingProvider"] =
  () => {};
const noopOn: CrabforkPluginApi["on"] = () => {};

export function buildPluginApi(params: BuildPluginApiParams): CrabforkPluginApi {
  const handlers = params.handlers ?? {};
  return {
    id: params.id,
    name: params.name,
    version: params.version,
    description: params.description,
    source: params.source,
    rootDir: params.rootDir,
    registrationMode: params.registrationMode,
    config: params.config,
    pluginConfig: params.pluginConfig,
    runtime: params.runtime,
    logger: params.logger,
    registerTool: handlers.registerTool ?? noopRegisterTool,
    registerHook: handlers.registerHook ?? noopRegisterHook,
    registerHttpRoute: handlers.registerHttpRoute ?? noopRegisterHttpRoute,
    registerChannel: handlers.registerChannel ?? noopRegisterChannel,
    registerGatewayMethod: handlers.registerGatewayMethod ?? noopRegisterGatewayMethod,
    registerCli: handlers.registerCli ?? noopRegisterCli,
    registerReload: handlers.registerReload ?? noopRegisterReload,
    registerNodeHostCommand: handlers.registerNodeHostCommand ?? noopRegisterNodeHostCommand,
    registerSecurityAuditCollector:
      handlers.registerSecurityAuditCollector ?? noopRegisterSecurityAuditCollector,
    registerService: handlers.registerService ?? noopRegisterService,
    registerCliBackend: handlers.registerCliBackend ?? noopRegisterCliBackend,
    registerTextTransforms: handlers.registerTextTransforms ?? noopRegisterTextTransforms,
    registerConfigMigration: handlers.registerConfigMigration ?? noopRegisterConfigMigration,
    registerAutoEnableProbe: handlers.registerAutoEnableProbe ?? noopRegisterAutoEnableProbe,
    registerProvider: handlers.registerProvider ?? noopRegisterProvider,
    registerSpeechProvider: handlers.registerSpeechProvider ?? noopRegisterSpeechProvider,
    registerRealtimeTranscriptionProvider:
      handlers.registerRealtimeTranscriptionProvider ?? noopRegisterRealtimeTranscriptionProvider,
    registerRealtimeVoiceProvider:
      handlers.registerRealtimeVoiceProvider ?? noopRegisterRealtimeVoiceProvider,
    registerMediaUnderstandingProvider:
      handlers.registerMediaUnderstandingProvider ?? noopRegisterMediaUnderstandingProvider,
    registerImageGenerationProvider:
      handlers.registerImageGenerationProvider ?? noopRegisterImageGenerationProvider,
    registerVideoGenerationProvider:
      handlers.registerVideoGenerationProvider ?? noopRegisterVideoGenerationProvider,
    registerMusicGenerationProvider:
      handlers.registerMusicGenerationProvider ?? noopRegisterMusicGenerationProvider,
    registerWebFetchProvider: handlers.registerWebFetchProvider ?? noopRegisterWebFetchProvider,
    registerWebSearchProvider: handlers.registerWebSearchProvider ?? noopRegisterWebSearchProvider,
    registerInteractiveHandler:
      handlers.registerInteractiveHandler ?? noopRegisterInteractiveHandler,
    onConversationBindingResolved:
      handlers.onConversationBindingResolved ?? noopOnConversationBindingResolved,
    registerCommand: handlers.registerCommand ?? noopRegisterCommand,
    registerContextEngine: handlers.registerContextEngine ?? noopRegisterContextEngine,
    registerCompactionProvider:
      handlers.registerCompactionProvider ?? noopRegisterCompactionProvider,
    registerAgentHarness: handlers.registerAgentHarness ?? noopRegisterAgentHarness,
    registerMemoryCapability: handlers.registerMemoryCapability ?? noopRegisterMemoryCapability,
    registerMemoryPromptSection:
      handlers.registerMemoryPromptSection ?? noopRegisterMemoryPromptSection,
    registerMemoryPromptSupplement:
      handlers.registerMemoryPromptSupplement ?? noopRegisterMemoryPromptSupplement,
    registerMemoryCorpusSupplement:
      handlers.registerMemoryCorpusSupplement ?? noopRegisterMemoryCorpusSupplement,
    registerMemoryFlushPlan: handlers.registerMemoryFlushPlan ?? noopRegisterMemoryFlushPlan,
    registerMemoryRuntime: handlers.registerMemoryRuntime ?? noopRegisterMemoryRuntime,
    registerMemoryEmbeddingProvider:
      handlers.registerMemoryEmbeddingProvider ?? noopRegisterMemoryEmbeddingProvider,
    resolvePath: params.resolvePath,
    on: handlers.on ?? noopOn,
  };
}
