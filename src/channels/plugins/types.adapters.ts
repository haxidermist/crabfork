import type { ReplyPayload } from "../../auto-reply/reply-payload.js";
import type { LegacyConfigRule } from "../../config/legacy.shared.js";
import type { AgentBinding } from "../../config/types.agents.js";
import type { CrabforkConfig } from "../../config/types.crabfork.js";
import type { GroupToolPolicyConfig } from "../../config/types.tools.js";
import type { ChannelApprovalNativeRuntimeAdapter } from "../../infra/approval-handler-runtime-types.js";
import type { ChannelApprovalKind } from "../../infra/approval-types.js";
import type { ExecApprovalRequest, ExecApprovalResolved } from "../../infra/exec-approvals.js";
import type {
  PluginApprovalRequest,
  PluginApprovalResolved,
} from "../../infra/plugin-approvals.js";
import type { RuntimeEnv } from "../../runtime.js";
import type { ResolverContext, SecretDefaults } from "../../secrets/runtime-shared.js";
import type { SecretTargetRegistryEntry } from "../../secrets/target-registry-types.js";
import type { ChannelApprovalNativeAdapter } from "./approval-native.types.js";
import type { ChannelRuntimeSurface } from "./channel-runtime-surface.types.js";
import type { ConfigWriteTarget } from "./config-writes.js";
export type {
  ChannelOutboundAdapter,
  ChannelOutboundContext,
  ChannelOutboundFormattedContext,
  ChannelOutboundPayloadContext,
  ChannelOutboundPayloadHint,
  ChannelOutboundTargetRef,
} from "./outbound.types.js";
import type {
  ChannelAccountSnapshot,
  ChannelAccountState,
  ChannelDirectoryEntry,
  ChannelGroupContext,
  ChannelHeartbeatDeps,
  ChannelLegacyStateMigrationPlan,
  ChannelLogSink,
  ChannelSecurityContext,
  ChannelSecurityDmPolicy,
  ChannelSetupInput,
  ChannelStatusIssue,
} from "./types.core.js";
export type { ChannelPairingAdapter } from "./pairing.types.js";

type ConfiguredBindingRule = AgentBinding;
export type { ChannelApprovalKind } from "../../infra/approval-types.js";

export type ChannelActionAvailabilityState =
  | { kind: "enabled" }
  | { kind: "disabled" }
  | { kind: "unsupported" };

export type ChannelApprovalInitiatingSurfaceState = ChannelActionAvailabilityState;

export type ChannelApprovalForwardTarget = {
  channel: string;
  to: string;
  accountId?: string | null;
  threadId?: string | number | null;
  source?: "session" | "target";
};

export type ChannelCapabilitiesDisplayTone = "default" | "muted" | "success" | "warn" | "error";

export type ChannelCapabilitiesDisplayLine = {
  text: string;
  tone?: ChannelCapabilitiesDisplayTone;
};

export type ChannelCapabilitiesDiagnostics = {
  lines?: ChannelCapabilitiesDisplayLine[];
  details?: Record<string, unknown>;
};

type BivariantCallback<T extends (...args: never[]) => unknown> = {
  bivarianceHack: T;
}["bivarianceHack"];

export type ChannelSetupAdapter = {
  resolveAccountId?: (params: {
    cfg: CrabforkConfig;
    accountId?: string;
    input?: ChannelSetupInput;
  }) => string;
  resolveBindingAccountId?: (params: {
    cfg: CrabforkConfig;
    agentId: string;
    accountId?: string;
  }) => string | undefined;
  applyAccountName?: (params: {
    cfg: CrabforkConfig;
    accountId: string;
    name?: string;
  }) => CrabforkConfig;
  applyAccountConfig: (params: {
    cfg: CrabforkConfig;
    accountId: string;
    input: ChannelSetupInput;
  }) => CrabforkConfig;
  afterAccountConfigWritten?: (params: {
    previousCfg: CrabforkConfig;
    cfg: CrabforkConfig;
    accountId: string;
    input: ChannelSetupInput;
    runtime: RuntimeEnv;
  }) => Promise<void> | void;
  validateInput?: (params: {
    cfg: CrabforkConfig;
    accountId: string;
    input: ChannelSetupInput;
  }) => string | null;
  singleAccountKeysToMove?: readonly string[];
  namedAccountPromotionKeys?: readonly string[];
  resolveSingleAccountPromotionTarget?: (params: {
    channel: Record<string, unknown>;
  }) => string | undefined;
};

export type ChannelConfigAdapter<ResolvedAccount> = {
  listAccountIds: (cfg: CrabforkConfig) => string[];
  resolveAccount: (cfg: CrabforkConfig, accountId?: string | null) => ResolvedAccount;
  inspectAccount?: (cfg: CrabforkConfig, accountId?: string | null) => unknown;
  defaultAccountId?: (cfg: CrabforkConfig) => string;
  setAccountEnabled?: (params: {
    cfg: CrabforkConfig;
    accountId: string;
    enabled: boolean;
  }) => CrabforkConfig;
  deleteAccount?: (params: { cfg: CrabforkConfig; accountId: string }) => CrabforkConfig;
  isEnabled?: BivariantCallback<(account: ResolvedAccount, cfg: CrabforkConfig) => boolean>;
  disabledReason?: BivariantCallback<(account: ResolvedAccount, cfg: CrabforkConfig) => string>;
  isConfigured?: BivariantCallback<
    (account: ResolvedAccount, cfg: CrabforkConfig) => boolean | Promise<boolean>
  >;
  unconfiguredReason?: BivariantCallback<(account: ResolvedAccount, cfg: CrabforkConfig) => string>;
  describeAccount?: BivariantCallback<
    (account: ResolvedAccount, cfg: CrabforkConfig) => ChannelAccountSnapshot
  >;
  resolveAllowFrom?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
  }) => Array<string | number> | undefined;
  formatAllowFrom?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    allowFrom: Array<string | number>;
  }) => string[];
  hasConfiguredState?: (params: { cfg: CrabforkConfig; env?: NodeJS.ProcessEnv }) => boolean;
  hasPersistedAuthState?: (params: { cfg: CrabforkConfig; env?: NodeJS.ProcessEnv }) => boolean;
  resolveDefaultTo?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
  }) => string | undefined;
};

export type ChannelSecretsAdapter = {
  secretTargetRegistryEntries?: readonly SecretTargetRegistryEntry[];
  unsupportedSecretRefSurfacePatterns?: readonly string[];
  collectUnsupportedSecretRefConfigCandidates?: (raw: unknown) => Array<{
    path: string;
    value: unknown;
  }>;
  collectRuntimeConfigAssignments?: (params: {
    config: CrabforkConfig;
    defaults: SecretDefaults | undefined;
    context: ResolverContext;
  }) => void;
};

export type ChannelGroupAdapter = {
  resolveRequireMention?: (params: ChannelGroupContext) => boolean | undefined;
  resolveGroupIntroHint?: (params: ChannelGroupContext) => string | undefined;
  resolveToolPolicy?: (params: ChannelGroupContext) => GroupToolPolicyConfig | undefined;
};

export type ChannelStatusAdapter<ResolvedAccount, Probe = unknown, Audit = unknown> = {
  defaultRuntime?: ChannelAccountSnapshot;
  skipStaleSocketHealthCheck?: boolean;
  buildChannelSummary?: BivariantCallback<
    (params: {
      account: ResolvedAccount;
      cfg: CrabforkConfig;
      defaultAccountId: string;
      snapshot: ChannelAccountSnapshot;
    }) => Record<string, unknown> | Promise<Record<string, unknown>>
  >;
  probeAccount?: BivariantCallback<
    (params: { account: ResolvedAccount; timeoutMs: number; cfg: CrabforkConfig }) => Promise<Probe>
  >;
  formatCapabilitiesProbe?: BivariantCallback<
    (params: { probe: Probe }) => ChannelCapabilitiesDisplayLine[]
  >;
  auditAccount?: BivariantCallback<
    (params: {
      account: ResolvedAccount;
      timeoutMs: number;
      cfg: CrabforkConfig;
      probe?: Probe;
    }) => Promise<Audit>
  >;
  buildCapabilitiesDiagnostics?: BivariantCallback<
    (params: {
      account: ResolvedAccount;
      timeoutMs: number;
      cfg: CrabforkConfig;
      probe?: Probe;
      audit?: Audit;
      target?: string;
    }) => Promise<ChannelCapabilitiesDiagnostics | undefined>
  >;
  buildAccountSnapshot?: BivariantCallback<
    (params: {
      account: ResolvedAccount;
      cfg: CrabforkConfig;
      runtime?: ChannelAccountSnapshot;
      probe?: Probe;
      audit?: Audit;
    }) => ChannelAccountSnapshot | Promise<ChannelAccountSnapshot>
  >;
  logSelfId?: BivariantCallback<
    (params: {
      account: ResolvedAccount;
      cfg: CrabforkConfig;
      runtime: RuntimeEnv;
      includeChannelPrefix?: boolean;
    }) => void
  >;
  resolveAccountState?: BivariantCallback<
    (params: {
      account: ResolvedAccount;
      cfg: CrabforkConfig;
      configured: boolean;
      enabled: boolean;
    }) => ChannelAccountState
  >;
  collectStatusIssues?: (accounts: ChannelAccountSnapshot[]) => ChannelStatusIssue[];
};

export type ChannelGatewayContext<ResolvedAccount = unknown> = {
  cfg: CrabforkConfig;
  accountId: string;
  account: ResolvedAccount;
  runtime: RuntimeEnv;
  abortSignal: AbortSignal;
  log?: ChannelLogSink;
  getStatus: () => ChannelAccountSnapshot;
  setStatus: (next: ChannelAccountSnapshot) => void;
  /**
   * Optional channel runtime helpers for external channel plugins.
   *
   * This field provides access to advanced Plugin SDK features that are
   * available to external plugins but not to built-in channels (which can
   * directly import internal modules).
   *
   * ## Available Features
   *
   * - **reply**: AI response dispatching, formatting, and delivery
   * - **routing**: Agent route resolution and matching
   * - **text**: Text chunking, markdown processing, and control command detection
   * - **session**: Session management and metadata tracking
   * - **media**: Remote media fetching and buffer saving
   * - **commands**: Command authorization and control command handling
   * - **groups**: Group policy resolution and mention requirements
   * - **pairing**: Channel pairing and allow-from management
   *
   * ## Use Cases
   *
   * External channel plugins (e.g., email, SMS, custom integrations) that need:
   * - AI-powered response generation and delivery
   * - Advanced text processing and formatting
   * - Session tracking and management
   * - Agent routing and policy resolution
   *
   * ## Example
   *
   * ```typescript
   * const emailGatewayAdapter: ChannelGatewayAdapter<EmailAccount> = {
   *   startAccount: async (ctx) => {
   *     // Check availability (for backward compatibility)
   *     if (!ctx.channelRuntime) {
   *       ctx.log?.warn?.("channelRuntime not available - skipping AI features");
   *       return;
   *     }
   *
   *     // Use AI dispatch
   *     await ctx.channelRuntime.reply.dispatchReplyWithBufferedBlockDispatcher({
   *       ctx: { ... },
   *       cfg: ctx.cfg,
   *       dispatcherOptions: {
   *         deliver: async (payload) => {
   *           // Send reply via email
   *         },
   *       },
   *     });
   *   },
   * };
   * ```
   *
   * ## Backward Compatibility
   *
   * - This field is **optional** - channels that don't need it can ignore it
   * - Built-in channels (slack, discord, etc.) typically don't use this field
   *   because they can directly import internal modules
   * - External plugins should check for undefined before using
   * - When provided, this must be a full `createPluginRuntime().channel` surface;
   *   partial stubs are not supported
   *
   * @since Plugin SDK 2026.2.19
   * @see {@link https://docs.crabfork.ai/plugins/building-plugins | Plugin SDK documentation}
   */
  channelRuntime?: ChannelRuntimeSurface;
};

export type ChannelLogoutResult = {
  cleared: boolean;
  loggedOut?: boolean;
  [key: string]: unknown;
};

export type ChannelLoginWithQrStartResult = {
  qrDataUrl?: string;
  message: string;
};

export type ChannelLoginWithQrWaitResult = {
  connected: boolean;
  message: string;
};

export type ChannelLogoutContext<ResolvedAccount = unknown> = {
  cfg: CrabforkConfig;
  accountId: string;
  account: ResolvedAccount;
  runtime: RuntimeEnv;
  log?: ChannelLogSink;
};

export type ChannelGatewayAdapter<ResolvedAccount = unknown> = {
  startAccount?: (ctx: ChannelGatewayContext<ResolvedAccount>) => Promise<unknown>;
  stopAccount?: (ctx: ChannelGatewayContext<ResolvedAccount>) => Promise<void>;
  resolveGatewayAuthBypassPaths?: (params: { cfg: CrabforkConfig }) => string[];
  loginWithQrStart?: (params: {
    accountId?: string;
    force?: boolean;
    timeoutMs?: number;
    verbose?: boolean;
  }) => Promise<ChannelLoginWithQrStartResult>;
  loginWithQrWait?: (params: {
    accountId?: string;
    timeoutMs?: number;
  }) => Promise<ChannelLoginWithQrWaitResult>;
  logoutAccount?: (ctx: ChannelLogoutContext<ResolvedAccount>) => Promise<ChannelLogoutResult>;
};

export type ChannelAuthAdapter = {
  login?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    runtime: RuntimeEnv;
    verbose?: boolean;
    channelInput?: string | null;
  }) => Promise<void>;
};

export type ChannelHeartbeatAdapter = {
  checkReady?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    deps?: ChannelHeartbeatDeps;
  }) => Promise<{ ok: boolean; reason: string }>;
  resolveRecipients?: (params: {
    cfg: CrabforkConfig;
    opts?: { to?: string; all?: boolean; accountId?: string };
  }) => {
    recipients: string[];
    source: string;
  };
};

type ChannelDirectorySelfParams = {
  cfg: CrabforkConfig;
  accountId?: string | null;
  runtime: RuntimeEnv;
};

type ChannelDirectoryListParams = {
  cfg: CrabforkConfig;
  accountId?: string | null;
  query?: string | null;
  limit?: number | null;
  runtime: RuntimeEnv;
};

type ChannelDirectoryListGroupMembersParams = {
  cfg: CrabforkConfig;
  accountId?: string | null;
  groupId: string;
  limit?: number | null;
  runtime: RuntimeEnv;
};

export type ChannelDirectoryAdapter = {
  self?: (params: ChannelDirectorySelfParams) => Promise<ChannelDirectoryEntry | null>;
  listPeers?: (params: ChannelDirectoryListParams) => Promise<ChannelDirectoryEntry[]>;
  listPeersLive?: (params: ChannelDirectoryListParams) => Promise<ChannelDirectoryEntry[]>;
  listGroups?: (params: ChannelDirectoryListParams) => Promise<ChannelDirectoryEntry[]>;
  listGroupsLive?: (params: ChannelDirectoryListParams) => Promise<ChannelDirectoryEntry[]>;
  listGroupMembers?: (
    params: ChannelDirectoryListGroupMembersParams,
  ) => Promise<ChannelDirectoryEntry[]>;
};

export type ChannelResolveKind = "user" | "group";

export type ChannelResolveResult = {
  input: string;
  resolved: boolean;
  id?: string;
  name?: string;
  note?: string;
};

export type ChannelResolverAdapter = {
  resolveTargets: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    inputs: string[];
    kind: ChannelResolveKind;
    runtime: RuntimeEnv;
  }) => Promise<ChannelResolveResult[]>;
};

export type ChannelElevatedAdapter = {
  allowFromFallback?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
  }) => Array<string | number> | undefined;
};

export type ChannelCommandAdapter = {
  enforceOwnerForCommands?: boolean;
  skipWhenConfigEmpty?: boolean;
  nativeCommandsAutoEnabled?: boolean;
  nativeSkillsAutoEnabled?: boolean;
  preferSenderE164ForCommands?: boolean;
  resolveNativeCommandName?: (params: {
    commandKey: string;
    defaultName: string;
  }) => string | undefined;
  buildCommandsListChannelData?: (params: {
    currentPage: number;
    totalPages: number;
    agentId?: string;
  }) => ReplyPayload["channelData"] | null;
  buildModelsProviderChannelData?: (params: {
    providers: Array<{ id: string; count: number }>;
  }) => ReplyPayload["channelData"] | null;
  buildModelsListChannelData?: (params: {
    provider: string;
    models: readonly string[];
    currentModel?: string;
    currentPage: number;
    totalPages: number;
    pageSize?: number;
    modelNames?: ReadonlyMap<string, string>;
  }) => ReplyPayload["channelData"] | null;
  buildModelBrowseChannelData?: () => ReplyPayload["channelData"] | null;
};

export type ChannelDoctorConfigMutation = {
  config: CrabforkConfig;
  changes: string[];
  warnings?: string[];
};

export type ChannelDoctorLegacyConfigRule = LegacyConfigRule;

export type ChannelDoctorSequenceResult = {
  changeNotes: string[];
  warningNotes: string[];
};

export type ChannelDoctorEmptyAllowlistAccountContext = {
  account: Record<string, unknown>;
  channelName: string;
  dmPolicy?: string;
  effectiveAllowFrom?: Array<string | number>;
  parent?: Record<string, unknown>;
  prefix: string;
};

export type ChannelDoctorAdapter = {
  dmAllowFromMode?: "topOnly" | "topOrNested" | "nestedOnly";
  groupModel?: "sender" | "route" | "hybrid";
  groupAllowFromFallbackToAllowFrom?: boolean;
  warnOnEmptyGroupSenderAllowlist?: boolean;
  legacyConfigRules?: LegacyConfigRule[];
  normalizeCompatibilityConfig?: (params: { cfg: CrabforkConfig }) => ChannelDoctorConfigMutation;
  collectPreviewWarnings?: (params: {
    cfg: CrabforkConfig;
    doctorFixCommand: string;
  }) => string[] | Promise<string[]>;
  collectMutableAllowlistWarnings?: (params: {
    cfg: CrabforkConfig;
  }) => string[] | Promise<string[]>;
  repairConfig?: (params: {
    cfg: CrabforkConfig;
    doctorFixCommand: string;
  }) => ChannelDoctorConfigMutation | Promise<ChannelDoctorConfigMutation>;
  runConfigSequence?: (params: {
    cfg: CrabforkConfig;
    env: NodeJS.ProcessEnv;
    shouldRepair: boolean;
  }) => ChannelDoctorSequenceResult | Promise<ChannelDoctorSequenceResult>;
  cleanStaleConfig?: (params: {
    cfg: CrabforkConfig;
  }) => ChannelDoctorConfigMutation | Promise<ChannelDoctorConfigMutation>;
  collectEmptyAllowlistExtraWarnings?: (
    params: ChannelDoctorEmptyAllowlistAccountContext,
  ) => string[];
  shouldSkipDefaultEmptyGroupAllowlistWarning?: (
    params: ChannelDoctorEmptyAllowlistAccountContext,
  ) => boolean;
};

export type ChannelLifecycleAdapter = {
  onAccountConfigChanged?: (params: {
    prevCfg: CrabforkConfig;
    nextCfg: CrabforkConfig;
    accountId: string;
    runtime: RuntimeEnv;
  }) => Promise<void> | void;
  onAccountRemoved?: (params: {
    prevCfg: CrabforkConfig;
    accountId: string;
    runtime: RuntimeEnv;
  }) => Promise<void> | void;
  runStartupMaintenance?: (params: {
    cfg: CrabforkConfig;
    env?: NodeJS.ProcessEnv;
    log: {
      info?: (message: string) => void;
      warn?: (message: string) => void;
    };
    trigger?: string;
    logPrefix?: string;
  }) => Promise<void> | void;
  detectLegacyStateMigrations?: (params: {
    cfg: CrabforkConfig;
    env: NodeJS.ProcessEnv;
    stateDir: string;
    oauthDir: string;
  }) => ChannelLegacyStateMigrationPlan[] | Promise<ChannelLegacyStateMigrationPlan[]>;
};

export type ChannelApprovalDeliveryAdapter = {
  hasConfiguredDmRoute?: (params: { cfg: CrabforkConfig }) => boolean;
  shouldSuppressForwardingFallback?: (params: {
    cfg: CrabforkConfig;
    approvalKind: ChannelApprovalKind;
    target: ChannelApprovalForwardTarget;
    request: ExecApprovalRequest;
  }) => boolean;
};
export type ChannelApproveCommandBehavior =
  | { kind: "allow" }
  | { kind: "ignore" }
  | { kind: "reply"; text: string };

export type {
  ChannelApprovalNativeAdapter,
  ChannelApprovalNativeDeliveryCapabilities,
  ChannelApprovalNativeDeliveryPreference,
  ChannelApprovalNativeRequest,
  ChannelApprovalNativeSurface,
  ChannelApprovalNativeTarget,
} from "./approval-native.types.js";

export type ChannelApprovalRenderAdapter = {
  exec?: {
    buildPendingPayload?: (params: {
      cfg: CrabforkConfig;
      request: ExecApprovalRequest;
      target: ChannelApprovalForwardTarget;
      nowMs: number;
    }) => ReplyPayload | null;
    buildResolvedPayload?: (params: {
      cfg: CrabforkConfig;
      resolved: ExecApprovalResolved;
      target: ChannelApprovalForwardTarget;
    }) => ReplyPayload | null;
  };
  plugin?: {
    buildPendingPayload?: (params: {
      cfg: CrabforkConfig;
      request: PluginApprovalRequest;
      target: ChannelApprovalForwardTarget;
      nowMs: number;
    }) => ReplyPayload | null;
    buildResolvedPayload?: (params: {
      cfg: CrabforkConfig;
      resolved: PluginApprovalResolved;
      target: ChannelApprovalForwardTarget;
    }) => ReplyPayload | null;
  };
};

export type ChannelApprovalAdapter = {
  delivery?: ChannelApprovalDeliveryAdapter;
  nativeRuntime?: ChannelApprovalNativeRuntimeAdapter;
  render?: ChannelApprovalRenderAdapter;
  native?: ChannelApprovalNativeAdapter;
  describeExecApprovalSetup?: (params: {
    channel: string;
    channelLabel: string;
    accountId?: string;
  }) => string | null | undefined;
};

export type ChannelApprovalCapability = ChannelApprovalAdapter & {
  authorizeActorAction?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    senderId?: string | null;
    action: "approve";
    approvalKind: "exec" | "plugin";
  }) => {
    authorized: boolean;
    reason?: string;
  };
  getActionAvailabilityState?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    action: "approve";
    approvalKind?: ChannelApprovalKind;
  }) => ChannelActionAvailabilityState;
  /** Exec-native client availability for the initiating surface; distinct from same-chat auth. */
  getExecInitiatingSurfaceState?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    action: "approve";
  }) => ChannelActionAvailabilityState;
  resolveApproveCommandBehavior?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    senderId?: string | null;
    approvalKind: ChannelApprovalKind;
  }) => ChannelApproveCommandBehavior | undefined;
};

export type ChannelAllowlistAdapter = {
  applyConfigEdit?: (params: {
    cfg: CrabforkConfig;
    parsedConfig: Record<string, unknown>;
    accountId?: string | null;
    scope: "dm" | "group";
    action: "add" | "remove";
    entry: string;
  }) =>
    | {
        kind: "ok";
        changed: boolean;
        pathLabel: string;
        writeTarget: ConfigWriteTarget;
      }
    | {
        kind: "invalid-entry";
      }
    | Promise<
        | {
            kind: "ok";
            changed: boolean;
            pathLabel: string;
            writeTarget: ConfigWriteTarget;
          }
        | {
            kind: "invalid-entry";
          }
      >
    | null;
  readConfig?: (params: { cfg: CrabforkConfig; accountId?: string | null }) =>
    | {
        dmAllowFrom?: Array<string | number>;
        groupAllowFrom?: Array<string | number>;
        dmPolicy?: string;
        groupPolicy?: string;
        groupOverrides?: Array<{ label: string; entries: Array<string | number> }>;
      }
    | Promise<{
        dmAllowFrom?: Array<string | number>;
        groupAllowFrom?: Array<string | number>;
        dmPolicy?: string;
        groupPolicy?: string;
        groupOverrides?: Array<{ label: string; entries: Array<string | number> }>;
      }>;
  resolveNames?: (params: {
    cfg: CrabforkConfig;
    accountId?: string | null;
    scope: "dm" | "group";
    entries: string[];
  }) =>
    | Array<{ input: string; resolved: boolean; name?: string | null }>
    | Promise<Array<{ input: string; resolved: boolean; name?: string | null }>>;
  supportsScope?: (params: { scope: "dm" | "group" | "all" }) => boolean;
};

export type ChannelConfiguredBindingConversationRef = {
  conversationId: string;
  parentConversationId?: string;
};

export type ChannelConfiguredBindingMatch = ChannelConfiguredBindingConversationRef & {
  matchPriority?: number;
};

export type ChannelCommandConversationContext = {
  accountId: string;
  threadId?: string;
  threadParentId?: string;
  senderId?: string;
  sessionKey?: string;
  parentSessionKey?: string;
  from?: string;
  chatType?: string;
  originatingTo?: string;
  commandTo?: string;
  fallbackTo?: string;
};

export type ChannelConfiguredBindingProvider = {
  selfParentConversationByDefault?: boolean;
  compileConfiguredBinding: (params: {
    binding: ConfiguredBindingRule;
    conversationId: string;
  }) => ChannelConfiguredBindingConversationRef | null;
  matchInboundConversation: (params: {
    binding: ConfiguredBindingRule;
    compiledBinding: ChannelConfiguredBindingConversationRef;
    conversationId: string;
    parentConversationId?: string;
  }) => ChannelConfiguredBindingMatch | null;
  resolveCommandConversation?: (
    params: ChannelCommandConversationContext,
  ) => ChannelConfiguredBindingConversationRef | null;
};

export type ChannelConversationBindingSupport = {
  supportsCurrentConversationBinding?: boolean;
  /**
   * Preferred placement when a command is started from a top-level conversation
   * without an existing native thread id.
   *
   * - `current`: bind/spawn in the current conversation
   * - `child`: create a child thread/conversation first
   */
  defaultTopLevelPlacement?: "current" | "child";
  resolveConversationRef?: (params: {
    accountId?: string | null;
    conversationId: string;
    parentConversationId?: string;
    threadId?: string | number | null;
  }) => {
    conversationId: string;
    parentConversationId?: string;
  } | null;
  buildBoundReplyChannelData?: (params: {
    operation: "acp-spawn";
    placement: "current" | "child";
    conversation: {
      channel: string;
      accountId?: string | null;
      conversationId: string;
      parentConversationId?: string;
    };
  }) => ReplyPayload["channelData"] | null | Promise<ReplyPayload["channelData"] | null>;
  buildModelOverrideParentCandidates?: (params: {
    parentConversationId?: string | null;
  }) => string[] | null | undefined;
  shouldStripThreadFromAnnounceOrigin?: (params: {
    requester: {
      channel?: string;
      to?: string;
      threadId?: string | number;
    };
    entry: {
      channel?: string;
      to?: string;
      threadId?: string | number;
    };
  }) => boolean;
  setIdleTimeoutBySessionKey?: (params: {
    targetSessionKey: string;
    accountId?: string | null;
    idleTimeoutMs: number;
  }) => Array<{
    boundAt: number;
    lastActivityAt: number;
    idleTimeoutMs?: number;
    maxAgeMs?: number;
  }>;
  setMaxAgeBySessionKey?: (params: {
    targetSessionKey: string;
    accountId?: string | null;
    maxAgeMs: number;
  }) => Array<{
    boundAt: number;
    lastActivityAt: number;
    idleTimeoutMs?: number;
    maxAgeMs?: number;
  }>;
  createManager?: (params: { cfg: CrabforkConfig; accountId?: string | null }) =>
    | {
        stop: () => void | Promise<void>;
      }
    | Promise<{
        stop: () => void | Promise<void>;
      }>;
};

export type ChannelSecurityAdapter<ResolvedAccount = unknown> = {
  applyConfigFixes?: (params: {
    cfg: CrabforkConfig;
    env: NodeJS.ProcessEnv;
  }) => ChannelDoctorConfigMutation | Promise<ChannelDoctorConfigMutation>;
  resolveDmPolicy?: BivariantCallback<
    (ctx: ChannelSecurityContext<ResolvedAccount>) => ChannelSecurityDmPolicy | null
  >;
  collectWarnings?: BivariantCallback<
    (ctx: ChannelSecurityContext<ResolvedAccount>) => Promise<string[]> | string[]
  >;
  collectAuditFindings?: BivariantCallback<
    (
      ctx: ChannelSecurityContext<ResolvedAccount> & {
        sourceConfig: CrabforkConfig;
        orderedAccountIds: string[];
        hasExplicitAccountPath: boolean;
      },
    ) =>
      | Promise<
          Array<{
            checkId: string;
            severity: "info" | "warn" | "critical";
            title: string;
            detail: string;
            remediation?: string;
          }>
        >
      | Array<{
          checkId: string;
          severity: "info" | "warn" | "critical";
          title: string;
          detail: string;
          remediation?: string;
        }>
  >;
};
