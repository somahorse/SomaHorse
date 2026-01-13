"use client";

import { useState, useEffect } from "react";
import { getClientProfile, ClientProfile } from "../firebase/firestore";
import { useAuth } from "./useAuth";

export const useClient = (clientId?: string) => {
  const { user } = useAuth();
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const id = clientId || user?.uid;
        if (!id) {
          setLoading(false);
          return;
        }

        const clientData = await getClientProfile(id);
        setClient(clientData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch client profile");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId, user?.uid]);

  return { client, loading, error };
};


