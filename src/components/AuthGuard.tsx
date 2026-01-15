"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "talent" | "client" | "admin";
  requireProfileComplete?: boolean;
}

export default function AuthGuard({
  children,
  requiredRole,
  requireProfileComplete = true,
}: AuthGuardProps) {
  const { user, role, loading, isProfileComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth state to load
    if (loading) return;

    // If no user, redirect to login
    if (!user) {
      router.push("/login");
      return;
    }

    // If role is required and doesn't match, redirect to appropriate dashboard or login
    if (requiredRole && role !== requiredRole) {
      // If user has a different role, redirect to their dashboard
      if (role === "talent") {
        router.push("/talent/dashboard");
      } else if (role === "client") {
        router.push("/client/dashboard");
      } else {
        // If role doesn't match and user doesn't have a valid role, redirect to login
        router.push("/login");
      }
      return;
    }

    // Check profile completion if required
    if (requireProfileComplete && isProfileComplete === false) {
      if (role === "talent") {
        router.push("/join/complete");
      } else if (role === "client") {
        router.push("/signup/client/complete");
      }
      return;
    }
  }, [user, role, loading, isProfileComplete, requiredRole, requireProfileComplete, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#2563EB]"></div>
          <p className="text-sm font-semibold text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, don't render children (redirect will happen)
  if (!user) {
    return null;
  }

  // If role doesn't match required role, don't render children
  if (requiredRole && role !== requiredRole) {
    return null;
  }

  // If profile completion is required and not complete, don't render children
  if (requireProfileComplete && isProfileComplete === false) {
    return null;
  }

  // User is authenticated, role matches, and profile is complete (if required)
  return <>{children}</>;
}

