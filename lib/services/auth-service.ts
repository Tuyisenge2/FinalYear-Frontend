// ============================================================================
// Auth Service
// TODO: Connect to backend API later - Replace all mock calls with real API
// ============================================================================

// import { User, Guard, SignupData } from "@/types/auth";

// Sign up a new user
// TODO: Replace mock with actual API call
export async function signupUser(data: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("[AuthService] Signup request:", data);
      resolve({ success: true });
    }, 1000);
  });
}

// LOGIN_INTEGRATION_POINT: Replace with real API endpoint
// POST /api/auth/login -> returns JWT token + user data
export async function loginUser(email: string, password: string, role: string) {
  // TODO: Connect to backend API
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password, role }),
  // });
  // if (!response.ok) throw new Error('Login failed');
  // return response.json();
  console.log("[AuthService] Login attempt:", { email, role });
}

// LOGOUT_INTEGRATION_POINT: Clear session on backend
export async function logoutUser() {
  // TODO: Connect to backend API
  // await fetch('/api/auth/logout', { method: 'POST' });
  console.log("[AuthService] User logged out");
}

// Verify current session
// TODO: Replace mock with actual session check
export async function verifySession() {
  // const response = await fetch('/api/auth/session');
  // return response.json();
  return null;
}