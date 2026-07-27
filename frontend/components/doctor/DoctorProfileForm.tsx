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

  const updateField = <K extends keyof DoctorProfileFormState>(
    key: K,
    value: DoctorProfileFormState[K]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] border border-[#E3E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_8px_rgba(16,24,40,0.04)]"
    >
      <h2 className="text-base font-semibold text-[#0B1F55]">Profil Bilgileri</h2>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Ad Soyad</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Uzmanlık</label>
          <input
            type="text"
            value={form.specialty}
            onChange={(event) => updateField("specialty", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Telefon</label>
          <input
            type="text"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">E-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Klinik</label>
          <input
            type="text"
            value={form.clinic}
            onChange={(event) => updateField("clinic", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Deneyim</label>
          <input
            type="text"
            value={form.experience}
            onChange={(event) => updateField("experience", event.target.value)}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-[#0B1F55]">Biyografi</label>
          <textarea
            value={form.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-[#E3E8F0] px-4 py-2.5 text-sm text-[#0B1F55] placeholder:text-[#98A2B3] focus:border-[#5B4DE3] focus:outline-none focus:ring-2 focus:ring-[#5B4DE3]/20"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-[#5B4DE3] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fd1]"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
