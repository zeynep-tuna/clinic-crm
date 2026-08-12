export interface JwtPayload {
  sub: string;
  clinicId: string;
  role: 'ADMIN' | 'SECRETARY' | 'DOCTOR';
  email: string;
}
