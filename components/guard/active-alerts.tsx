"use client";

import * as React from "react";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ActiveAlert {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  time: string;
}

const activeAlerts: ActiveAlert[] = [
  { id: "1", type: "Motion Detected", severity: "high", location: "North Perimeter", time: "5 min ago" },
  { id: "2", type: "Suspicious Person", severity: "critical", location: "Main Gate", time: "12 min ago" },
  { id: "3", type: "Equipment Alert", severity: "low", location: "Camera 4", time: "30 min ago" },
  { id: "4", type: "Perimeter Alert", severity: "medium", location: "East Wall", time: "45 min ago" },
  { id: "5", type: "Shift Handoff", severity: "low", location: "Guard Post", time: "1 hr ago" },
];

const colors: Record<string, string> = {
  low: "text-blue-500 bg-blue-500/10",
  medium: "text-yellow-500 bg-yellow-500/10",
  high: "text-orange-500 bg-orange-500/10",
  critical: "text-red-500 bg-red-500/10",
};

export function ActiveAlerts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-2">
          <div className="space-y-2">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center gap-2 p-2.5 rounded-lg border bg-muted/30"
              >
                <div className={`h-2 w-2 rounded-full shrink-0 ${colors[alert.severity]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{alert.type}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" />
                    {alert.location}
                    <span>•</span>
                    <Clock className="h-2.5 w-2.5" />
                    {alert.time}
                  </div>
                </div>
                <Badge
                  variant={alert.severity === "critical" ? "destructive" : "secondary"}
                  className="text-[8px] h-3"
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}