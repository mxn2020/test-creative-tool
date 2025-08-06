import { createAuthClient } from "better-auth/react";

// Use full URL for Better Auth client
const getAuthBaseURL = () => {
  if (typeof window === 'undefined') {
    return "http://localhost:5176/api/auth";
  }
  
  // In development, use the current origin (Vite will proxy to Netlify)
  // In production, use the current origin
  return `${window.location.origin}/api/auth`;
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
  fetchOptions: {
    credentials: 'include', // Include cookies for cross-origin requests
  },
});

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession, 
  getSession,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  updateUser,
  changePassword,
  changeEmail,
  deleteUser,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  linkSocial
} = authClient;