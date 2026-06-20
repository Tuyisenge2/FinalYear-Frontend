"use client";

import { useEffect, useState } from "react";
import { getEvidence } from "@/lib/services/evidence-service";
import { EvidenceResponse } from "@/types/auth";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Video, Camera, Clock, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function EvidenceGallery() {
  const [evidence, setEvidence] = useState<EvidenceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<EvidenceResponse | null>(null);

  const fetchEvidence = async (opts?: { force?: boolean }) => {
    setLoading(true);
    if (opts?.force) setError(null);
    try {
      const data = await getEvidence();
      setEvidence(data);
      setError(null);
    } catch (err) {
      // Only surface the error if we have no data yet — keeps existing data visible
      // when a background retry fails (e.g. React Strict Mode double-invoke)
      setEvidence((prev) => {
        if (prev.length === 0) {
          setError(err instanceof Error ? err.message : "Failed to load evidence");
        }
        return prev;
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Camera className="h-5 w-5 text-emerald-500" />
            Evidence Gallery
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Images and videos captured by detection cameras
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs gap-1.5"
          onClick={() => fetchEvidence()}
          disabled={loading}
        >
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="h-48 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-5 w-5 text-emerald-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="h-48 rounded-xl border border-red-200 bg-red-50 flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-medium text-red-600">Couldn't load evidence</p>
          <p className="text-xs text-red-400">{error}</p>
          <Button size="sm" variant="outline" className="h-7 text-xs mt-1" onClick={() => fetchEvidence({ force: true })}>
            Retry
          </Button>

        </div>
      ) : evidence.length === 0 ? (
        <div className="h-48 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2">
          <ImageIcon className="h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-500">No evidence captured yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {evidence.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-video focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {item.file_type === "image" ? (
                  <img
                    src={item.cloudinary_url}
                    alt={`Evidence from ${item.camera_id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <Video className="h-8 w-8 text-white opacity-80" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-2 py-1.5">
                  <p className="text-[10px] text-white font-medium truncate">{item.camera_id}</p>
                  <p className="text-[9px] text-white/70">
                    {new Date(item.uploaded_at).toLocaleString()}
                  </p>
                </div>
                <div className="absolute top-1.5 right-1.5">
                  <span className="flex items-center gap-0.5 bg-black/60 rounded-full px-1.5 py-0.5 text-[9px] text-white">
                    {item.file_type === "image" ? (
                      <ImageIcon className="h-2.5 w-2.5" />
                    ) : (
                      <Video className="h-2.5 w-2.5" />
                    )}
                    {item.file_type}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox */}
          {selected && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <div
                className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {selected.file_type === "image" ? (
                    <img
                      src={selected.cloudinary_url}
                      alt={`Evidence from ${selected.camera_id}`}
                      className="w-full max-h-96 object-contain bg-gray-900"
                    />
                  ) : (
                    <video
                      src={selected.cloudinary_url}
                      controls
                      className="w-full max-h-96 bg-gray-900"
                    />
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{selected.camera_id}</p>
                    <Badge variant="outline" className="text-xs">
                      {selected.file_type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(selected.uploaded_at).toLocaleString()}
                    </span>
                    {selected.file_size_bytes && (
                      <span>{(selected.file_size_bytes / 1024).toFixed(1)} KB</span>
                    )}
                    {selected.violent_frames != null && (
                      <span className="text-red-500">
                        {selected.violent_frames} violent frame{selected.violent_frames !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-8 text-xs mt-2"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function IncidentsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Incident Reports</h1>
        <p className="text-sm text-gray-600">Review captured evidence from detection cameras</p>
      </div>
      <EvidenceGallery />
    </div>
  );
}
