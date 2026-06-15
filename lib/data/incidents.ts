import { Incident } from "@/types/auth";

export const incidents: Incident[] = [
  {
    id: "INC-001",
    type: "motion-detected",
    severity: "high",
    location: "Kigali Heights, Sector 15",
    sector: "Kinyinya",
    description: "Unauthorized movement detected near perimeter fence",
    status: "active",
    reportedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    reportedBy: "Camera AI - Zone 3",
  },
  {
    id: "INC-002",
    type: "suspicious-activity",
    severity: "medium",
    location: "KN 45 St, Nyarutarama",
    sector: "Kinyinya",
    description: "Unidentified individual loitering near gate entrance",
    status: "investigating",
    reportedAt: new Date(Date.now() - 45 * 60000).toISOString(),
    reportedBy: "Guard - Emmanuel",
    assignedTo: "Guard Claude",
  },
  {
    id: "INC-003",
    type: "theft",
    severity: "critical",
    location: "KN 120 Ave, Kimironko",
    sector: "Remera",
    description: "Attempted break-in at commercial building",
    status: "resolved",
    reportedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    reportedBy: "Camera AI - Zone 7",
    assignedTo: "Guard Claude",
    resolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "INC-004",
    type: "intrusion",
    severity: "low",
    location: "KG 7 Ave, Kacyiru",
    sector: "Kacyiru",
    description: "False alarm triggered by stray animal",
    status: "false-alarm",
    reportedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    reportedBy: "Camera AI - Zone 1",
  },
  {
    id: "INC-005",
    type: "fire",
    severity: "critical",
    location: "KN 2 Blvd, Gisozi",
    sector: "Bumbogo",
    description: "Smoke detected near storage facility",
    status: "active",
    reportedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    reportedBy: "Smoke Detector - Bldg C",
  },
  {
    id: "INC-006",
    type: "vandalism",
    severity: "medium",
    location: "KN 89 St, Gacuriro",
    sector: "Gisozi",
    description: "Graffiti detected on perimeter wall",
    status: "resolved",
    reportedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    reportedBy: "Patrol Report",
    assignedTo: "Guard Emmanuel",
    resolvedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
  },
];

export const getActiveIncidents = () =>
  incidents.filter((i) => i.status === "active" || i.status === "investigating");

export const getResolvedIncidents = () =>
  incidents.filter((i) => i.status === "resolved");

export const getFalseAlarms = () =>
  incidents.filter((i) => i.status === "false-alarm");