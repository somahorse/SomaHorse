import { Timestamp } from "firebase/firestore";

// User Types
export type UserRole = "talent" | "client" | "admin";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Talent Types
export interface Talent {
  id: string;
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

// Client Types
export interface Client {
  id: string;
  userId: string;
  companyName: string;
  projects: string[];
  country?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Project Types
export type ProjectStatus = "draft" | "active" | "completed" | "cancelled";

export interface Project {
  id: string;
  clientId: string;
  talentIds: string[];
  title: string;
  description: string;
  status: ProjectStatus;
  deliverables: string[];
  timeline: {
    startDate: Timestamp;
    endDate: Timestamp;
  };
  budget?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Assessment Types
export interface Assessment {
  id: string;
  talentId: string;
  challenge: string;
  submission: string;
  score?: number;
  certified: boolean;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

// Matching Types
export interface Match {
  id: string;
  clientId: string;
  talentId: string;
  projectId?: string;
  compatibilityScore: number;
  matchedAt: Timestamp;
}




