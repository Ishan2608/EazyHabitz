// services/authService.ts
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@config/firebaseConfig";
import { User } from "../types/index";

/**
 * Creates a User Profile in Firestore
 * Maps to: type User @table
 */
export const createUserProfile = async (
  firebaseUser: FirebaseUser,
  displayName: string,
  photoUrl?: string
): Promise<User> => {
  const userRef = doc(db, "users", firebaseUser.uid);

  try {
    // Check if profile already exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const userData = {
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
        createdAt: serverTimestamp(),
        displayName: displayName.trim(),
        photoUrl: photoUrl || "",
      };

      await setDoc(userRef, userData);
    }

    // Fetch and return the complete profile
    const newUserDoc = await getDoc(userRef);
    if (!newUserDoc.exists()) {
      throw new Error("Failed to create user profile");
    }

    const data = newUserDoc.data();
    return {
      email: data.email,
      uid: data.uid,
      createdAt: data.createdAt,
      displayName: data.displayName,
      photoUrl: data.photoUrl,
    } as User;
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
 * Validates signup input
 */
const validateSignupInput = (
  email: string,
  password: string,
  displayName: string
): { valid: boolean; error?: string } => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  // Password validation (min 6 chars - Firebase requirement)
  if (!password || password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }

  // Display name validation
  if (!displayName || displayName.trim().length < 2) {
    return { valid: false, error: "Username must be at least 2 characters" };
  }

  return { valid: true };
};

/**
 * Registers a new user and initializes their profile
 */
export const signUpUser = async (
  email: string,
  password: string,
  displayName: string,
  photoUrl?: string
) => {
  try {
    // Validate input
    const validation = validateSignupInput(email, password, displayName);
    if (!validation.valid) {
      return { user: null, error: validation.error };
    }

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    const firebaseUser = userCredential.user;

    // Update Firebase Auth profile with display name
    await updateProfile(firebaseUser, {
      displayName: displayName.trim(),
      photoURL: photoUrl || null,
    });

    // Create Firestore user profile
    const userProfile = await createUserProfile(
      firebaseUser,
      displayName,
      photoUrl
    );

    return { user: userProfile, error: null };
  } catch (error: any) {
    console.error("Signup error:", error);

    // Map Firebase errors to user-friendly messages
    let errorMessage = "Failed to create account";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already registered";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password is too weak";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { user: null, error: errorMessage };
  }
};

/**
 * Logs in an existing user
 */
export const loginUser = async (email: string, password: string) => {
  try {
    // Basic validation
    if (!email || !password) {
      return { user: null, error: "Email and password are required" };
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error("Login error:", error);

    // Map Firebase errors to user-friendly messages
    let errorMessage = "Failed to sign in";
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      errorMessage = "Invalid email or password";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many failed attempts. Please try again later";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { user: null, error: errorMessage };
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