"use client";

import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserRole } from "../firebase/auth";
import { isTalentProfileComplete, isClientProfileComplete } from "../firebase/firestore";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);

        // Check profile completion based on role
        if (userRole === "talent") {
          const complete = await isTalentProfileComplete(user.uid);
          setIsProfileComplete(complete);
        } else if (userRole === "client") {
          const complete = await isClientProfileComplete(user.uid);
          setIsProfileComplete(complete);
        } else {
          setIsProfileComplete(true); // Admin or other roles don't have profile completion
        }
      } else {
        setRole(null);
        setIsProfileComplete(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, role, loading, isProfileComplete };
};


