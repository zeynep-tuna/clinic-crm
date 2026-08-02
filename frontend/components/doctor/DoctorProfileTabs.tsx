"use client";

import { useState } from "react";
import DoctorProfileForm from "@/components/doctor/DoctorProfileForm";
import DoctorWorkingHoursCard from "@/components/doctor/DoctorWorkingHoursCard";
import DoctorPasswordCard from "@/components/doctor/DoctorPasswordCard";

type TabValue = "profile" | "hours" | "security";

const tabs: { value: TabValue; label: string }[] = [
  { value: "profile", label: "Profil Bilgileri" },
  { value: "hours", label: "Çalışma Saatleri" },
  { value: "security", label: "Güvenlik" },
];

export default function DoctorProfileTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>("profile");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex h-10 items-center rounded-xl border px-4 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#5B4DE3] bg-[#5B4DE3] text-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_2px_6px_rgba(91,77,227,0.25)]"
                  : "border-[#EAF0F8] text-[#0B1F55] hover:border-[#DCD8FF] hover:bg-[#F7F8FF]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "profile" && <DoctorProfileForm />}
      {activeTab === "hours" && <DoctorWorkingHoursCard />}
      {activeTab === "security" && <DoctorPasswordCard />}
    </div>
  );
}
