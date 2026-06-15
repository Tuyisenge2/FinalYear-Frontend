"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, FileText, Eye, ChevronRight } from "lucide-react";
import { useState } from "react";

function SettingItem({ label, desc, children }: { label: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
              <Bell className="h-5 w-5 text-blue-600" /> Notification Preferences
            </CardTitle>
            <CardDescription className="text-gray-600">Configure how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <SettingToggle label="Push Notifications" desc="Receive alerts on your device" defaultChecked />
            <Separator className="bg-gray-200" />
            <SettingToggle label="Sound Alerts" desc="Audio notification for emergencies" />
            <Separator className="bg-gray-200" />
            <SettingToggle label="Email Reports" desc="Daily summary to your email" />
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
              <Lock className="h-5 w-5 text-amber-600" /> Account Security
            </CardTitle>
            <CardDescription className="text-gray-600">Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <SettingToggle label="Two-Factor Authentication" desc="Add an extra layer of security" />
            <Separator className="bg-gray-200" />
            <SettingItem label="Change Password" desc="Update your security credentials">
              <Button size="sm" variant="outline" className="h-8">
                Change <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </SettingItem>
          </CardContent>
        </Card>
      </div>

      {/* Report History */}
      <Card className="border-gray-200 bg-white mt-6">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-gray-900">
            <FileText className="h-5 w-5 text-purple-600" /> Report History
          </CardTitle>
          <CardDescription className="text-gray-600">Download your past reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { type: "Daily Patrol Report", date: "Today", status: "Available" },
              { type: "Weekly Summary", date: "May 4, 2026", status: "Available" },
              { type: "Monthly Analytics", date: "Apr 30, 2026", status: "Available" },
            ].map((report, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.type}</p>
                    <p className="text-[10px] text-gray-500">{report.date}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-emerald-600 hover:text-emerald-700">
                  <Eye className="h-3 w-3 mr-1" /> Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
