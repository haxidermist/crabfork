// swift-tools-version: 6.2
// Package manifest for the Crabfork macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "Crabfork",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "CrabforkIPC", targets: ["CrabforkIPC"]),
        .library(name: "CrabforkDiscovery", targets: ["CrabforkDiscovery"]),
        .executable(name: "Crabfork", targets: ["Crabfork"]),
        .executable(name: "crabfork-mac", targets: ["CrabforkMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.4.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.10.1"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.9.0"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(url: "https://github.com/Blaizzy/mlx-audio-swift", exact: "0.1.2"),
        .package(path: "../shared/CrabforkKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "CrabforkIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CrabforkDiscovery",
            dependencies: [
                .product(name: "CrabforkKit", package: "CrabforkKit"),
            ],
            path: "Sources/CrabforkDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "Crabfork",
            dependencies: [
                "CrabforkIPC",
                "CrabforkDiscovery",
                .product(name: "CrabforkKit", package: "CrabforkKit"),
                .product(name: "CrabforkChatUI", package: "CrabforkKit"),
                .product(name: "CrabforkProtocol", package: "CrabforkKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
                .product(name: "MLXAudioTTS", package: "mlx-audio-swift"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/Crabfork.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "CrabforkMacCLI",
            dependencies: [
                "CrabforkDiscovery",
                .product(name: "CrabforkKit", package: "CrabforkKit"),
                .product(name: "CrabforkProtocol", package: "CrabforkKit"),
            ],
            path: "Sources/CrabforkMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "CrabforkIPCTests",
            dependencies: [
                "CrabforkIPC",
                "Crabfork",
                "CrabforkDiscovery",
                .product(name: "CrabforkProtocol", package: "CrabforkKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
