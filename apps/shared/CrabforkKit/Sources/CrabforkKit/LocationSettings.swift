import Foundation

public enum CrabforkLocationMode: String, Codable, Sendable, CaseIterable {
    case off
    case whileUsing
    case always
}
