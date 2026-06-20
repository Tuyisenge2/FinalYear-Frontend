"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, AlertCircle, ShieldCheck, MapPin as MapPinIcon, Users, Phone, Loader2 } from "lucide-react";
import { GuardTrackerMap } from "@/components/admin/guard-tracker-map";
import { useAuthStore } from "@/lib/auth/auth-store";
import { listGuards, BackendUser } from "@/lib/services/user-service";
import { getOnDutyGuards, OnDutyGuard } from "@/lib/services/shift-service";
import { getDashboardStats } from "@/lib/services/dashboard-service";
import { getAuthErrorMessage } from "@/lib/services/auth-service";
import { DashboardStats } from "@/types/auth";

const POLL_MS = 30_000;

function relativeTime(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function AdminDashboardPage() {
  const adminName = useAuthStore((state) => state.user?.name);

  const [guards, setGuards] = useState<BackendUser[]>([]);
  const [onDutyGuards, setOnDutyGuards] = useState<OnDutyGuard[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let isUnmounted = false;

    const fetchAll = async () => {
      try {
        const [guardList, onDuty, dashStats] = await Promise.all([
          listGuards(),
          getOnDutyGuards(),
          getDashboardStats(),
        ]);
        if (!isUnmounted) {
          setGuards(guardList);
          setOnDutyGuards(onDuty);
          setStats(dashStats);
        }
      } catch (err) {
        if (!isUnmounted) setError(getAuthErrorMessage(err));
      } finally {
        if (!isUnmounted) setLoading(false);
      }
    };

    fetchAll();
    intervalRef.current = setInterval(fetchAll, POLL_MS);

    return () => {
      isUnmounted = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onDutyNames = new Set(onDutyGuards.map((g) => g.guard_name));
  const totalGuards = stats?.total_guards ?? guards.length;
  const guardsOnDuty = stats?.guards_on_duty ?? onDutyGuards.length;
  const onDutyPercent = totalGuards > 0 ? Math.round((guardsOnDuty / totalGuards) * 100) : 0;

  const kpis = [
    {
      title: "Total Guards",
      value: totalGuards,
      change: undefined,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Guards on Duty",
      value: guardsOnDuty,
      change: `${onDutyPercent}% active`,
      icon: ShieldCheck,
      color: "bg-emerald-500",
    },
    {
      title: "Active Incidents",
      value: stats?.active_incidents ?? "—",
      change: stats && stats.active_incidents > 0 ? `+${stats.active_incidents} new` : undefined,
      icon: AlertCircle,
      color: "bg-orange-500",
    },
    {
      title: "Cameras Online",
      value: stats ? `${stats.cameras_online}` : "—",
      change: undefined,
      icon: Camera,
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Good morning{adminName ? `, ${adminName}` : ""} <span className="text-emerald-600">👋</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Here&apos;s your security operations overview for today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              System Active
            </div>
            <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              Kigali, Rwanda
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.title} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">{kpi.title}</p>
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-gray-300 mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    )}
                    {kpi.change && !loading && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${kpi.change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                        {kpi.change}
                      </span>
                    )}
                  </div>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${kpi.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Map & Analytics */}
          <div className="lg:col-span-2 space-y-4">
            <GuardTrackerMap />

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-semibold mb-4 text-gray-900">Incident Analytics</h2>
              <div className="h-48 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
                <p className="text-sm text-gray-400">Charts Component</p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Active Alerts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-900">Active Alerts</h3>
              {loading ? (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                </div>
              ) : !stats || stats.active_alerts.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No active alerts</p>
              ) : (
                <div className="space-y-2">
                  {stats.active_alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-xl border flex items-start gap-3 ${
                        alert.status === "failed"
                          ? "bg-red-50 border-red-100"
                          : "bg-amber-50 border-amber-100"
                      }`}
                    >
                      <AlertCircle className={`h-4 w-4 mt-0.5 shrink-0 ${
                        alert.status === "failed" ? "text-red-500" : "text-amber-600"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {alert.camera_id} • {relativeTime(alert.sent_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Guard List */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-900">Guard Status</h3>
              {loading ? (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                </div>
              ) : error ? (
                <p className="text-xs text-red-600">{error}</p>
              ) : guards.length === 0 ? (
                <p className="text-xs text-gray-500">No guards added yet.</p>
              ) : (
                <div className="space-y-2">
                  {guards.map((guard) => {
                    const isOnDuty = onDutyNames.has(guard.name);
                    const statusLabel = !guard.is_active ? "Deactivated" : isOnDuty ? "On Duty" : "Off Duty";
                    const dotColor = !guard.is_active ? "bg-gray-400" : isOnDuty ? "bg-green-500" : "bg-gray-300";
                    return (
                      <div key={guard.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-2 w-2 rounded-full ${dotColor}`} />
                          <span className="text-sm text-gray-700">{guard.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{statusLabel}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Emergency Contacts */}
            <div className="bg-linear-to-br from-red-50 to-red-100/50 rounded-2xl border border-red-200 p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-red-700">
                <Phone className="h-4 w-4" /> Emergency Contacts
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Police</span>
                  <span className="font-medium text-gray-900">112</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fire</span>
                  <span className="font-medium text-gray-900">112</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ambulance</span>
                  <span className="font-medium text-gray-900">912</span>
                </div>
                <button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Emergency Alert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Patrol Logs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold mb-4 text-gray-900">Recent Patrol Logs</h2>
          {loading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
            </div>
          ) : !stats || stats.recent_patrol_logs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No patrol logs yet</p>
          ) : (
            <div className="space-y-2">
              {stats.recent_patrol_logs.map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <MapPinIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.guard_name}</p>
                      {log.latitude != null && log.longitude != null && (
                        <p className="text-xs text-gray-500">
                          {log.latitude.toFixed(4)}, {log.longitude.toFixed(4)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {log.recorded_at && (
                      <p className="text-xs text-gray-500">
                        {new Date(log.recorded_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 bg-green-50 text-green-600">
                      {log.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
