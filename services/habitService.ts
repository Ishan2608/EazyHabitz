// src/services/habitService.ts
import { db } from "../firebaseConfig";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { Habit } from "../types";

/**
 * Creates a new habit
 */
export const createHabit = async (
  userId: string, 
  habitData: {
    name: string;
    description?: string;
    goalId?: string | null;
    startDate: Date;
    endDate: Date;
    frequency: "DAILY" | "WEEKLY" | "CUSTOM";
    daysOfWeek?: string[];
    reminderTimes?: string[];
  }
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "habits"), {
      userId,
      goalId: habitData.goalId || null,
      name: habitData.name,
      description: habitData.description || "",
      startDate: habitData.startDate,
      endDate: habitData.endDate,
      frequency: habitData.frequency,
      daysOfWeek: habitData.daysOfWeek || [],
      reminderTimes: habitData.reminderTimes || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

/**
 * Fetches habits for a user, optionally filtered by goal
 */
export const fetchHabits = async (
  userId: string, 
  goalId?: string
): Promise<Habit[]> => {
  try {
    const habitsRef = collection(db, "habits");
    let q;
  
    if (goalId) {
      q = query(
        habitsRef, 
        where("userId", "==", userId), 
        where("goalId", "==", goalId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        habitsRef, 
        where("userId", "==", userId), 
        orderBy("createdAt", "desc")
      );
    }
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Habit[];
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

/**
 * Updates an existing habit
 */
export const updateHabit = async (
  habitId: string, 
  updatedData: Partial<Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const habitRef = doc(db, "habits", habitId);
    await updateDoc(habitRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    throw error;
  }
};

/**
 * Deletes a habit
 */
export const deleteHabit = async (habitId: string): Promise<void> => {
  try {
    const habitRef = doc(db, "habits", habitId);
    await deleteDoc(habitRef);
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};