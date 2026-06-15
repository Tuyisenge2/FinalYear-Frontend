"use client";

import * as React from "react";
import { Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { guards } from "@/lib/data/guards";

const statusColors = {
  "on-duty": "bg-green-500/15 text-green-400",
  "off-duty": "bg-gray-500/15 text-gray-400",
  "on-break": "bg-yellow-500/15 text-yellow-400",
};

import { GuardListCard } from "./guard-list-card";

export function GuardList() {
  const onDutyCount = guards.filter((g) => g.status === "on-duty").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Users className="h-4 w-4" /> Guard Roster
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-[10px]">
            {onDutyCount} on duty
          </Badge>
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {guards.map((guard) => (
          <GuardListCard key={guard.id} guard={guard} />
        ))}
      </CardContent>
    </Card>
  );
}