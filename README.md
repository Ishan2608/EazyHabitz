# EazyHabitz

A simple yet powerful habit tracking mobile application which provides a suit of productive features -> habits, tasks, goals, and mapping habits and tasks to goals, SWOT Analyses.

Future Optimization Features:
- Focus Mode (Pomodora Timers)
- Customize Theme
- Log Keeping

> The primary purpose of this repo is for me to learn to develop React Native applications

## Schema for the Project

```graphql
type User @table {
  email: String! @unique
  uid: String! @unique
  createdAt: Timestamp!
  displayName: String
  photoUrl: String
}

type Goal @table {
  user: User!
  name: String!
  description: String
  startDate: Date!
  endDate: Date
  status: String! @default(value: "ACTIVE")
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type Habit @table {
  user: User!
  goal: Goal
  name: String!
  description: String
  startDate: Date!
  endDate: Date
  frequency: String! @default(value: "DAILY")
  daysOfWeek: [String]
  reminderTimes: [String]
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type HabitLog @table(key: ["habit", "logDate"]) {
  habit: Habit!
  logDate: Date!
  isCompleted: Boolean!
  notes: String
  createdAt: Timestamp!
}

type TaskList @table {
  user: User!
  name: String!
  description: String
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type Task @table {
  user: User!
  taskList: TaskList
  goal: Goal
  title: String!
  description: String
  dueDate: Timestamp!
  status: String! @default(value: "OPEN")
  priority: String! @default(value: "MEDIUM")
  reminderOffsetMinutes: Int
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type SWOTAnalysis @table {
  user: User!
  goal: Goal
  strengths: String!
  weaknesses: String!
  opportunities: String!
  threats: String!
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

```