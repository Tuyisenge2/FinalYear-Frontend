"use client";

import * as React from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Guard } from "@/types/auth";
import { toast } from "sonner";

const statusColors = {
  "on-duty": "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
  "off-duty": "bg-slate-500/15 text-slate-500 dark:text-slate-400 border-slate-500/20",
  "on-break": "bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/20",
};

export function GuardListCard({ guard }: { guard: Guard }) {
  const handleCall = () => {
    toast.success(`Calling ${guard.name}...`, {
      description: `Connecting to ${guard.phone}`,
    });
  };

  const handleMessage = () => {
    toast.info(`Messaging ${guard.name}...`);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-border/50 group">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
        <span className="text-xs font-bold text-primary">
          {guard.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-sm font-semibold truncate">{guard.name}</p>
          <Badge
            variant="outline"
            className={`text-[9px] h-4 px-1.5 font-medium uppercase tracking-wider ${statusColors[guard.status]}`}
          >
            {guard.status.replace("-", " ")}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {guard.sector}
          </span>
          <span className="text-border">•</span>
          <span>{guard.rank}</span>
        </div>
      </div>
      
      {/* Action Buttons - Visible on hover or always on touch devices */}
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-950/50" onClick={handleCall}>
          <Phone className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-950/50" onClick={handleMessage}>
          <MessageSquare className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
