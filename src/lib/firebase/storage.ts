import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

/**
 * Upload file to Firebase Storage
 */
export const uploadFile = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Upload portfolio/document
 */
export const uploadPortfolio = async (
  file: File,
  userId: string,
  fileName: string
): Promise<string> => {
  const path = `portfolios/${userId}/${fileName}`;
  return uploadFile(file, path);
};

/**
 * Upload profile picture
 */
export const uploadProfilePicture = async (
  file: File,
  userId: string
): Promise<string> => {
  const path = `profiles/${userId}/avatar`;
  return uploadFile(file, path);
};

/**
 * Upload assessment submission
 */
export const uploadAssessmentFile = async (
  file: File,
  assessmentId: string,
  fileName: string
): Promise<string> => {
  const path = `assessments/${assessmentId}/${fileName}`;
  return uploadFile(file, path);
};

/**
 * Delete file from Storage
 */
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};


