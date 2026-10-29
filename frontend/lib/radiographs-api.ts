import { apiFetch, apiFetchBlob } from "@/lib/api";
import type { UserRole } from "@/lib/auth";

export type RadiographType = "PANORAMIC" | "BITEWING" | "PERIAPICAL";

export type RadiographAnalysisStatus =
  | "NOT_ANALYZED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export type FindingSource = "AI" | "DOCTOR";

export type FindingReviewStatus = "SUGGESTED" | "CONFIRMED" | "REJECTED";

export interface RadiographFinding {
  id: string;
  radiographId: string;
  label: string;
  toothFdi: number | null;
  // Normalized to 0..1 of the image width/height.
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number | null;
  source: FindingSource;
  reviewStatus: FindingReviewStatus;
  reviewedAt: string | null;
  reviewedById: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Radiograph {
  id: string;
  clinicId: string;
  patientId: string;
  type: RadiographType;
  originalFileName: string;
  mimeType: string;
  fileSize: number;
  takenAt: string | null;
  note: string | null;
  analysisStatus: RadiographAnalysisStatus;
  modelVersion: string | null;
  analyzedAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedById: string;
  uploadedBy: { id: string; fullName: string; role: UserRole };
  findings: RadiographFinding[];
}

export interface UploadRadiographInput {
  patientId: string;
  file: File;
  type?: RadiographType;
  takenAt?: string;
  note?: string;
}

export const MAX_RADIOGRAPH_FILE_SIZE = 20 * 1024 * 1024;

export const ACCEPTED_RADIOGRAPH_TYPES = ["image/png", "image/jpeg"];

export function listRadiographs(patientId: string): Promise<Radiograph[]> {
  const params = new URLSearchParams({ patientId });
  return apiFetch<Radiograph[]>(`/radiographs?${params.toString()}`);
}

export function uploadRadiograph(
  input: UploadRadiographInput
): Promise<Radiograph> {
  const body = new FormData();
  body.set("patientId", input.patientId);
  body.set("file", input.file);
  if (input.type) body.set("type", input.type);
  if (input.takenAt) body.set("takenAt", input.takenAt);
  if (input.note) body.set("note", input.note);

  return apiFetch<Radiograph>("/radiographs", { method: "POST", body });
}

export function getRadiographImage(id: string): Promise<Blob> {
  return apiFetchBlob(`/radiographs/${id}/file`);
}

export function deleteRadiograph(id: string): Promise<Radiograph> {
  return apiFetch<Radiograph>(`/radiographs/${id}`, { method: "DELETE" });
}
