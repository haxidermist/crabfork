import Foundation

public enum CrabforkDeviceCommand: String, Codable, Sendable {
    case status = "device.status"
    case info = "device.info"
}

public enum CrabforkBatteryState: String, Codable, Sendable {
    case unknown
    case unplugged
    case charging
    case full
}

public enum CrabforkThermalState: String, Codable, Sendable {
    case nominal
    case fair
    case serious
    case critical
}

public enum CrabforkNetworkPathStatus: String, Codable, Sendable {
    case satisfied
    case unsatisfied
    case requiresConnection
}

public enum CrabforkNetworkInterfaceType: String, Codable, Sendable {
    case wifi
    case cellular
    case wired
    case other
}

public struct CrabforkBatteryStatusPayload: Codable, Sendable, Equatable {
    public var level: Double?
    public var state: CrabforkBatteryState
    public var lowPowerModeEnabled: Bool

    public init(level: Double?, state: CrabforkBatteryState, lowPowerModeEnabled: Bool) {
        self.level = level
        self.state = state
        self.lowPowerModeEnabled = lowPowerModeEnabled
    }
}

public struct CrabforkThermalStatusPayload: Codable, Sendable, Equatable {
    public var state: CrabforkThermalState

    public init(state: CrabforkThermalState) {
        self.state = state
    }
}

public struct CrabforkStorageStatusPayload: Codable, Sendable, Equatable {
    public var totalBytes: Int64
    public var freeBytes: Int64
    public var usedBytes: Int64

    public init(totalBytes: Int64, freeBytes: Int64, usedBytes: Int64) {
        self.totalBytes = totalBytes
        self.freeBytes = freeBytes
        self.usedBytes = usedBytes
    }
}

public struct CrabforkNetworkStatusPayload: Codable, Sendable, Equatable {
    public var status: CrabforkNetworkPathStatus
    public var isExpensive: Bool
    public var isConstrained: Bool
    public var interfaces: [CrabforkNetworkInterfaceType]

    public init(
        status: CrabforkNetworkPathStatus,
        isExpensive: Bool,
        isConstrained: Bool,
        interfaces: [CrabforkNetworkInterfaceType])
    {
        self.status = status
        self.isExpensive = isExpensive
        self.isConstrained = isConstrained
        self.interfaces = interfaces
    }
}

public struct CrabforkDeviceStatusPayload: Codable, Sendable, Equatable {
    public var battery: CrabforkBatteryStatusPayload
    public var thermal: CrabforkThermalStatusPayload
    public var storage: CrabforkStorageStatusPayload
    public var network: CrabforkNetworkStatusPayload
    public var uptimeSeconds: Double

    public init(
        battery: CrabforkBatteryStatusPayload,
        thermal: CrabforkThermalStatusPayload,
        storage: CrabforkStorageStatusPayload,
        network: CrabforkNetworkStatusPayload,
        uptimeSeconds: Double)
    {
        self.battery = battery
        self.thermal = thermal
        self.storage = storage
        self.network = network
        self.uptimeSeconds = uptimeSeconds
    }
}

public struct CrabforkDeviceInfoPayload: Codable, Sendable, Equatable {
    public var deviceName: String
    public var modelIdentifier: String
    public var systemName: String
    public var systemVersion: String
    public var appVersion: String
    public var appBuild: String
    public var locale: String

    public init(
        deviceName: String,
        modelIdentifier: String,
        systemName: String,
        systemVersion: String,
        appVersion: String,
        appBuild: String,
        locale: String)
    {
        self.deviceName = deviceName
        self.modelIdentifier = modelIdentifier
        self.systemName = systemName
        self.systemVersion = systemVersion
        self.appVersion = appVersion
        self.appBuild = appBuild
        self.locale = locale
    }
}
