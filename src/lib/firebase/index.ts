// Firebase Configuration
export { default as app, auth, db, storage } from "./config";

// Authentication
export {
  signUp,
  signIn,
  logout,
  resetPassword,
  getUserRole,
  getCurrentUser,
  type SignUpData,
  type SignInData,
} from "./auth";

// Firestore Operations
export {
  // Talent
  getTalentProfile,
  updateTalentProfile,
  searchTalentBySkills,
  type TalentProfile,
  // Client
  getClientProfile,
  updateClientProfile,
  type ClientProfile,
  // Projects
  createProject,
  getProject,
  getClientProjects,
  getTalentProjects,
  type Project,
  // Assessments
  createAssessment,
  getTalentAssessments,
  type Assessment,
} from "./firestore";

// Storage Operations
export {
  uploadFile,
  uploadPortfolio,
  uploadProfilePicture,
  uploadAssessmentFile,
  deleteFile,
} from "./storage";

// Types
export type {
  UserRole,
  User,
  Talent,
  Client,
  ProjectStatus,
  Match,
} from "./types";


