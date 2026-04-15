import Foundation

public enum CrabforkRemindersCommand: String, Codable, Sendable {
    case list = "reminders.list"
    case add = "reminders.add"
}

public enum CrabforkReminderStatusFilter: String, Codable, Sendable {
    case incomplete
    case completed
    case all
}

public struct CrabforkRemindersListParams: Codable, Sendable, Equatable {
    public var status: CrabforkReminderStatusFilter?
    public var limit: Int?

    public init(status: CrabforkReminderStatusFilter? = nil, limit: Int? = nil) {
        self.status = status
        self.limit = limit
    }
}

public struct CrabforkRemindersAddParams: Codable, Sendable, Equatable {
    public var title: String
    public var dueISO: String?
    public var notes: String?
    public var listId: String?
    public var listName: String?

    public init(
        title: String,
        dueISO: String? = nil,
        notes: String? = nil,
        listId: String? = nil,
        listName: String? = nil)
    {
        self.title = title
        self.dueISO = dueISO
        self.notes = notes
        self.listId = listId
        self.listName = listName
    }
}

public struct CrabforkReminderPayload: Codable, Sendable, Equatable {
    public var identifier: String
    public var title: String
    public var dueISO: String?
    public var completed: Bool
    public var listName: String?

    public init(
        identifier: String,
        title: String,
        dueISO: String? = nil,
        completed: Bool,
        listName: String? = nil)
    {
        self.identifier = identifier
        self.title = title
        self.dueISO = dueISO
        self.completed = completed
        self.listName = listName
    }
}

public struct CrabforkRemindersListPayload: Codable, Sendable, Equatable {
    public var reminders: [CrabforkReminderPayload]

    public init(reminders: [CrabforkReminderPayload]) {
        self.reminders = reminders
    }
}

public struct CrabforkRemindersAddPayload: Codable, Sendable, Equatable {
    public var reminder: CrabforkReminderPayload

    public init(reminder: CrabforkReminderPayload) {
        self.reminder = reminder
    }
}
