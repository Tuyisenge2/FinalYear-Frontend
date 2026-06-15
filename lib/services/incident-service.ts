// ============================================================================
// Incident Service
// TODO: Connect to backend API later - Replace all mock calls with real API
// ============================================================================

// import { Incident } from "@/types/auth";

// GET_INTEGRATION_POINT: Fetch incidents with filtering
// GET /api/incidents?status=active&severity=high&page=1&limit=20
export async function getIncidents(filters?: any) {
  // TODO: Replace with actual API call
  console.log("[IncidentService] Fetching incidents:", filters);
  return [];
}

// GET_INTEGRATION_POINT: Fetch single incident
// GET /api/incidents/:id
export async function getIncidentById(id: string) {
  // TODO: Replace with actual API call
  console.log("[IncidentService] Fetching incident:", id);
  return null;
}

// POST_INTEGRATION_POINT: Create new incident (from guard or AI detection)
// POST /api/incidents
export async function createIncident(data: any) {
  // TODO: Replace with actual API call
  console.log("[IncidentService] Creating incident:", data);
}

// PUT_INTEGRATION_POINT: Update incident status
// PUT /api/incidents/:id/status
export async function updateIncidentStatus(id: string, status: string) {
  // TODO: Replace with actual API call
  console.log("[IncidentService] Updating incident status:", id, status);
}

// PUT_INTEGRATION_POINT: Assign incident to guard
// PUT /api/incidents/:id/assign
export async function assignIncident(id: string, guardId: string) {
  // TODO: Replace with actual API call
  console.log("[IncidentService] Assigning incident:", id, "to guard:", guardId);
}

// DELETE_INTEGRATION_POINT: Remove incident
// DELETE /api/incidents/:id
export async function deleteIncident(id: string) {
  // TODO: Replace with actual API call
  console.log("[IncidentService] Deleting incident:", id);
}