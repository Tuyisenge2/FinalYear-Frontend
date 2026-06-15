"use client";

import { guards } from "@/lib/data/guards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Users, Eye, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const statusColors = {
  "on-duty": "bg-green-100 text-green-700 border-green-200",
  "off-duty": "bg-gray-100 text-gray-600 border-gray-200",
  "on-break": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function GuardsPage() {
  const [search, setSearch] = useState("");

  const filtered = guards.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Guard Management</h1>
          <p className="text-sm text-gray-600">Manage security personnel and assignments</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Users className="h-4 w-4 mr-2" /> Add Guard
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search guards by name or sector..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md bg-white border-gray-300"
        />
      </div>

      {/* Guard List */}
      <Card className="border-gray-200 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5 text-emerald-600" /> Guard Roster
          </CardTitle>
          <CardDescription className="text-gray-600">{guards.length} registered guards</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="divide-y divide-gray-100">
              {filtered.map((guard) => (
                <div
                  key={guard.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-emerald-700">
                      {guard.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{guard.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {guard.sector}
                      </span>
                      <span>•</span>
                      <span>{guard.rank}</span>
                      <span>•</span>
                      <span>{guard.phone}</span>
                    </div>
                  </div>
                  <Badge className={`border ${statusColors[guard.status]}`}>
                    {guard.status.replace("-", " ")}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-emerald-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
