// src/services/goalService.ts
import { Goal } from "../types";
import { SWOTAnalysis } from "../types";
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
  serverTimestamp,
  writeBatch
} from "firebase/firestore";

/**
 * Creates a new goal for a user
 */
export const createGoal = async (
  userId: string,
  goalData: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "goals"), {
      userId,
      name: goalData.name,
      description: goalData.description,
      startDate: goalData.startDate,
      endDate: goalData.endDate,
      status: "ACTIVE",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
};

/**
 * Fetches all goals for a specific user
 */
export const fetchGoals = async (userId: string): Promise<Goal[]> => {
  try {
    const goalsRef = collection(db, "goals");
    const q = query(
      goalsRef, 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Goal[];
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
};

/**
 * Updates an existing goal
 */
export const updateGoal = async (
  goalId: string,
  updatedData: Partial<Omit<Goal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const goalRef = doc(db, "goals", goalId);
    
    await updateDoc(goalRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
};

/**
 * Deletes a goal (simple version)
 */
export const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    const goalRef = doc(db, "goals", goalId);
    await deleteDoc(goalRef);
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
};

/**
 * Deletes a goal and unlinks associated habits and tasks
 * More robust cleanup version
 */
export const deleteGoalWithCleanup = async (goalId: string): Promise<void> => {
  try {
    const batch = writeBatch(db);

    // 1. Unlink Habits from this goal
    const habitsQ = query(collection(db, "habits"), where("goalId", "==", goalId));
    const habitsSnapshot = await getDocs(habitsQ);
    habitsSnapshot.forEach((habitDoc) => {
      batch.update(habitDoc.ref, { 
        goalId: null, 
        updatedAt: serverTimestamp() 
      });
    });

    // 2. Unlink Tasks from this goal
    const tasksQ = query(collection(db, "tasks"), where("goalId", "==", goalId));
    const tasksSnapshot = await getDocs(tasksQ);
    tasksSnapshot.forEach((taskDoc) => {
      batch.update(taskDoc.ref, { 
        goalId: null, 
        updatedAt: serverTimestamp() 
      });
    });

    // 3. Delete SWOT analyses linked to this goal
    const swotQ = query(collection(db, "swotAnalyses"), where("goalId", "==", goalId));
    const swotSnapshot = await getDocs(swotQ);
    swotSnapshot.forEach((swotDoc) => {
      batch.delete(swotDoc.ref);
    });

    // 4. Delete the Goal itself
    const goalRef = doc(db, "goals", goalId);
    batch.delete(goalRef);

    // Commit all changes atomically
    await batch.commit();
  } catch (error) {
    console.error("Error deleting goal with cleanup:", error);
    throw error;
  }
};

/**
 * Creates a new SWOT Analysis
 */
export const createSWOTAnalysis = async (
  userId: string,
  swotData: {
    goalId?: string | null;
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
  }
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "swotAnalyses"), {
      userId,
      goalId: swotData.goalId || null,
      strengths: swotData.strengths,
      weaknesses: swotData.weaknesses,
      opportunities: swotData.opportunities,
      threats: swotData.threats,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating SWOT analysis:", error);
    throw error;
  }
};

/**
 * Fetches SWOT analyses for a user, optionally filtered by goal
 */
export const fetchSWOTAnalyses = async (
  userId: string,
  goalId?: string
): Promise<SWOTAnalysis[]> => {
  try {
    const swotRef = collection(db, "swotAnalyses");
    let q;

    if (goalId) {
      q = query(
        swotRef,
        where("userId", "==", userId),
        where("goalId", "==", goalId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        swotRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SWOTAnalysis[];
  } catch (error) {
    console.error("Error fetching SWOT analyses:", error);
    throw error;
  }
};

/**
 * Updates an existing SWOT Analysis
 */
export const updateSWOTAnalysis = async (
  swotId: string,
  updatedData: Partial<Omit<SWOTAnalysis, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const swotRef = doc(db, "swotAnalyses", swotId);
    await updateDoc(swotRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating SWOT analysis:", error);
    throw error;
  }
};

/**
 * Deletes a SWOT Analysis
 */
export const deleteSWOTAnalysis = async (swotId: string): Promise<void> => {
  try {
    const swotRef = doc(db, "swotAnalyeses", swotId);
    await deleteDoc(swotRef);
  } catch (error) {
    console.error("Error deleting SWOT analysis:", error);
    throw error;
  }
};