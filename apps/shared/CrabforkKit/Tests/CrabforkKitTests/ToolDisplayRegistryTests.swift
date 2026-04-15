import CrabforkKit
import Foundation
import Testing

@Suite struct ToolDisplayRegistryTests {
    @Test func loadsToolDisplayConfigFromBundle() {
        let url = CrabforkKitResources.bundle.url(forResource: "tool-display", withExtension: "json")
        #expect(url != nil)
    }

    @Test func resolvesKnownToolFromConfig() {
        let summary = ToolDisplayRegistry.resolve(name: "exec", args: nil)
        #expect(summary.emoji == "🛠️")
        #expect(summary.title == "Exec")
    }
}
