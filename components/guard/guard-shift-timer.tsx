"use client";

import * as React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function GuardShiftTimer() {
  const [isRunning, setIsRunning] = React.useState(true);
  const [elapsed, setElapsed] = React.useState(4520);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  const formatTime = (n: number) => String(n).padStart(2, "0");

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Shift Timer</p>
            <p className="text-2xl font-bold font-mono tracking-wider">
              {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <XCircle className="h-3.5 w-3.5 mr-1" /> Pause
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Resume
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}