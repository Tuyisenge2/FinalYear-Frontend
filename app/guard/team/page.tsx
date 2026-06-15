"use client";

import { guards } from "@/lib/data/guards";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Shield, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const statusColors = {
  "on-duty": "bg-green-100 text-green-700",
  "off-duty": "bg-gray-100 text-gray-600",
  "on-break": "bg-amber-100 text-amber-700",
};

export default function TeamPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Team</h1>
        <p className="text-sm text-gray-600">Security team members and status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guards.map((guard) => (
          <Card key={guard.id} className="border-gray-200 bg-white">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 bg-emerald-100">
                  <AvatarFallback className="text-emerald-700 font-bold">
                    {guard.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 truncate">{guard.name}</p>
                  <p className="text-sm text-gray-600">{guard.rank}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {guard.sector}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                    <Phone className="h-3 w-3" />
                    {guard.phone}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Badge variant="secondary" className={statusColors[guard.status]}>
                  {guard.status.replace("-", " ")}
                </Badge>
                <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                  View Profile
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
