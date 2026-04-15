import Foundation
import Testing
@testable import Crabfork

@Suite(.serialized) struct NodeServiceManagerTests {
    @Test func `builds node service commands with current CLI shape`() async throws {
        try await TestIsolation.withUserDefaultsValues(["crabfork.gatewayProjectRootPath": nil]) {
            let tmp = try makeTempDirForTests()
            CommandResolver.setProjectRoot(tmp.path)

            let crabforkPath = tmp.appendingPathComponent("node_modules/.bin/crabfork")
            try makeExecutableForTests(at: crabforkPath)

            let start = NodeServiceManager._testServiceCommand(["start"])
            #expect(start == [crabforkPath.path, "node", "start", "--json"])

            let stop = NodeServiceManager._testServiceCommand(["stop"])
            #expect(stop == [crabforkPath.path, "node", "stop", "--json"])
        }
    }
}
