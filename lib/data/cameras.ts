import { Camera } from "lucide-react";

export interface Camera {
  id: string;
  name: string;
  sector: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  streamUrl?: string;
  lastActive?: string;
}

const cameras: Camera[] = [
  {
    id: "CAM-001",
    name: "Main Gate",
    sector: "Kinyinya",
    location: "KN 1 St, Main Entrance",
    status: "online",
    streamUrl: "https://via.placeholder.com/640x360/1a1a2e/00ff88?text=Camera+1+LIVE",
    lastActive: new Date().toISOString(),
  },
  {
    id: "CAM-002",
    name: "Parking Lot A",
    sector: "Kinyinya",
    location: "KN 15 St, Parking Area",
    status: "online",
    streamUrl: "https://via.placeholder.com/640x360/1a1a2e/00ff88?text=Camera+2+LIVE",
    lastActive: new Date().toISOString(),
  },
  {
    id: "CAM-003",
    name: "Building Perimeter",
    sector: "Remera",
    location: "KN 120 Ave, Building C",
    status: "online",
    streamUrl: "https://via.placeholder.com/640x360/1a1a2e/00ff88?text=Camera+3+LIVE",
    lastActive: new Date().toISOString(),
  },
  {
    id: "CAM-004",
    name: "Rooftop East",
    sector: "Kacyiru",
    location: "KG 7 Ave, Tower Block",
    status: "offline",
    streamUrl: "https://via.placeholder.com/640x360/2a2a3e/ff4444?text=Camera+4+OFFLINE",
    lastActive: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const getCameras = (): Camera[] => cameras;

export const getOnlineCameras = (): Camera[] =>
  cameras.filter((c) => c.status === "online");

export const getCameraById = (id: string): Camera | undefined =>
  cameras.find((c) => c.id === id);