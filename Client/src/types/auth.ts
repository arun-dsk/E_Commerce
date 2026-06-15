export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}
