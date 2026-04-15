import Foundation

public enum CrabforkCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum CrabforkCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum CrabforkCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum CrabforkCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct CrabforkCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: CrabforkCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: CrabforkCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: CrabforkCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: CrabforkCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct CrabforkCameraClipParams: Codable, Sendable, Equatable {
    public var facing: CrabforkCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: CrabforkCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: CrabforkCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: CrabforkCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
