import { User } from "@/types/auth";

export const users: User[] = [
  {
    id: "1",
    name: "Jean Kanimba",
    email: "head@irondo.rw",
    password: "admin123",
    role: "HEAD_OF_SECURITY",
    phone: "+250788123456",
    lastLogin: new Date().toISOString(),
    status: "active",
  },
  {
    id: "2",
    name: "Emmanuel Nsabimana",
    email: "guard1@irondo.rw",
    password: "guard123",
    role: "GUARD",
    phone: "+250788234567",
    lastLogin: new Date().toISOString(),
    status: "active",
  },
  {
    id: "3",
    name: "Claude Uwimana",
    email: "guard2@irondo.rw",
    password: "guard123",
    role: "GUARD",
    phone: "+250788345678",
    lastLogin: new Date().toISOString(),
    status: "active",
  },
];