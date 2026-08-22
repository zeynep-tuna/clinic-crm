import { apiFetch, ApiError } from "@/lib/api";
import { clearAccessToken, getAccessToken } from "@/lib/auth-storage";

export type UserRole = "ADMIN" | "SECRETARY" | "DOCTOR";

export interface AuthUser {
  id: string;
  clinicId: string;
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

const VALID_ROLES: UserRole[] = ["ADMIN", "SECRETARY", "DOCTOR"];

export function isUserRole(value: string): value is UserRole {
  return (VALID_ROLES as string[]).includes(value);
}

const ROLE_HOME: Record<UserRole, string> = {
  ADMIN: "/dashboard",
  SECRETARY: "/secretary/dashboard",
  DOCTOR: "/doctor/dashboard",
};

export function getRoleHome(role: UserRole): string {
  return ROLE_HOME[role];
}

export async function getCurrentUser(): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/me");
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/auth/change-password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function validateCurrentUser(): Promise<AuthUser | null> {
  if (!getAccessToken()) {
    return null;
  }

  try {
    return await getCurrentUser();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearAccessToken();
      return null;
    }

    throw error;
  }
}
