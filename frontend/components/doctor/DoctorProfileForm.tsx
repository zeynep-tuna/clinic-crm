"use client";

import { useState } from "react";
import { doctorProfileInfo } from "@/data/doctorProfile";

interface DoctorProfileFormState {
  fullName: string;
  specialty: string;
  phone: string;
  email: string;
  clinic: string;
  experience: string;
  bio: string;
}

type DoctorProfileFormErrors = Partial<Record<keyof DoctorProfileFormState, string>>;

function validateDoctorProfileForm(values: DoctorProfileFormState): DoctorProfileFormErrors {
  const nextErrors: DoctorProfileFormErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Ad soyad zorunludur.";
  }

  if (!values.specialty.trim()) {
    nextErrors.specialty = "Uzmanlık alanı zorunludur.";
  }

  if (!values.phone.trim()) {
    nextErrors.phone = "Telefon numarası zorunludur.";
  } else {
    const digitCount = values.phone.replace(/\D/g, "").length;
    const hasLetters = /[a-zA-Z]/.test(values.phone);
    if (digitCount < 10 || hasLetters) {
      nextErrors.phone = "Geçerli bir telefon numarası girin.";
    }
  }

  if (!values.email.trim()) {
    nextErrors.email = "E-posta adresi zorunludur.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    nextErrors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (!values.clinic.trim()) {
    nextErrors.clinic = "Klinik bilgisi zorunludur.";
  }

  if (!values.experience.trim()) {
    nextErrors.experience = "Deneyim bilgisi zorunludur.";
  }

  return nextErrors;
}

export default function DoctorProfileForm() {
  const [form, setForm] = useState<DoctorProfileFormState>({
    fullName: doctorProfileInfo.fullName,
    specialty: doctorProfileInfo.specialty,
    phone: doctorProfileInfo.phone,
    email: doctorProfileInfo.email,
    clinic: doctorProfileInfo.clinic,
    experience: doctorProfileInfo.experience,
    bio: doctorProfileInfo.bio,
  });
  const [errors, setErrors] = useState<DoctorProfileFormErrors>({});

  const updateField = <K extends keyof DoctorProfileFormState>(
    key: K,
    value: DoctorProfileFormState[K]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateDoctorProfileForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(form);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] border border-[#EAF0F8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ad Soyad</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.fullName ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.fullName && <p className="mt-1 text-sm text-[#EF4444]">{errors.fullName}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Uzmanlık</label>
          <input
            type="text"
            value={form.specialty}
            onChange={(event) => updateField("specialty", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.specialty ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.specialty && <p className="mt-1 text-sm text-[#EF4444]">{errors.specialty}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Telefon</label>
          <input
            type="text"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.phone ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-[#EF4444]">{errors.phone}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">E-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.email ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-[#EF4444]">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Klinik</label>
          <input
            type="text"
            value={form.clinic}
            onChange={(event) => updateField("clinic", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.clinic ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.clinic && <p className="mt-1 text-sm text-[#EF4444]">{errors.clinic}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Deneyim</label>
          <input
            type="text"
            value={form.experience}
            onChange={(event) => updateField("experience", event.target.value)}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20 ${
              errors.experience ? "border-[#EF4444]/60" : "border-[#EAF0F8]"
            }`}
          />
          {errors.experience && <p className="mt-1 text-sm text-[#EF4444]">{errors.experience}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Biyografi</label>
          <textarea
            value={form.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-[#EAF0F8] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="flex h-11 items-center rounded-xl bg-[#5B4DE3] px-5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
