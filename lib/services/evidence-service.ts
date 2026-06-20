import { apiClient } from "@/lib/api/client";
import { EvidenceResponse } from "@/types/auth";

export async function getEvidence(): Promise<EvidenceResponse[]> {
  return apiClient.get<EvidenceResponse[]>("/evidence");
}
