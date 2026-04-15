import CoreLocation
import Foundation
import CrabforkKit
import UIKit

typealias CrabforkCameraSnapResult = (format: String, base64: String, width: Int, height: Int)
typealias CrabforkCameraClipResult = (format: String, base64: String, durationMs: Int, hasAudio: Bool)

protocol CameraServicing: Sendable {
    func listDevices() async -> [CameraController.CameraDeviceInfo]
    func snap(params: CrabforkCameraSnapParams) async throws -> CrabforkCameraSnapResult
    func clip(params: CrabforkCameraClipParams) async throws -> CrabforkCameraClipResult
}

protocol ScreenRecordingServicing: Sendable {
    func record(
        screenIndex: Int?,
        durationMs: Int?,
        fps: Double?,
        includeAudio: Bool?,
        outPath: String?) async throws -> String
}

@MainActor
protocol LocationServicing: Sendable {
    func authorizationStatus() -> CLAuthorizationStatus
    func accuracyAuthorization() -> CLAccuracyAuthorization
    func ensureAuthorization(mode: CrabforkLocationMode) async -> CLAuthorizationStatus
    func currentLocation(
        params: CrabforkLocationGetParams,
        desiredAccuracy: CrabforkLocationAccuracy,
        maxAgeMs: Int?,
        timeoutMs: Int?) async throws -> CLLocation
    func startLocationUpdates(
        desiredAccuracy: CrabforkLocationAccuracy,
        significantChangesOnly: Bool) -> AsyncStream<CLLocation>
    func stopLocationUpdates()
    func startMonitoringSignificantLocationChanges(onUpdate: @escaping @Sendable (CLLocation) -> Void)
    func stopMonitoringSignificantLocationChanges()
}

@MainActor
protocol DeviceStatusServicing: Sendable {
    func status() async throws -> CrabforkDeviceStatusPayload
    func info() -> CrabforkDeviceInfoPayload
}

protocol PhotosServicing: Sendable {
    func latest(params: CrabforkPhotosLatestParams) async throws -> CrabforkPhotosLatestPayload
}

protocol ContactsServicing: Sendable {
    func search(params: CrabforkContactsSearchParams) async throws -> CrabforkContactsSearchPayload
    func add(params: CrabforkContactsAddParams) async throws -> CrabforkContactsAddPayload
}

protocol CalendarServicing: Sendable {
    func events(params: CrabforkCalendarEventsParams) async throws -> CrabforkCalendarEventsPayload
    func add(params: CrabforkCalendarAddParams) async throws -> CrabforkCalendarAddPayload
}

protocol RemindersServicing: Sendable {
    func list(params: CrabforkRemindersListParams) async throws -> CrabforkRemindersListPayload
    func add(params: CrabforkRemindersAddParams) async throws -> CrabforkRemindersAddPayload
}

protocol MotionServicing: Sendable {
    func activities(params: CrabforkMotionActivityParams) async throws -> CrabforkMotionActivityPayload
    func pedometer(params: CrabforkPedometerParams) async throws -> CrabforkPedometerPayload
}

struct WatchMessagingStatus: Sendable, Equatable {
    var supported: Bool
    var paired: Bool
    var appInstalled: Bool
    var reachable: Bool
    var activationState: String
}

struct WatchQuickReplyEvent: Sendable, Equatable {
    var replyId: String
    var promptId: String
    var actionId: String
    var actionLabel: String?
    var sessionKey: String?
    var note: String?
    var sentAtMs: Int?
    var transport: String
}

struct WatchExecApprovalResolveEvent: Sendable, Equatable {
    var replyId: String
    var approvalId: String
    var decision: CrabforkWatchExecApprovalDecision
    var sentAtMs: Int?
    var transport: String
}

struct WatchExecApprovalSnapshotRequestEvent: Sendable, Equatable {
    var requestId: String
    var sentAtMs: Int?
    var transport: String
}

struct WatchNotificationSendResult: Sendable, Equatable {
    var deliveredImmediately: Bool
    var queuedForDelivery: Bool
    var transport: String
}

protocol WatchMessagingServicing: AnyObject, Sendable {
    func status() async -> WatchMessagingStatus
    func setStatusHandler(_ handler: (@Sendable (WatchMessagingStatus) -> Void)?)
    func setReplyHandler(_ handler: (@Sendable (WatchQuickReplyEvent) -> Void)?)
    func setExecApprovalResolveHandler(_ handler: (@Sendable (WatchExecApprovalResolveEvent) -> Void)?)
    func setExecApprovalSnapshotRequestHandler(
        _ handler: (@Sendable (WatchExecApprovalSnapshotRequestEvent) -> Void)?)
    func sendNotification(
        id: String,
        params: CrabforkWatchNotifyParams) async throws -> WatchNotificationSendResult
    func sendExecApprovalPrompt(
        _ message: CrabforkWatchExecApprovalPromptMessage) async throws -> WatchNotificationSendResult
    func sendExecApprovalResolved(
        _ message: CrabforkWatchExecApprovalResolvedMessage) async throws -> WatchNotificationSendResult
    func sendExecApprovalExpired(
        _ message: CrabforkWatchExecApprovalExpiredMessage) async throws -> WatchNotificationSendResult
    func syncExecApprovalSnapshot(
        _ message: CrabforkWatchExecApprovalSnapshotMessage) async throws -> WatchNotificationSendResult
}

extension CameraController: CameraServicing {}
extension ScreenRecordService: ScreenRecordingServicing {}
extension LocationService: LocationServicing {}
