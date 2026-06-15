"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Eye,
  Send,
  XCircle,
  Bell,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  time: string;
  description: string;
  read: boolean;
}

const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "Motion Detected",
    severity: "high",
    location: "Sector 15 - Perimeter",
    time: "5 min ago",
    description: "Unauthorized movement at north fence",
    read: false,
  },
  {
    id: "ALT-002",
    type: "Camera Offline",
    severity: "medium",
    location: "Sector 8 - Rooftop",
    time: "30 min ago",
    description: "Camera CAM-004 offline",
    read: true,
  },
  {
    id: "ALT-003",
    type: "Suspicious Activity",
    severity: "critical",
    location: "KN 45 St - Entrance",
    time: "15 min ago",
    description: "Unknown vehicle circling compound",
    read: false,
  },
  {
    id: "ALT-004",
    type: "Fire Alert",
    severity: "high",
    location: "KN 2 Blvd - Storage",
    time: "1 hr ago",
    description: "Smoke detected in storage room B",
    read: true,
  },
  {
    id: "ALT-005",
    type: "Perimeter Breach",
    severity: "critical",
    location: "KG 12 Ave - East Wing",
    time: "2 hrs ago",
    description: "Fence vibration detected",
    read: true,
  },
];

const severityColors = {
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
};

const severityIcons = {
  low: AlertCircle,
  medium: AlertTriangle,
  high: ShieldAlert,
  critical: XCircle,
};

interface AlertPanelProps {
  className?: string;
}

import { AlertTriangle } from "lucide-react";

export function AlertPanel({ className }: AlertPanelProps) {
  return (
    <Card className={cn("border-border/50", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" /> Active Alerts
        </CardTitle>
        <Badge variant="secondary" className="text-[10px]">
          {alerts.filter((a) => !a.read).length} new
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-2">
          <div className="space-y-2">
            {alerts.map((alert) => {
              const SeverityIcon = severityIcons[alert.severity];
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border space-y-2 transition-all hover:shadow-md",
                    severityColors[alert.severity],
                    !alert.read && "ring-1 ring-primary/30"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <SeverityIcon className="h-4 w-4 shrink-0" />
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
                      className="text-[9px]"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      <Eye className="h-3 w-3 mr-1" /> Verify
                    </Button>
                    <Button size="sm" className="h-6 text-xs">
                      <Send className="h-3 w-3 mr-1" /> Dispatch
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs text-muted-foreground"
                    >
                      <XCircle className="h-3 w-3 mr-1" /> Ignore
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}