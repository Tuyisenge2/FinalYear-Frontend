"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2, XCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { patrolCheckpoints } from "@/lib/data/patrol";
import { guards } from "@/lib/data/guards";

const statusConfig = {
  completed: { badge: "bg-green-100 text-green-700 border-green-200", icon: "text-green-500" },
  pending: { badge: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "text-yellow-500" },
  missed: { badge: "bg-red-100 text-red-700 border-red-200", icon: "text-red-500" },
};

export default function PatrolRoutePage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Patrol Route</h1>
        <p className="text-sm text-gray-600">Assigned checkpoints for today</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
            <MapPin className="h-5 w-5 text-emerald-600" /> Checkpoints
          </CardTitle>
          <CardDescription className="text-gray-600">Tap to mark as completed</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="divide-y divide-gray-100">
              {patrolCheckpoints.map((checkpoint) => {
                const guard = guards.find((g) => g.id === checkpoint.guardId);
                return (
                  <div
                    key={checkpoint.id}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className={cn(
                      "h-3 w-3 rounded-full shrink-0 border-2 border-white",
                      checkpoint.status === "completed" ? "bg-green-500" :
                      checkpoint.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{checkpoint.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {checkpoint.sector} • {checkpoint.scheduledTime}
                        {guard && ` • ${guard.name.split(" ").slice(0,2).join(" ")}`}
                      </p>
                    </div>
                    <Badge variant="secondary" className={cn("text-[10px] h-5 px-2 border", statusConfig[checkpoint.status].badge)}>
                      {checkpoint.status}
                    </Badge>
                    {checkpoint.status === "completed" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    )}
                    {checkpoint.status === "missed" && (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </div>
    </div>
  );
}
