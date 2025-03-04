export interface User {
  id: string;
  email: string;
  createdAt: string;
  lastSignInAt: string;
  role: string;
  emailVerified: boolean;
  user_metadata: {
    displayName: string;
  }
}
