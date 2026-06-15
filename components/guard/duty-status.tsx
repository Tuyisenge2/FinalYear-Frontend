"use client";

import * as React from "react";
import { XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function DutyStatus() {
  const [onDuty, setOnDuty] = React.useState(true);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${
                onDuty ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            <div>
              <p className="text-sm font-medium">
                {onDuty ? "On Duty" : "Off Duty"}
              </p>
              <p className="text-xs text-muted-foreground">
                Kinyinya Sector - Zone A
              </p>
            </div>
          </div>
          <Badge
            variant={onDuty ? "default" : "secondary"}
            className="text-[9px]"
          >
            {onDuty ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}