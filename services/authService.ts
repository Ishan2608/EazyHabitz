// src/services/authService.ts
import { auth, db } from "../firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { User } from "../types";

/**
 * Creates a User Profile in Firestore
 * Maps to: type User @table
 */
export const createUserProfile = async (user: FirebaseUser): Promise<void> => {
  const userRef = doc(db, "users", user.uid);
  
  try {
    // Check if user profile already exists
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email || "",
        uid: user.uid,
        createdAt: serverTimestamp(),
        displayName: user.displayName || "New User",
        photoUrl: user.photoURL || "",
      });
    }
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

/**
 * Fetches user profile from Firestore
 */
export const getUserProfile = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        email: data.email,
        uid: data.uid,
        createdAt: data.createdAt,
        displayName: data.displayName,
        photoUrl: data.photoUrl,
      } as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

/**
 * Registers a new user and initializes their profile
 */
export const signUpUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Initialize the User profile in Firestore
    await createUserProfile(user);
    
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Logs in an existing user
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Logs out the current user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

/**
 * Observer for session persistence
 * Returns unsubscribe function
 */
export const subscribeToAuthChanges = (
  callback: (user: FirebaseUser | null) => void
) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};