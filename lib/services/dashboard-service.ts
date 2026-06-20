import { apiClient } from "@/lib/api/client";
import { DashboardStats } from "@/types/auth";

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiClient.get<DashboardStats>("/dashboard/stats");
}
