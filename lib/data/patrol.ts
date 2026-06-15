import { PatrolCheckpoint } from "@/types/auth";

export const patrolCheckpoints: PatrolCheckpoint[] = [
  {
    id: "PC-001",
    name: "Main Gate",
    sector: "Kinyinya",
    status: "completed",
    scheduledTime: "08:00",
    completedTime: "08:05",
    guardId: "GRD-001",
  },
  {
    id: "PC-002",
    name: "Building A Entrance",
    sector: "Kinyinya",
    status: "completed",
    scheduledTime: "08:30",
    completedTime: "08:32",
    guardId: "GRD-001",
  },
  {
    id: "PC-003",
    name: "Parking Lot B",
    sector: "Kinyinya",
    status: "pending",
    scheduledTime: "09:00",
    guardId: "GRD-001",
  },
  {
    id: "PC-004",
    name: "Perimeter Wall North",
    sector: "Kinyinya",
    status: "pending",
    scheduledTime: "09:30",
    guardId: "GRD-001",
  },
  {
    id: "PC-005",
    name: "Building C Rooftop",
    sector: "Remera",
    status: "completed",
    scheduledTime: "08:15",
    completedTime: "08:20",
    guardId: "GRD-002",
  },
  {
    id: "PC-006",
    name: "Emergency Exit South",
    sector: "Remera",
    status: "missed",
    scheduledTime: "09:00",
    guardId: "GRD-002",
  },
  {
    id: "PC-007",
    name: "Storage Room",
    sector: "Remera",
    status: "pending",
    scheduledTime: "10:00",
    guardId: "GRD-002",
  },
];

export const getPatrolBySector = (sector: string) =>
  patrolCheckpoints.filter((p) => p.sector === sector);