"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
  session: any;
}

export function NextAuthSessionProvider({ children, session }: SessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
