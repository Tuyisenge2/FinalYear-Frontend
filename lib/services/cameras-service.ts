// ============================================================================
// Cameras Service
// TODO: Connect to backend API later - Replace all mock calls with real API
// ============================================================================

// import { Camera } from "@/types/auth";

// GET_INTEGRATION_POINT: Fetch all cameras
// GET /api/cameras
export async function getCameras() {
  // TODO: Replace with actual API call
  console.log("[CamerasService] Fetching cameras...");
  return [];
}

// GET_INTEGRATION_POINT: Fetch camera by ID with stream URL
// GET /api/cameras/:id
export async function getCameraById(id: string) {
  // TODO: Replace with actual API call
  console.log("[CamerasService] Fetching camera:", id);
  return null;
}

// POST_INTEGRATION_POINT: Register new camera
// POST /api/cameras
export async function registerCamera(data: any) {
  // TODO: Replace with actual API call
  console.log("[CamerasService] Registering camera:", data);
}

// PUT_INTEGRATION_POINT: Update camera configuration
// PUT /api/cameras/:id
export async function updateCamera(id: string, config: any) {
  // TODO: Replace with actual API call
  console.log("[CamerasService] Updating camera:", id);
}

// DELETE_INTEGRATION_POINT: Remove camera
// DELETE /api/cameras/:id
export async function deleteCamera(id: string) {
  // TODO: Replace with actual API call
  console.log("[CamerasService] Deleting camera:", id);
}

// WEBSOCKET_INTEGRATION_POINT: For real-time camera status updates
// TODO: Connect to WebRTC or HLS stream feeds
// const ws = new WebSocket(`${WS_URL}/cameras/status`);