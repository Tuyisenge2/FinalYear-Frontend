"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Bell,
  AlertCircle,
  Calendar,
  Eye,
  Phone,
  Clock,
  User,
  MapPin as MapPinIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const patrolZones = [
  { id: "zone-a", name: "Zone A - Main Gate", status: "completed", checkpoints: 4, completed: 4, color: "bg-green-500" },
  { id: "zone-b", name: "Zone B - Parking", status: "in-progress", checkpoints: 3, completed: 2, color: "bg-yellow-500" },
  { id: "zone-c", name: "Zone C - North", status: "pending", checkpoints: 3, completed: 0, color: "bg-gray-400" },
  { id: "zone-d", name: "Zone D - South", status: "pending", checkpoints: 2, completed: 0, color: "bg-gray-400" },
];

export function PatrolRouteMap() {
  return (
    <div className="space-y-3">
      {patrolZones.map((zone) => (
        <div
          key={zone.id}
          className="p-3 rounded-lg border bg-muted/30 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${zone.color}`}
              />
              <span className="text-sm font-medium">{zone.name}</span>
            </div>
            <Badge
              variant={
                zone.status === "completed"
                  ? "default"
                  : zone.status === "in-progress"
                  ? "secondary"
                  : "outline"
              }
              className="text-[9px]"
            >
              {zone.status === "completed"
                ? "Done"
                : zone.status === "in-progress"
                ? "Active"
                : "Pending"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>
              {zone.completed}/{zone.checkpoints} checkpoints
            </span>
            <span>•</span>
            <span>
              {Math.round((zone.completed / zone.checkpoints) * 100)}% complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${zone.color}`}
              style={{ width: `${(zone.completed / zone.checkpoints) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

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

export function ActiveAlerts() {
  const colors = {
    low: "text-blue-500 bg-blue-500/10",
    medium: "text-yellow-500 bg-yellow-500/10",
    high: "text-orange-500 bg-orange-500/10",
    critical: "text-red-500 bg-red-500/10",
  };

  return (
    <div className="space-y-2">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center gap-2 p-2.5 rounded-lg border bg-muted/30"
        >
          <div className={`h-2 w-2 rounded-full ${colors[alert.severity]}`} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{alert.type}</p>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPinIcon className="h-2.5 w-2.5" />
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
  );
}