export type UserRole = "HEAD_OF_SECURITY" | "GUARD";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  lastLogin?: string;
  status: "active" | "inactive" | "suspended";
}

export interface Guard {
  id: string;
  name: string;
  rank: string;
  phone: string;
  email: string;
  sector: string;
  status: "on-duty" | "off-duty" | "on-break";
  shiftStart?: string;
  avatar?: string;
}

export interface GuardLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: "on-duty" | "off-duty" | "on-break";
  lastUpdated?: string;
}

// Matches the FastAPI backend's GuardLocationResponse schema
export interface GuardLocationResponse {
  user_id: string;
  guard_name: string;
  latitude: number;
  longitude: number;
  recorded_at: string;
}

export interface Incident {
  id: string;
  type: "motion-detected" | "suspicious-activity" | "theft" | "intrusion" | "fire" | "vandalism";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  sector: string;
  description: string;
  status: "active" | "investigating" | "resolved" | "false-alarm";
  reportedAt: string;
  reportedBy: string;
  assignedTo?: string;
  resolvedAt?: string;
  cameraId?: string;
}

export interface Camera {
  id: string;
  name: string;
  sector: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  streamUrl?: string;
  lastActive?: string;
}

export interface PatrolCheckpoint {
  id: string;
  name: string;
  sector: string;
  status: "completed" | "pending" | "missed";
  scheduledTime: string;
  completedTime?: string;
  guardId?: string;
}

export interface DashboardAlert {
  id: string;
  message: string;
  camera_id: string;
  confidence: number;
  sent_at: string;
  status: "sent" | "failed" | "pending";
}

export interface DashboardPatrolLog {
  guard_name: string;
  latitude: number | null;
  longitude: number | null;
  recorded_at: string | null;
  status: string;
}

export interface DashboardStats {
  total_guards: number;
  guards_on_duty: number;
  active_incidents: number;
  cameras_online: number;
  active_alerts: DashboardAlert[];
  recent_patrol_logs: DashboardPatrolLog[];
}

export interface EvidenceResponse {
  id: string;
  detection_id: string;
  camera_id: string;
  file_type: "image" | "video";
  cloudinary_url: string;
  file_size_bytes: number | null;
  duration_seconds: number | null;
  violent_frames: number | null;
  uploaded_at: string;
}

export interface Alert {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  timestamp: string;
  description: string;
  acknowledged: boolean;
  read: boolean;
}