"use client";

import {
  XCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Button
        variant="destructive"
        className="py-5 flex flex-col items-center gap-1 text-xs font-semibold"
      >
        <XCircle className="h-5 w-5" />
        Report Incident
      </Button>
      <Button
        variant="destructive"
        className="py-5 flex flex-col items-center gap-1 text-xs font-semibold"
      >
        <AlertCircle className="h-5 w-5" />
        Emergency
      </Button>
      <Button
        variant="outline"
        className="py-5 flex flex-col items-center gap-1 text-xs font-semibold"
      >
        <Send className="h-5 w-5" />
        Call Backup
      </Button>
    </div>
  );
}