import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./config";

// ==================== TALENT OPERATIONS ====================

export interface TalentProfile {
  userId: string;
  skills: string[];
  experience: "junior" | "intermediate" | "senior" | "advanced";
  role?: string;
  certifications: string[];
  projects: string[];
  earnings: number;
  linkedin?: string;
  portfolio?: string;
  about?: string;
  country?: string;
  availability?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Get talent profile by ID
 */
export const getTalentProfile = async (
  talentId: string
): Promise<TalentProfile | null> => {
  try {
    const talentDoc = await getDoc(doc(db, "talent", talentId));
    if (talentDoc.exists()) {
      return { id: talentDoc.id, ...talentDoc.data() } as TalentProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting talent profile:", error);
    return null;
  }
};

/**
 * Update talent profile
 */
export const updateTalentProfile = async (
  talentId: string,
  data: Partial<TalentProfile>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "talent", talentId), {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating talent profile:", error);
    throw error;
  }
};

/**
 * Search talent by skills
 */
export const searchTalentBySkills = async (
  skills: string[]
): Promise<TalentProfile[]> => {
  try {
    const talentRef = collection(db, "talent");
    const q = query(
      talentRef,
      where("skills", "array-contains-any", skills),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TalentProfile[];
  } catch (error) {
    console.error("Error searching talent:", error);
    return [];
  }
};

// ==================== CLIENT OPERATIONS ====================

export interface ClientProfile {
  userId: string;
  companyName: string;
  projects: string[];
  country?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Get client profile by ID
 */
export const getClientProfile = async (
  clientId: string
): Promise<ClientProfile | null> => {
  try {
    const clientDoc = await getDoc(doc(db, "clients", clientId));
    if (clientDoc.exists()) {
      return { id: clientDoc.id, ...clientDoc.data() } as ClientProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting client profile:", error);
    return null;
  }
};

/**
 * Update client profile
 */
export const updateClientProfile = async (
  clientId: string,
  data: Partial<ClientProfile>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "clients", clientId), {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating client profile:", error);
    throw error;
  }
};

// ==================== PROJECT OPERATIONS ====================

export interface Project {
  clientId: string;
  talentIds: string[];
  title: string;
  description: string;
  status: "draft" | "active" | "completed" | "cancelled";
  deliverables: string[];
  timeline: {
    startDate: Timestamp;
    endDate: Timestamp;
  };
  budget?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Create a new project
 */
export const createProject = async (
  projectData: Omit<Project, "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const projectRef = doc(collection(db, "projects"));
    await setDoc(projectRef, {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return projectRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

/**
 * Get project by ID
 */
export const getProject = async (projectId: string): Promise<Project | null> => {
  try {
    const projectDoc = await getDoc(doc(db, "projects", projectId));
    if (projectDoc.exists()) {
      return { id: projectDoc.id, ...projectDoc.data() } as Project;
    }
    return null;
  } catch (error) {
    console.error("Error getting project:", error);
    return null;
  }
};

/**
 * Get projects by client ID
 */
export const getClientProjects = async (
  clientId: string
): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef,
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error("Error getting client projects:", error);
    return [];
  }
};

/**
 * Get projects by talent ID
 */
export const getTalentProjects = async (
  talentId: string
): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef,
      where("talentIds", "array-contains", talentId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error("Error getting talent projects:", error);
    return [];
  }
};

// ==================== ASSESSMENT OPERATIONS ====================

export interface Assessment {
  talentId: string;
  challenge: string;
  submission: string;
  score?: number;
  certified: boolean;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

/**
 * Create assessment submission
 */
export const createAssessment = async (
  assessmentData: Omit<Assessment, "createdAt" | "certified">
): Promise<string> => {
  try {
    const assessmentRef = doc(collection(db, "assessments"));
    await setDoc(assessmentRef, {
      ...assessmentData,
      certified: false,
      createdAt: new Date(),
    });
    return assessmentRef.id;
  } catch (error) {
    console.error("Error creating assessment:", error);
    throw error;
  }
};

/**
 * Get assessments by talent ID
 */
export const getTalentAssessments = async (
  talentId: string
): Promise<Assessment[]> => {
  try {
    const assessmentsRef = collection(db, "assessments");
    const q = query(
      assessmentsRef,
      where("talentId", "==", talentId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Assessment[];
  } catch (error) {
    console.error("Error getting assessments:", error);
    return [];
  }
};


