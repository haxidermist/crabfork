// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "CrabforkKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "CrabforkProtocol", targets: ["CrabforkProtocol"]),
        .library(name: "CrabforkKit", targets: ["CrabforkKit"]),
        .library(name: "CrabforkChatUI", targets: ["CrabforkChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "CrabforkProtocol",
            path: "Sources/CrabforkProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CrabforkKit",
            dependencies: [
                "CrabforkProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/CrabforkKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CrabforkChatUI",
            dependencies: [
                "CrabforkKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/CrabforkChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "CrabforkKitTests",
            dependencies: ["CrabforkKit", "CrabforkChatUI"],
            path: "Tests/CrabforkKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
