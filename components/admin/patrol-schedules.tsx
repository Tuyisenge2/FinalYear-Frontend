"use client";

import * as React from "react";
import { Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { guards } from "@/lib/data/guards";

const statusColors = {
  "on-duty": "bg-green-500/15 text-green-400",
  "off-duty": "bg-gray-500/15 text-gray-400",
  "on-break": "bg-yellow-500/15 text-yellow-400",
};

const schedules = [
  {
    id: "SCH-001",
    guard: "Emmanuel N.",
    zone: "Kinyinya - Zone A",
    shift: "Morning",
    time: "06:00 - 14:00",
    status: "assigned",
  },
  {
    id: "SCH-002",
    guard: "Claude U.",
    zone: "Remera - Zone B",
    shift: "Morning",
    time: "06:00 - 14:00",
    status: "active",
  },
  {
    id: "SCH-003",
    guard: "Jean Bosco H.",
    zone: "Kacyiru - Zone C",
    shift: "Afternoon",
    time: "14:00 - 22:00",
    status: "assigned",
  },
  {
    id: "SCH-004",
    guard: "Patrick N.",
    zone: "Bumbogo - Zone D",
    shift: "Night",
    time: "22:00 - 06:00",
    status: "assigned",
  },
  {
    id: "SCH-005",
    guard: "Marie Claire U.",
    zone: "Gisozi - Zone E",
    shift: "Morning",
    time: "06:00 - 14:00",
    status: "off",
  },
];

export function PatrolSchedules() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Patrol Schedules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="p-3 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant={
                    s.status === "active"
                      ? "default"
                      : s.status === "assigned"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {s.status === "active" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
                  )}
                  {s.shift}
                </Badge>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {s.time}
                </span>
              </div>
              <p className="text-sm font-medium">{s.guard}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {s.zone}
              </div>
              <div className="flex gap-2 pt-2">
                {s.status === "active" && (
                  <Button variant="outline" size="sm" className="h-6 text-[10px] w-full">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Mark Complete
                  </Button>
                )}
                {s.status === "assigned" && (
                  <Button size="sm" className="h-6 text-[10px] w-full">
                    <Clock className="h-3 w-3 mr-1" /> Start Shift
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}