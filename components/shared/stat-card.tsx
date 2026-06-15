"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Camera,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  RefreshCw,
  Pause,
  Play,
  Flag,
  Eye,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Stat card component
export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
            }`}>
              {change}
            </span>
          )}
        </div>
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center",
            color
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// Incident card component
export function IncidentCard({
  incident,
}: {
  incident: {
    id: string;
    type: string;
    severity: "low" | "medium" | "high" | "critical";
    location: string;
    time: string;
    description: string;
  };
}) {
  const severityColors = {
    low: "bg-blue-50 border-blue-200 text-blue-700",
    medium: "bg-amber-50 border-amber-200 text-amber-700",
    high: "bg-orange-50 border-orange-200 text-orange-700",
    critical: "bg-red-50 border-red-200 text-red-700",
  };

  const severityIcons = {
    low: AlertCircle,
    medium: AlertTriangle,
    high: ShieldAlert,
    critical: XCircle,
  };

  const SeverityIcon = severityIcons[incident.severity];

  return (
    <div
      className={`p-3 rounded-lg border space-y-2 ${severityColors[incident.severity]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <SeverityIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{incident.type}</span>
        </div>
        <Badge
          variant={
            incident.severity === "critical"
              ? "destructive"
              : incident.severity === "high"
              ? "default"
              : "secondary"
          }
          className="text-[10px]"
        >
          {incident.severity}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{incident.description}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {incident.location}
        </div>
        <span className="text-muted-foreground">{incident.time}</span>
      </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="h-7 text-gray-600 border-gray-200 hover:bg-gray-50">
            <Eye className="h-3 w-3 mr-1" /> Verify
          </Button>
          <Button size="sm" className="h-7 bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="h-3 w-3 mr-1" /> Dispatch
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-gray-500 hover:text-red-600 hover:bg-red-50">
            <XCircle className="h-3 w-3 mr-1" /> Ignore
          </Button>
        </div>
    </div>
  );
}