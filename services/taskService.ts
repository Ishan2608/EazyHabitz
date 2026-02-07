// src/services/taskService.ts
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Task, TaskList } from "../types";

/**
 * Creates a new Task List
 */
export const createTaskList = async (
  userId: string, 
  name: string, 
  description: string = ""
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "taskLists"), {
      userId,
      name,
      description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating task list:", error);
    throw error;
  }
};

/**
 * Fetches all Task Lists for a user
 */
export const fetchTaskLists = async (userId: string): Promise<TaskList[]> => {
  try {
    const q = query(
      collection(db, "taskLists"), 
      where("userId", "==", userId), 
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as TaskList[];
  } catch (error) {
    console.error("Error fetching task lists:", error);
    throw error;
  }
};

/**
 * Updates a Task List
 */
export const updateTaskList = async (
  taskListId: string,
  updatedData: Partial<Omit<TaskList, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const taskListRef = doc(db, "taskLists", taskListId);
    await updateDoc(taskListRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating task list:", error);
    throw error;
  }
};

/**
 * Deletes a Task List
 */
export const deleteTaskList = async (taskListId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "taskLists", taskListId));
  } catch (error) {
    console.error("Error deleting task list:", error);
    throw error;
  }
};

/**
 * Creates a new Task
 */
export const createTask = async (
  userId: string, 
  taskData: {
    title: string;
    description?: string;
    taskListId?: string | null;
    goalId?: string | null;
    dueDate: Date;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    reminderOffsetMinutes?: number | null;
  }
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      userId,
      taskListId: taskData.taskListId || null,
      goalId: taskData.goalId || null,
      title: taskData.title,
      description: taskData.description || "",
      dueDate: Timestamp.fromDate(taskData.dueDate),
      status: "OPEN",
      priority: taskData.priority || "MEDIUM",
      reminderOffsetMinutes: taskData.reminderOffsetMinutes || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

/**
 * Fetches tasks with optional filters
 */
export const fetchTasks = async (
  userId: string, 
  filter?: { 
    taskListId?: string; 
    goalId?: string;
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  }
): Promise<Task[]> => {
  try {
    const tasksRef = collection(db, "tasks");
    let q = query(tasksRef, where("userId", "==", userId), orderBy("dueDate", "asc"));
  
    if (filter?.taskListId) {
      q = query(tasksRef, where("userId", "==", userId), where("taskListId", "==", filter.taskListId));
    } else if (filter?.goalId) {
      q = query(tasksRef, where("userId", "==", userId), where("goalId", "==", filter.goalId));
    } else if (filter?.status) {
      q = query(tasksRef, where("userId", "==", userId), where("status", "==", filter.status));
    }
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Task[];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

/**
 * Updates a Task
 */
export const updateTask = async (
  taskId: string, 
  updatedFields: Partial<Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    
    // Convert Date to Timestamp if dueDate is being updated
    const dataToUpdate: any = { ...updatedFields };
    if (dataToUpdate.dueDate && dataToUpdate.dueDate instanceof Date) {
      dataToUpdate.dueDate = Timestamp.fromDate(dataToUpdate.dueDate);
    }
    
    await updateDoc(taskRef, {
      ...dataToUpdate,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

/**
 * Deletes a Task
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};