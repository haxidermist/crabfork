import Testing
@testable import Crabfork

@Suite(.serialized) struct CrabforkAppDelegateTests {
    @Test @MainActor func resolvesRegistryModelBeforeViewTaskAssignsDelegateModel() {
        let registryModel = NodeAppModel()
        CrabforkAppModelRegistry.appModel = registryModel
        defer { CrabforkAppModelRegistry.appModel = nil }

        let delegate = CrabforkAppDelegate()

        #expect(delegate._test_resolvedAppModel() === registryModel)
    }

    @Test @MainActor func prefersExplicitDelegateModelOverRegistryFallback() {
        let registryModel = NodeAppModel()
        let explicitModel = NodeAppModel()
        CrabforkAppModelRegistry.appModel = registryModel
        defer { CrabforkAppModelRegistry.appModel = nil }

        let delegate = CrabforkAppDelegate()
        delegate.appModel = explicitModel

        #expect(delegate._test_resolvedAppModel() === explicitModel)
    }
}
