// ============================================================================
// Guards Service
// TODO: Connect to backend API later - Replace all mock calls with real API
// ============================================================================

// import { Guard } from "@/types/auth";

// GET_INTEGRATION_POINT: Fetch all guards
// GET /api/guards
export async function getGuards() {
  // TODO: Replace with actual API call
  console.log("[GuardsService] Fetching guards...");
  return [];
}

// GET_INTEGRATION_POINT: Fetch guard by ID
// GET /api/guards/:id
export async function getGuardById(id: string) {
  // TODO: Replace with actual API call
  console.log("[GuardsService] Fetching guard:", id);
  return null;
}

// POST_INTEGRATION_POINT: Register new guard
// POST /api/guards
export async function registerGuard(data: any) {
  // TODO: Replace with actual API call
  console.log("[GuardsService] Registering guard:", data);
}

// PUT_INTEGRATION_POINT: Update guard status
// PUT /api/guards/:id/status
export async function updateGuardStatus(id: string, status: string) {
  // TODO: Replace with actual API call
  console.log("[GuardsService] Updating guard status:", id, status);
}

// POST_INTEGRATION_POINT: Assign guard to patrol
// POST /api/guards/:id/assign
export async function assignGuardToPatrol(guardId: string, patrolId: string) {
  // TODO: Replace with actual API call
  console.log("[GuardsService] Assigning guard:", guardId, "to patrol:", patrolId);
}

// GET_INTEGRATION_POINT: Get guard duty status
// GET /api/guards/:id/duty-status
export async function getGuardDutyStatus(guardId: string) {
  // TODO: Replace with actual API call
  console.log("[GuardsService] Fetching duty status for:", guardId);
  return null;
}

// WEBSOCKET_INTEGRATION_POINT: For real-time guard location updates
// TODO: Set up WebSocket connection for live GPS tracking
// const ws = new WebSocket(`${WS_URL}/guards/locations`);