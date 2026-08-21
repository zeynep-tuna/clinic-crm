import { apiFetch } from "@/lib/api";
import type { UserRole } from "@/lib/auth";

export interface MessageRecipient {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export function listMessageRecipients(): Promise<MessageRecipient[]> {
  return apiFetch<MessageRecipient[]>("/users/colleagues");
}
