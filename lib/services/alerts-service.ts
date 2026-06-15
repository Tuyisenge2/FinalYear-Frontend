// ============================================================================
// Alerts Service
// TODO: Connect to backend API later - Replace all mock calls with real API
// ============================================================================

// import { Alert } from "@/types/auth";

// GET_INTEGRATION_POINT: Fetch alerts from backend
// GET /api/alerts?limit=50&offset=0
export async function getAlerts() {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/alerts');
  // if (!response.ok) throw new Error('Failed to fetch alerts');
  // return response.json();
  console.log("[AlertsService] Fetching alerts...");
  return [];
}

// GET_INTEGRATION_POINT: Fetch alert by ID
// GET /api/alerts/:id
export async function getAlertById(id: string) {
  // TODO: Replace with actual API call
  console.log("[AlertsService] Fetching alert:", id);
  return null;
}

// POST_INTEGRATION_POINT: Acknowledge an alert
// POST /api/alerts/:id/acknowledge
export async function acknowledgeAlert(id: string) {
  // TODO: Replace with actual API call
  console.log("[AlertsService] Acknowledging alert:", id);
}

// POST_INTEGRATION_POINT: Dispatch response to alert
// POST /api/alerts/:id/dispatch
export async function dispatchAlert(id: string, guardId: string) {
  // TODO: Replace with actual API call
  console.log("[AlertsService] Dispatching alert:", id, "to guard:", guardId);
}

// POST_INTEGRATION_POINT: Dismiss/ignore alert
// POST /api/alerts/:id/dismiss
export async function dismissAlert(id: string) {
  // TODO: Replace with actual API call
  console.log("[AlertsService] Dismissing alert:", id);
}

// WEBSOCKET_INTEGRATION_POINT: For real-time alert events
// TODO: Set up WebSocket connection for live alerts
// const ws = new WebSocket(`${WS_URL}/alerts`);
// ws.onmessage = (event) => { handleNewAlert(JSON.parse(event.data)); };