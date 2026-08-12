export interface AuthenticatedUser {
  id: string;
  clinicId: string;
  role: 'ADMIN' | 'SECRETARY' | 'DOCTOR';
  email: string;
}
