"use client";

import { Camera, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getCameras } from "@/lib/data/cameras";

export function CameraGrid() {
  const cameras = getCameras();

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Camera className="h-4 w-4" /> Camera Overview
        </CardTitle>
        <CardDescription>
          {cameras.filter((c) => c.status === "online").length} /{" "}
          {cameras.length} online
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cameras.map((cam) => (
            <div
              key={cam.id}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                cam.status === "online"
                  ? "bg-green-500/5 border-green-500/20"
                  : "bg-muted/50"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    cam.status === "online"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <Camera
                    className={`h-5 w-5 ${
                      cam.status === "online"
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div
                  className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-background ${
                    cam.status === "online"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>
              <p className="text-xs font-medium text-center">{cam.name}</p>
              <p className="text-[10px] text-muted-foreground text-center">
                {cam.sector}
              </p>
              <Badge
                variant={
                  cam.status === "online" ? "default" : "secondary"
                }
                className="text-[8px] h-3.5 px-1.5"
              >
                {cam.status}
              </Badge>
              {cam.status === "online" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px]"
                >
                  <Eye className="h-2.5 w-2.5 mr-1" /> View
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}