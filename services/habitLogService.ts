// src/services/habitLogService.ts
import { db } from "../firebaseConfig";
import { 
  doc, 
  setDoc, 
  deleteDoc,
  collection, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";
import { HabitLog } from "../types";

/**
 * Logs or updates a habit completion for a specific date
 * Uses composite key: habitId_logDate
 */
export const logHabit = async (
  habitId: string, 
  logDate: string, // Format: YYYY-MM-DD
  isCompleted: boolean, 
  notes: string = ""
): Promise<void> => {
  try {
    const logId = `${habitId}_${logDate}`;
    const logRef = doc(db, "habitLogs", logId);

    await setDoc(logRef, {
      habitId,
      logDate,
      isCompleted,
      notes,
      createdAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error logging habit:", error);
    throw error;
  }
};

/**
 * Fetches all logs for a specific habit
 */
export const fetchHabitLogs = async (habitId: string): Promise<HabitLog[]> => {
  try {
    const logsRef = collection(db, "habitLogs");
    const q = query(logsRef, where("habitId", "==", habitId));
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as HabitLog[];
  } catch (error) {
    console.error("Error fetching habit logs:", error);
    throw error;
  }
};

/**
 * Fetches habit logs within a date range
 */
export const fetchHabitLogsByRange = async (
  habitId: string, 
  startDate: string, // YYYY-MM-DD
  endDate: string    // YYYY-MM-DD
): Promise<HabitLog[]> => {
  try {
    const logsRef = collection(db, "habitLogs");
    const q = query(
      logsRef, 
      where("habitId", "==", habitId),
      where("logDate", ">=", startDate),
      where("logDate", "<=", endDate)
    );
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as HabitLog[];
  } catch (error) {
    console.error("Error fetching habit logs by range:", error);
    throw error;
  }
};

/**
 * Deletes a specific habit log
 */
export const deleteHabitLog = async (
  habitId: string, 
  logDate: string
): Promise<void> => {
  try {
    const logId = `${habitId}_${logDate}`;
    const logRef = doc(db, "habitLogs", logId);
    await deleteDoc(logRef);
  } catch (error) {
    console.error("Error deleting habit log:", error);
    throw error;
  }
};