"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pause,
  Play,
  Flag,
  Clock,
  Shield,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ShiftTimer() {
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isPaused]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const formatTime = (n: number) => String(n).padStart(2, "0");

  const handlePause = () => setIsPaused(!isPaused);
  const handleEndShift = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleResume = () => {
    setIsPaused(false);
    setIsRunning(true);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          Shift Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold font-mono tracking-wider">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {isPaused ? "Paused" : isRunning ? "On Duty" : "Shift Ended"}
          </p>
        </div>
        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              className="w-full"
              onClick={() => {
                setElapsed(0);
                setIsRunning(true);
                setIsPaused(false);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Start New Shift
            </Button>
          ) : isPaused ? (
            <>
              <Button className="flex-1" onClick={handleResume}>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleEndShift}
              >
                <Flag className="h-4 w-4 mr-2" />
                End Shift
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handlePause}
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleEndShift}
              >
                <Flag className="h-4 w-4 mr-2" />
                End Shift
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}