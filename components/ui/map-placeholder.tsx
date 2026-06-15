"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ShieldCheck, AlertCircle, Search, Navigation } from "lucide-react";
import { Badge } from "./badge";
import { Input } from "./input";
import { Button } from "./button";
import { Card } from "./card";

type Guard = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "patrolling" | "stationary" | "incident";
};

type Incident = {
  id: string;
  type: string;
  lat: number;
  lng: number;
  severity: "high" | "medium" | "low";
};

const MOCK_GUARDS: Guard[] = [
  { id: "g1", name: "Emmanuel N.", lat: 45, lng: 30, status: "patrolling" },
  { id: "g2", name: "Marie C.", lat: 60, lng: 65, status: "stationary" },
  { id: "g3", name: "Jean B.", lat: 25, lng: 80, status: "incident" },
];

const MOCK_INCIDENTS: Incident[] = [
  { id: "i1", type: "Suspicious Activity", lat: 30, lng: 85, severity: "high" },
  { id: "i2", type: "Perimeter Breach", lat: 70, lng: 40, severity: "medium" },
];

export function MapPlaceholder() {
  const [guards, setGuards] = useState<Guard[]>(MOCK_GUARDS);
  const [incidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setGuards((prev) =>
        prev.map((g) => ({
          ...g,
          lat: g.status === "patrolling" ? g.lat + (Math.random() * 2 - 1) : g.lat,
          lng: g.status === "patrolling" ? g.lng + (Math.random() * 2 - 1) : g.lng,
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative w-full h-[500px] bg-slate-900/5 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-border/50 shadow-inner flex flex-col">
      {/* Search overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="w-full pl-9 bg-background/80 backdrop-blur-md border-border/50 shadow-sm" placeholder="Search locations, guards..." />
        </div>
        <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-md shadow-sm">
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Map grid background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-500 via-transparent to-transparent" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      {/* Pins */}
      <div className="relative flex-1 w-full h-full">
        {guards.map((guard) => (
          <div
            key={guard.id}
            className="absolute transition-all duration-1000 ease-in-out cursor-pointer group"
            style={{ top: `${guard.lat}%`, left: `${guard.lng}%`, transform: "translate(-50%, -50%)" }}
            onClick={() => setSelectedPin(guard.id)}
          >
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white ${
              guard.status === "incident" ? "bg-red-500" : guard.status === "patrolling" ? "bg-emerald-500" : "bg-blue-500"
            }`}>
              <ShieldCheck className="h-4 w-4 text-white" />
              {guard.status === "patrolling" && (
                <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-40"></span>
              )}
            </div>
            {/* Tooltip */}
            <div className={`absolute top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow border whitespace-nowrap z-20 ${selectedPin === guard.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
              <p className="font-semibold">{guard.name}</p>
              <p className="text-muted-foreground capitalize">{guard.status}</p>
            </div>
          </div>
        ))}

        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="absolute transition-all duration-300 ease-in-out cursor-pointer group"
            style={{ top: `${incident.lat}%`, left: `${incident.lng}%`, transform: "translate(-50%, -50%)" }}
            onClick={() => setSelectedPin(incident.id)}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white bg-orange-500 animate-bounce">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
            {/* Tooltip */}
            <div className={`absolute top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow border whitespace-nowrap z-20 ${selectedPin === incident.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
              <p className="font-semibold text-orange-500">{incident.type}</p>
              <p className="text-muted-foreground capitalize">{incident.severity} Priority</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-2">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-md shadow-sm flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" /> Active Guard
        </Badge>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-md shadow-sm flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-orange-500" /> Incident
        </Badge>
      </div>
    </Card>
  );
}
