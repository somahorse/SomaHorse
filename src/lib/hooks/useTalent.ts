"use client";

import { useState, useEffect } from "react";
import { getTalentProfile, TalentProfile } from "../firebase/firestore";
import { useAuth } from "./useAuth";

export const useTalent = (talentId?: string) => {
  const { user } = useAuth();
  const [talent, setTalent] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        setLoading(true);
        const id = talentId || user?.uid;
        if (!id) {
          setLoading(false);
          return;
        }

        const talentData = await getTalentProfile(id);
        setTalent(talentData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch talent profile");
      } finally {
        setLoading(false);
      }
    };

    fetchTalent();
  }, [talentId, user?.uid]);

  return { talent, loading, error };
};


