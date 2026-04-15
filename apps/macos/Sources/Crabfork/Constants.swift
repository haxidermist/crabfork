import Foundation

// Stable identifier used for both the macOS LaunchAgent label and Nix-managed defaults suite.
// nix-crabfork writes app defaults into this suite to survive app bundle identifier churn.
let launchdLabel = "ai.crabfork.mac"
let gatewayLaunchdLabel = "ai.crabfork.gateway"
let onboardingVersionKey = "crabfork.onboardingVersion"
let onboardingSeenKey = "crabfork.onboardingSeen"
let currentOnboardingVersion = 7
let pauseDefaultsKey = "crabfork.pauseEnabled"
let iconAnimationsEnabledKey = "crabfork.iconAnimationsEnabled"
let swabbleEnabledKey = "crabfork.swabbleEnabled"
let swabbleTriggersKey = "crabfork.swabbleTriggers"
let voiceWakeTriggerChimeKey = "crabfork.voiceWakeTriggerChime"
let voiceWakeSendChimeKey = "crabfork.voiceWakeSendChime"
let showDockIconKey = "crabfork.showDockIcon"
let defaultVoiceWakeTriggers = ["crabfork"]
let voiceWakeMaxWords = 32
let voiceWakeMaxWordLength = 64
let voiceWakeMicKey = "crabfork.voiceWakeMicID"
let voiceWakeMicNameKey = "crabfork.voiceWakeMicName"
let voiceWakeLocaleKey = "crabfork.voiceWakeLocaleID"
let voiceWakeAdditionalLocalesKey = "crabfork.voiceWakeAdditionalLocaleIDs"
let voicePushToTalkEnabledKey = "crabfork.voicePushToTalkEnabled"
let voiceWakeTriggersTalkModeKey = "crabfork.voiceWakeTriggersTalkMode"
let talkEnabledKey = "crabfork.talkEnabled"
let iconOverrideKey = "crabfork.iconOverride"
let connectionModeKey = "crabfork.connectionMode"
let remoteTargetKey = "crabfork.remoteTarget"
let remoteIdentityKey = "crabfork.remoteIdentity"
let remoteProjectRootKey = "crabfork.remoteProjectRoot"
let remoteCliPathKey = "crabfork.remoteCliPath"
let canvasEnabledKey = "crabfork.canvasEnabled"
let cameraEnabledKey = "crabfork.cameraEnabled"
let systemRunPolicyKey = "crabfork.systemRunPolicy"
let systemRunAllowlistKey = "crabfork.systemRunAllowlist"
let systemRunEnabledKey = "crabfork.systemRunEnabled"
let locationModeKey = "crabfork.locationMode"
let locationPreciseKey = "crabfork.locationPreciseEnabled"
let peekabooBridgeEnabledKey = "crabfork.peekabooBridgeEnabled"
let deepLinkKeyKey = "crabfork.deepLinkKey"
let modelCatalogPathKey = "crabfork.modelCatalogPath"
let modelCatalogReloadKey = "crabfork.modelCatalogReload"
let cliInstallPromptedVersionKey = "crabfork.cliInstallPromptedVersion"
let heartbeatsEnabledKey = "crabfork.heartbeatsEnabled"
let debugPaneEnabledKey = "crabfork.debugPaneEnabled"
let debugFileLogEnabledKey = "crabfork.debug.fileLogEnabled"
let appLogLevelKey = "crabfork.debug.appLogLevel"
let voiceWakeSupported: Bool = ProcessInfo.processInfo.operatingSystemVersion.majorVersion >= 26
