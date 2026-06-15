"use client";

import * as React from "react";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AlertCircle, ShieldAlert } from "lucide-react";

interface PatrolLog {
  id: string;
  guard: string;
  checkpoint: string;
  sector: string;
  status: "completed" | "pending" | "missed";
  time: string;
}

interface RecentLog {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  status: "resolved" | "investigating" | "active" | "false-alarm";
  time: string;
  outcome: string;
}

const patrolLogs: PatrolLog[] = [
  { id: "PT-001", guard: "Emmanuel N.", checkpoint: "Main Gate", sector: "Kinyinya", status: "completed", time: "08:05 AM" },
  { id: "PT-002", guard: "Emmanuel N.", checkpoint: "Building A", sector: "Kinyinya", status: "completed", time: "08:32 AM" },
  { id: "PT-003", guard: "Emmanuel N.", checkpoint: "Parking Lot B", sector: "Kinyinya", status: "pending", time: "09:00 AM" },
  { id: "PT-004", guard: "Claude U.", checkpoint: "Building C Rooftop", sector: "Remera", status: "completed", time: "08:20 AM" },
  { id: "PT-005", guard: "Claude U.", checkpoint: "Emergency Exit", sector: "Remera", status: "missed", time: "09:00 AM" },
];

const recentLogs: RecentLog[] = [
  { id: "INC-003", type: "Theft Attempt", severity: "critical", location: "KN 120 Ave, Kimironko", status: "resolved", time: "2 hrs ago", outcome: "Suspect detained, handed to police" },
  { id: "INC-006", type: "Vandalism", severity: "medium", location: "KN 89 St, Gacuriro", status: "resolved", time: "20 hrs ago", outcome: "Perimeter wall cleaned, CCTV reviewed" },
  { id: "INC-002", type: "Suspicious Activity", severity: "medium", location: "KN 45 St, Nyarutarama", status: "investigating", time: "45 min ago", outcome: "Under investigation" },
  { id: "INC-004", type: "Intrusion", severity: "low", location: "KG 7 Ave, Kacyiru", status: "false-alarm", time: "5 hrs ago", outcome: "False alarm - stray animal" },
];

const statusColors = {
  completed: "bg-green-500/15 text-green-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  missed: "bg-red-500/15 text-red-400",
  resolved: "bg-green-500/15 text-green-400",
  investigating: "bg-blue-500/15 text-blue-400",
  active: "bg-orange-500/15 text-orange-400",
  "false-alarm": "bg-gray-500/15 text-gray-400",
};

const severityColors = {
  low: "bg-blue-500/15 text-blue-400",
  medium: "bg-yellow-500/15 text-yellow-400",
  high: "bg-orange-500/15 text-orange-400",
  critical: "bg-red-500/15 text-red-400",
};

export function PatrolLogs() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" /> Recent Patrol Logs &amp; Incident History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Today&apos;s Patrol Checkpoints
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {patrolLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-2 w-2 rounded-full shrink-0">
                    <div className={cn("h-full w-full rounded-full", log.status === "completed" ? "bg-green-500" : log.status === "pending" ? "bg-yellow-500 animate-pulse" : "bg-red-500")} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{log.checkpoint}</p>
                    <p className="text-[10px] text-muted-foreground">{log.guard} &bull; {log.time}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={cn("text-[9px] h-4 px-1.5", statusColors[log.status])}>
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Incidents</p>
          <ScrollArea className="h-[200px] pr-2">
            <div className="space-y-2">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0", severityColors[log.severity])}>
                      <AlertCircle className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{log.type}</p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {log.location}
                        <span>&bull;</span>
                        {log.time}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className={cn("text-[9px] h-4 px-1.5 shrink-0", statusColors[log.status])}>
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}