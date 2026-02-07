import { Timestamp } from "firebase/firestore";

export interface User {
  email: string;
  uid: string;
  createdAt: Timestamp;
  displayName: string;
  photoUrl: string;
}

export interface Goal {
  id?: string;
  userId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "ACTIVE" | "COMPLETED" | "ARCHIVED";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Habit {
  id?: string;
  userId: string;
  goalId: string | null;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  frequency: "DAILY" | "WEEKLY" | "CUSTOM";
  daysOfWeek: string[];
  reminderTimes: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface HabitLog {
  id?: string;
  habitId: string;
  logDate: string; // YYYY-MM-DD format
  isCompleted: boolean;
  notes: string;
  createdAt: Timestamp;
}

export interface TaskList {
  id?: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Task {
  id?: string;
  userId: string;
  taskListId: string | null;
  goalId: string | null;
  title: string;
  description: string;
  dueDate: Timestamp;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  reminderOffsetMinutes: number | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SWOTAnalysis {
  id?: string;
  userId: string;
  goalId: string | null;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}