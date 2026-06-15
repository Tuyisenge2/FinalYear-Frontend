"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Bell, Moon, Camera, Shield } from "lucide-react";

const cameras = [
  { id: 1, name: "Main Gate", sector: "Kinyinya" },
  { id: 2, name: "Parking Lot", sector: "Kinyinya" },
  { id: 3, name: "Building A", sector: "Remera" },
  { id: 4, name: "Perimeter North", sector: "Kacyiru" },
  { id: 5, name: "Perimeter South", sector: "Gisozi" },
  { id: 6, name: "Storage Yard", sector: "Bumbogo" },
];

function SettingToggle({ label, desc, defaultChecked = false }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600">Configure system preferences and integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Settings */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
              <Shield className="h-5 w-5 text-emerald-600" /> System Settings
            </CardTitle>
            <CardDescription className="text-gray-600">Configure surveillance system parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <SettingToggle label="AI Detection Alerts" desc="Enable AI-powered anomaly detection" defaultChecked />
            <Separator className="bg-gray-200" />
            <SettingToggle label="Push Notifications" desc="Send alerts to mobile devices" />
            <Separator className="bg-gray-200" />
            <SettingToggle label="Night Mode" desc="Enable infrared feed enhancement" defaultChecked />
          </CardContent>
        </Card>

        {/* Alert Thresholds */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
              <Bell className="h-5 w-5 text-amber-600" /> Alert Thresholds
            </CardTitle>
            <CardDescription className="text-gray-600">Configure sensitivity levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <SettingToggle label="Motion Detection Sensitivity" desc="Current: Medium" />
            <Separator className="bg-gray-200" />
            <SettingToggle label="Face Recognition" desc="Enable known suspect detection" />
            <Separator className="bg-gray-200" />
            <SettingToggle label="License Plate Recognition" desc="Enable vehicle detection" defaultChecked />
          </CardContent>
        </Card>

        {/* Camera Configuration */}
        <Card className="border-gray-200 bg-white lg:col-span-2">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
                  <Camera className="h-5 w-5 text-blue-600" /> Camera Configuration
                </CardTitle>
                <CardDescription className="text-gray-600">Manage connected surveillance cameras</CardDescription>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> Add New Camera
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cameras.map((cam) => (
                <div key={cam.id} className="p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="h-4 w-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900 truncate">{cam.name}</p>
                  </div>
                  <p className="text-xs text-gray-500">{cam.sector} Sector</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-gray-600">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
