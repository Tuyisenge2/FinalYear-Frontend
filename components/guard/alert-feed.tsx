"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  MapPin,
  Bell,
  Eye,
  Send,
  Clock,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// AlertFeed component
interface AlertItem {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  time: string;
  description: string;
  acknowledged: boolean;
}

const incomingAlerts: AlertItem[] = [
  {
    id: "G-001",
    type: "Motion Detected",
    severity: "high",
    location: "North Perimeter",
    time: "5 min ago",
    description: "Unauthorized movement detected",
    acknowledged: false,
  },
  {
    id: "G-002",
    type: "Suspicious Person",
    severity: "critical",
    location: "Main Gate",
    time: "12 min ago",
    description: "Unknown individual near entrance",
    acknowledged: false,
  },
  {
    id: "G-003",
    type: "Equipment Check",
    severity: "low",
    location: "Camera 4",
    time: "30 min ago",
    description: "Camera calibration update required",
    acknowledged: true,
  },
  {
    id: "G-004",
    type: "Shift Handoff",
    severity: "medium",
    location: "Guard Post",
    time: "1 hr ago",
    description: "Morning shift change reminder",
    acknowledged: true,
  },
];

const severityColors = {
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function AlertFeed() {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Alerts
          </span>
          <Badge variant="secondary" className="text-[9px]">
            {incomingAlerts.filter((a) => !a.acknowledged).length} new
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-2">
          <div className="space-y-2">
            {incomingAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-3 rounded-lg border space-y-1.5 transition-all",
                  severityColors[alert.severity],
                  !alert.acknowledged && "ring-1 ring-primary/30"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={cn("h-3.5 w-3.5 shrink-0", {
                        "text-red-400": alert.severity === "critical",
                        "text-orange-400": alert.severity === "high",
                        "text-yellow-400": alert.severity === "medium",
                        "text-blue-400": alert.severity === "low",
                      })}
                    />
                    <span className="text-sm font-medium">{alert.type}</span>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "critical"
                        ? "destructive"
                        : alert.severity === "high"
                        ? "default"
                        : "secondary"
                    }
                    className="text-[8px] h-3"
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" />
                    {alert.location}
                  </div>
                  <span className="text-muted-foreground flex items-center gap-0.5">
                    <Clock className="h-2.5 w-2.5" /> {alert.time}
                  </span>
                </div>
                {!alert.acknowledged && (
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="h-5 text-[9px] flex-1">
                      <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                      Acknowledge
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-5 text-[9px]"
                    >
                      <Eye className="h-2.5 w-2.5 mr-0.5" /> View
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}