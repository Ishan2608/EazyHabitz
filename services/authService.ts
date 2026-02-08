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
import { auth, db } from "@/config/firebaseConfig";
import { User } from "@/types/index";

/**
 * Maps Firebase error codes to user-friendly messages
 */
const getSignInErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    "auth/user-not-found": "You are not registered. Please sign up first.",
    "auth/invalid-credential": "You are not registered. Please sign up first.",
    "auth/configuration-not-found": "You are not registered. Please sign up first.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
  };

  return errorMessages[errorCode] || "Unable to sign in. Please try again.";
};

const getSignUpErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    "auth/email-already-in-use": "This email is already registered. Please sign in instead.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/operation-not-allowed": "Sign up is currently disabled. Please contact support.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
  };

  return errorMessages[errorCode] || "Unable to create account. Please try again.";
};

/**
 * Creates a User Profile in Firestore
 */
export const createUserProfile = async (
  firebaseUser: FirebaseUser,
  displayName: string,
  photoUrl?: string
): Promise<User> => {
  const userRef = doc(db, "users", firebaseUser.uid);

  try {
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
  } catch (error: any) {
    console.error("Error creating user profile:", error);
    throw new Error("Failed to create user profile. Please try again.");
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
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  if (!password || password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }

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
    // Validate input first
    const validation = validateSignupInput(email, password, displayName);
    if (!validation.valid) {
      return { user: null, error: validation.error };
    }

    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    const firebaseUser = userCredential.user;

    // Update Firebase Auth profile
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
    
    // Use signup-specific error messages
    const errorMessage = error.code 
      ? getSignUpErrorMessage(error.code)
      : error.message || "Failed to create account";
    
    return { user: null, error: errorMessage };
  }
};

/**
 * Logs in an existing user
 */
export const loginUser = async (email: string, password: string) => {
  try {
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
    
    // Use signin-specific error messages
    const errorMessage = error.code 
      ? getSignInErrorMessage(error.code)
      : "Unable to sign in. Please try again.";
    
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
    throw new Error("Failed to log out. Please try again");
  }
};

/**
 * Observer for session persistence
 */
export const subscribeToAuthChanges = (
  callback: (user: FirebaseUser | null) => void
) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};