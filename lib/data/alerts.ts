import { Alert } from "@/types/auth";

export const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "Motion Detected",
    severity: "high",
    location: "Sector 15 - Perimeter",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    description: "Unauthorized movement detected at north fence",
    acknowledged: false,
    read: false,
  },
  {
    id: "ALT-002",
    type: "Camera Offline",
    severity: "medium",
    location: "Sector 8 - Rooftop East",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    description: "Camera CAM-004 went offline",
    acknowledged: false,
    read: true,
  },
  {
    id: "ALT-003",
    type: "Suspicious Activity",
    severity: "critical",
    location: "KN 45 St - Main Entrance",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    description: "Unknown vehicle circling the compound",
    acknowledged: false,
    read: false,
  },
  {
    id: "ALT-004",
    type: "Fire Alert",
    severity: "high",
    location: "KN 2 Blvd - Storage",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    description: "Smoke detected in storage room B",
    acknowledged: true,
    read: true,
  },
];

export const getUnreadAlerts = () => alerts.filter((a) => !a.read);
export const getUnacknowledgedAlerts = () => alerts.filter((a) => !a.acknowledged);