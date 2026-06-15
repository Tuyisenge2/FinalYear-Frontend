"use client";

import * as React from "react";
import { Camera, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CCTVFeedProps {
  label: string;
  status: "live" | "offline";
  sector: string;
}

export function CCTVFeed({ label, status, sector }: CCTVFeedProps) {
  return (
    <Card className="overflow-hidden relative">
      <div className="cctv-feed aspect-video relative">
        {status === "live" && <div className="scan-line" />}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <div className={`live-dot ${status === "offline" ? "offline" : ""}`} />
          <span className="text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded">
            {status === "live" ? "LIVE" : "OFFLINE"}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <Badge variant={status === "live" ? "default" : "secondary"}>
            {sector}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-white text-sm font-medium">{label}</p>
            <p className="text-white/60 text-xs">
              <Clock className="h-3 w-3 inline mr-1" />
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="h-12 w-12 text-white/10" />
        </div>
      </div>
    </Card>
  );
}