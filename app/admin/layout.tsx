"use client";

import * as React from "react";
import { LayoutDashboard, Users, FileWarning, Calendar, Camera, Settings } from "lucide-react";
import { Sidebar } from "@/components/shared/sidebar";
import { Navbar } from "@/components/shared/navbar";
import { useSidebarStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const adminNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Guards", href: "/admin/guards" },
  { icon: FileWarning, label: "Incidents", href: "/admin/incidents" },
  { icon: Calendar, label: "Patrol", href: "/admin/patrol" },
  { icon: Camera, label: "Cameras", href: "/admin/cameras" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isOpen } = useSidebarStore();
  const [user, setUser] = React.useState({ role: "HEAD_OF_SECURITY", name: "Loading..." });

  React.useEffect(() => {
    const sessionStr = localStorage.getItem("irondo_session");
    if (sessionStr) {
      try {
        const sessionData = JSON.parse(sessionStr);
        setUser({ 
          role: sessionData.role || "HEAD_OF_SECURITY", 
          name: sessionData.name || "User" 
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      setUser({ role: "HEAD_OF_SECURITY", name: "Guest User" });
    }
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar navItems={adminNavItems} userRole={user.role} userName={user.name} />
      
      <div 
        className={cn(
          "flex flex-col h-screen transition-all duration-300",
          isOpen ? "lg:pl-64" : "lg:pl-[72px]"
        )}
      >
        <Navbar userRole={user.role} userName={user.name} onMenuClick={() => {}} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}