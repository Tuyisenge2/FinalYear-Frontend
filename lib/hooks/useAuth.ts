"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// TODO: Connect to backend API later for real authentication
// This hook provides a mock session management layer

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    status: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const mockUsers: Record<string, any> = {
  "head@irondo.rw": {
    id: "1",
    name: "Jean Kanimba",
    email: "head@irondo.rw",
    role: "HEAD_OF_SECURITY",
    phone: "+250788123456",
    status: "active",
  },
  "guard1@irondo.rw": {
    id: "2",
    name: "Emmanuel Nsabimana",
    email: "guard1@irondo.rw",
    role: "GUARD",
    phone: "+250788234567",
    status: "active",
  },
  "guard2@irondo.rw": {
    id: "3",
    name: "Claude Uwimana",
    email: "guard2@irondo.rw",
    role: "GUARD",
    phone: "+250788345678",
    status: "active",
  },
};

// Get redirect path based on role
export function getRedirectPath(role?: string): string {
  if (role === "HEAD_OF_SECURITY") return "/admin";
  if (role === "GUARD") return "/guard";
  return "/auth/login";
}

// Authenticate user (mock - replace with API call)
export function authenticateUser(
  email: string,
  password: string
): Promise<{ user: AuthState["user"]; token: string } | null> {
  return new Promise((resolve) => {
    // TODO: Replace with real API call
    // fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    setTimeout(() => {
      const user = mockUsers[email];
      if (user) {
        resolve({
          user,
          token: "mock-jwt-token-" + Date.now(),
        });
      } else {
        resolve(null);
      }
    }, 500);
  });
}

// Check if user can access a route based on role
export function canAccessRoute(role: string | undefined, route: string): boolean {
  const adminRoutes = ["/admin", "/admin/guards", "/admin/incidents", "/admin/patrol", "/admin/cameras", "/admin/settings"];
  const guardRoutes = ["/guard", "/guard/team", "/guard/settings"];

  if (role === "HEAD_OF_SECURITY") return adminRoutes.includes(route);
  if (role === "GUARD") return guardRoutes.includes(route);
  return false;
}

// TODO: Integrate with next-auth session for production
// export function useAuthSession() {
//   const { data: session, status } = useSession();
//   return { session, status, user: session?.user };
// }