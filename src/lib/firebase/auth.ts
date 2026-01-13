import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "talent" | "client" | "admin";
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 */
export const signUp = async (data: SignUpData): Promise<UserCredential> => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    // Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create role-specific document
    if (data.role === "talent") {
      await setDoc(doc(db, "talent", userCredential.user.uid), {
        userId: userCredential.user.uid,
        skills: [],
        experience: "",
        certifications: [],
        projects: [],
        earnings: 0,
        createdAt: new Date(),
      });
    } else if (data.role === "client") {
      await setDoc(doc(db, "clients", userCredential.user.uid), {
        userId: userCredential.user.uid,
        companyName: "",
        projects: [],
        createdAt: new Date(),
      });
    }

    return userCredential;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign up");
  }
};

/**
 * Sign in existing user
 */
export const signIn = async (data: SignInData): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in");
  }
};

/**
 * Sign out current user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign out");
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || "Failed to send password reset email");
  }
};

/**
 * Get user role from Firestore
 */
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

/**
 * Get current user data
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};


