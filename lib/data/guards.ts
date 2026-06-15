import { Guard } from "@/types/auth";

export const guards: Guard[] = [
  {
    id: "GRD-001",
    name: "Emmanuel Nsabimana",
    rank: "Senior Guard",
    phone: "+250788234567",
    email: "guard1@irondo.rw",
    sector: "Kinyinya",
    status: "on-duty",
    shiftStart: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "GRD-002",
    name: "Claude Uwimana",
    rank: "Guard",
    phone: "+250788345678",
    email: "guard2@irondo.rw",
    sector: "Remera",
    status: "on-duty",
    shiftStart: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: "GRD-003",
    name: "Jean Bosco Habimana",
    rank: "Guard",
    phone: "+250788456789",
    email: "guard3@irondo.rw",
    sector: "Kacyiru",
    status: "on-break",
    shiftStart: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: "GRD-004",
    name: "Marie Claire Uwase",
    rank: "Senior Guard",
    phone: "+250788567890",
    email: "guard4@irondo.rw",
    sector: "Gisozi",
    status: "off-duty",
    shiftStart: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    id: "GRD-005",
    name: "Patrick Niyonzima",
    rank: "Guard",
    phone: "+250788678901",
    email: "guard5@irondo.rw",
    sector: "Bumbogo",
    status: "on-duty",
    shiftStart: new Date(Date.now() - 1 * 3600000).toISOString(),
  },
];

export const onDutyGuards = () => guards.filter((g) => g.status === "on-duty");