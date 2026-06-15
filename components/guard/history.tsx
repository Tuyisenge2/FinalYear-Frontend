"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { MapPin } from "lucide-react";

const severityColors = {
  low: "bg-blue-500/15 text-blue-400",
  medium: "bg-yellow-500/15 text-yellow-400",
  high: "bg-orange-500/15 text-orange-400",
  critical: "bg-red-500/15 text-red-400",
};

function HistorySection() {
  const history = [
    { id: "H-001", type: "Theft Attempt", location: "KN 120 Ave, Kimironko", outcome: "Suspect detained", time: "3 hrs ago", severity: "critical" as const, status: "resolved" as const },
    { id: "H-002", type: "Noise Complaint", location: "KN 45 St, Nyarutarama", outcome: "Resolved", time: "5 hrs ago", severity: "medium" as const, status: "resolved" as const },
    { id: "H-003", type: "Suspicious Activity", location: "KG 7 Ave, Kacyiru", outcome: "False alarm", time: "8 hrs ago", severity: "low" as const, status: "false-alarm" as const },
    { id: "H-004", type: "Perimeter Breach", location: "KN 89 St, Gacuriro", outcome: "Resolved", time: "12 hrs ago", severity: "medium" as const, status: "resolved" as const },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" /> Past Incidents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-2">
          <div className="space-y-2">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0", severityColors[item.severity])}>
                    <AlertCircle className="h-3 w-3 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{item.type}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      <MapPin className="h-2.5 w-2.5 inline mr-0.5" />
                      {item.location}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[9px] font-medium">{item.outcome}</p>
                  <p className="text-[9px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export { HistorySection };