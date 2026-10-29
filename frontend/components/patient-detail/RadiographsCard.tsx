"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "@/lib/api";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  ACCEPTED_RADIOGRAPH_TYPES,
  MAX_RADIOGRAPH_FILE_SIZE,
  deleteRadiograph,
  getRadiographImage,
  listRadiographs,
  uploadRadiograph,
  type Radiograph,
  type RadiographType,
} from "@/lib/radiographs-api";

const TYPE_LABELS: Record<RadiographType, string> = {
  PANORAMIC: "Panoramik",
  BITEWING: "Bitewing",
  PERIAPICAL: "Periapikal",
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(value: string | null) {
  return value ? dateFormatter.format(new Date(value)) : "—";
}

function formatFileSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

interface UploadFormState {
  file: File | null;
  type: RadiographType;
  takenAt: string;
  note: string;
}

const initialUploadForm = (): UploadFormState => ({
  file: null,
  type: "PANORAMIC",
  takenAt: todayIsoDate(),
  note: "",
});

interface RadiographsCardProps {
  patientId: string;
  canUpload: boolean;
  canDelete: boolean;
}

export default function RadiographsCard({ patientId, canUpload, canDelete }: RadiographsCardProps) {
  const [radiographs, setRadiographs] = useState<Radiograph[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Images need the Bearer token, so they are fetched as blobs and shown
  // through object URLs that are revoked when no longer needed.
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const imageUrlsRef = useRef<Record<string, string>>({});

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState<UploadFormState>(initialUploadForm);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [viewing, setViewing] = useState<Radiograph | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Radiograph | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadRadiographs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setRadiographs(await listRadiographs(patientId));
    } catch {
      setError("Radyografiler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    loadRadiographs();
  }, [loadRadiographs]);

  useEffect(() => {
    let isCancelled = false;
    const missing = radiographs.filter((radiograph) => !imageUrlsRef.current[radiograph.id]);

    missing.forEach(async (radiograph) => {
      try {
        const blob = await getRadiographImage(radiograph.id);
        if (isCancelled) return;
        const url = URL.createObjectURL(blob);
        imageUrlsRef.current[radiograph.id] = url;
        setImageUrls((current) => ({ ...current, [radiograph.id]: url }));
      } catch {
        // The card still renders; the thumbnail just shows a placeholder.
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [radiographs]);

  useEffect(() => {
    const urls = imageUrlsRef.current;
    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (!viewing) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewing(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewing]);

  function resetUploadForm() {
    setUploadForm(initialUploadForm());
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFileChange(file: File | null) {
    setUploadError(null);

    if (file && !ACCEPTED_RADIOGRAPH_TYPES.includes(file.type)) {
      setUploadError("Yalnızca PNG veya JPEG dosyası yükleyebilirsiniz.");
      setUploadForm((current) => ({ ...current, file: null }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file && file.size > MAX_RADIOGRAPH_FILE_SIZE) {
      setUploadError("Dosya boyutu en fazla 20 MB olabilir.");
      setUploadForm((current) => ({ ...current, file: null }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploadForm((current) => ({ ...current, file }));
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uploadForm.file) {
      setUploadError("Lütfen bir röntgen görüntüsü seçin.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const created = await uploadRadiograph({
        patientId,
        file: uploadForm.file,
        type: uploadForm.type,
        takenAt: uploadForm.takenAt || undefined,
        note: uploadForm.note.trim() || undefined,
      });
      setRadiographs((current) => [created, ...current]);
      resetUploadForm();
      setIsUploadOpen(false);
    } catch (uploadFailure) {
      setUploadError(
        uploadFailure instanceof ApiError && uploadFailure.status === 400
          ? uploadFailure.message
          : "Röntgen yüklenirken bir hata oluştu."
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;

    const target = pendingDelete;
    setPendingDelete(null);
    setActionError(null);

    try {
      await deleteRadiograph(target.id);
      setRadiographs((current) => current.filter((radiograph) => radiograph.id !== target.id));
      if (viewing?.id === target.id) setViewing(null);
    } catch {
      setActionError("Röntgen silinirken bir hata oluştu.");
    }
  }

  return (
    <div className="rounded-[20px] border border-[#EAF0F8] bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#5B4DE3]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path strokeLinecap="round" d="M7 10.5c1.2-1 2.4-1 3.5 0s2.3 1 3.5 0 2.3-1 3 0M7 14c1.2 1 2.4 1 3.5 0s2.3-1 3.5 0 2.3 1 3 0" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B1F55]">Radyografiler</h3>
            <p className="text-xs text-[#667085]">Panoramik ve diğer diş röntgenleri</p>
          </div>
        </div>

        {canUpload && !isUploadOpen && (
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#5B4DE3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
            </svg>
            Röntgen Yükle
          </button>
        )}
      </div>

      {isUploadOpen && (
        <form
          onSubmit={handleUpload}
          className="mt-5 grid grid-cols-1 gap-4 rounded-2xl border border-[#EAF0F8] bg-[#F7F8FF] p-5 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <label htmlFor="radiograph-file" className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
              Görüntü dosyası
            </label>
            <input
              id="radiograph-file"
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_RADIOGRAPH_TYPES.join(",")}
              onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
              className="block w-full rounded-xl border border-[#EAF0F8] bg-white px-3 py-2 text-sm text-[#0B1F55] file:mr-3 file:rounded-lg file:border-0 file:bg-[#EEF0FF] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#5B4DE3]"
            />
            <p className="mt-1 text-xs text-[#667085]">PNG veya JPEG, en fazla 20 MB.</p>
          </div>

          <div>
            <label htmlFor="radiograph-type" className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
              Röntgen türü
            </label>
            <select
              id="radiograph-type"
              value={uploadForm.type}
              onChange={(event) =>
                setUploadForm((current) => ({ ...current, type: event.target.value as RadiographType }))
              }
              className="h-11 w-full rounded-xl border border-[#EAF0F8] bg-white px-3 text-sm text-[#0B1F55]"
            >
              {(Object.keys(TYPE_LABELS) as RadiographType[]).map((type) => (
                <option key={type} value={type}>
                  {TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="radiograph-taken-at" className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
              Çekim tarihi
            </label>
            <input
              id="radiograph-taken-at"
              type="date"
              value={uploadForm.takenAt}
              max={todayIsoDate()}
              onChange={(event) => setUploadForm((current) => ({ ...current, takenAt: event.target.value }))}
              className="h-11 w-full rounded-xl border border-[#EAF0F8] bg-white px-3 text-sm text-[#0B1F55]"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="radiograph-note" className="mb-1.5 block text-sm font-medium text-[#0B1F55]">
              Not
            </label>
            <textarea
              id="radiograph-note"
              rows={2}
              maxLength={2000}
              value={uploadForm.note}
              onChange={(event) => setUploadForm((current) => ({ ...current, note: event.target.value }))}
              placeholder="Örn. Kontrol çekimi"
              className="w-full rounded-xl border border-[#EAF0F8] bg-white px-3 py-2 text-sm text-[#0B1F55]"
            />
          </div>

          {uploadError && <p className="text-sm text-[#EF4444] md:col-span-2">{uploadError}</p>}

          <div className="flex justify-end gap-2.5 md:col-span-2">
            <button
              type="button"
              onClick={() => {
                resetUploadForm();
                setIsUploadOpen(false);
              }}
              className="flex h-10 items-center rounded-xl border border-[#EAF0F8] bg-white px-4 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex h-10 items-center rounded-xl bg-[#5B4DE3] px-4 text-sm font-semibold text-white hover:bg-[#4c3fd1] disabled:opacity-60"
            >
              {isUploading ? "Yükleniyor..." : "Yükle"}
            </button>
          </div>
        </form>
      )}

      {actionError && <p className="mt-4 text-sm text-[#EF4444]">{actionError}</p>}

      <div className="mt-5">
        {isLoading && <p className="py-6 text-center text-sm text-[#667085]">Radyografiler yükleniyor...</p>}

        {!isLoading && error && (
          <div className="flex flex-col items-center gap-3 py-6">
            <p className="text-sm text-[#EF4444]">{error}</p>
            <button
              type="button"
              onClick={loadRadiographs}
              className="rounded-xl border border-[#EAF0F8] px-4 py-2 text-sm font-semibold text-[#0B1F55] hover:bg-[#F7F8FF]"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {!isLoading && !error && radiographs.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">Bu hasta için henüz röntgen yüklenmemiş.</p>
        )}

        {!isLoading && !error && radiographs.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {radiographs.map((radiograph) => (
              <div key={radiograph.id} className="overflow-hidden rounded-2xl border border-[#EAF0F8]">
                <button
                  type="button"
                  onClick={() => setViewing(radiograph)}
                  aria-label={`${TYPE_LABELS[radiograph.type]} röntgeni büyüt`}
                  className="flex aspect-[2/1] w-full items-center justify-center bg-[#0B1F55]/90"
                >
                  {imageUrls[radiograph.id] ? (
                    // eslint-disable-next-line @next/next/no-img-element -- authenticated blob URL, not optimizable
                    <img
                      src={imageUrls[radiograph.id]}
                      alt={`${TYPE_LABELS[radiograph.type]} röntgen, ${formatDate(radiograph.takenAt)}`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-white/70">Görüntü yükleniyor...</span>
                  )}
                </button>

                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0B1F55]">
                      {TYPE_LABELS[radiograph.type]} · {formatDate(radiograph.takenAt)}
                    </p>
                    <p className="truncate text-xs text-[#667085]">
                      {radiograph.uploadedBy.fullName} · {formatFileSize(radiograph.fileSize)}
                    </p>
                    {radiograph.note && <p className="mt-1 truncate text-xs text-[#667085]">{radiograph.note}</p>}
                  </div>

                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => setPendingDelete(radiograph)}
                      aria-label="Röntgeni sil"
                      className="shrink-0 rounded-lg p-1.5 text-[#667085] hover:bg-[#FEE2E2] hover:text-[#EF4444]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4"
          onClick={() => setViewing(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${TYPE_LABELS[viewing.type]} röntgen`}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-white"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#EAF0F8] px-6 py-4">
              <div className="min-w-0">
                <p className="text-base font-bold text-[#0B1F55]">
                  {TYPE_LABELS[viewing.type]} · {formatDate(viewing.takenAt)}
                </p>
                <p className="truncate text-xs text-[#667085]">
                  {viewing.originalFileName} · Yükleyen: {viewing.uploadedBy.fullName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewing(null)}
                aria-label="Kapat"
                className="rounded-lg p-2 text-[#667085] hover:bg-[#F7F8FF]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-[#0B1F55]">
              {imageUrls[viewing.id] ? (
                // eslint-disable-next-line @next/next/no-img-element -- authenticated blob URL, not optimizable
                <img
                  src={imageUrls[viewing.id]}
                  alt={`${TYPE_LABELS[viewing.type]} röntgen, ${formatDate(viewing.takenAt)}`}
                  className="max-h-[75vh] w-full object-contain"
                />
              ) : (
                <p className="py-20 text-sm text-white/70">Görüntü yükleniyor...</p>
              )}
            </div>

            {viewing.note && <p className="px-6 py-4 text-sm text-[#0B1F55]">{viewing.note}</p>}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Röntgeni sil"
        description="Bu röntgen hasta kaydından kaldırılacak. Devam etmek istiyor musunuz?"
        confirmLabel="Sil"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
