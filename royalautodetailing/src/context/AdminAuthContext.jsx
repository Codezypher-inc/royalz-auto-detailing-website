import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiGet } from "../lib/api";
import { supabase } from "../supabaseClient";

const AdminAuthContext = createContext(null);

function isRecoveryHash(hashValue) {
  return hashValue.includes("type=recovery") || hashValue.includes("access_token=");
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecoveryMode, setIsRecoveryMode] = useState(
    typeof window !== "undefined" ? isRecoveryHash(window.location.hash) : false
  );

  async function hydrateAdminSession(nextSession) {
    if (!nextSession?.access_token) {
      setSession(null);
      setAdminUser(null);
      setIsAdmin(false);
      setIsLoading(false);
      return null;
    }

    setIsLoading(true);

    try {
      const response = await apiGet("/api/auth/session", nextSession.access_token);

      setSession(nextSession);
      setAdminUser(response.user);
      setIsAdmin(true);
      setIsLoading(false);
      return response.user;
    } catch (error) {
      await supabase.auth.signOut();
      setSession(null);
      setAdminUser(null);
      setIsAdmin(false);
      setIsLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        await hydrateAdminSession(currentSession);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSession(null);
        setAdminUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!isMounted) {
        return;
      }

      if (event === "PASSWORD_RECOVERY") {
        setIsRecoveryMode(true);
      } else if (event === "SIGNED_OUT") {
        setIsRecoveryMode(false);
      } else if (typeof window !== "undefined") {
        setIsRecoveryMode(isRecoveryHash(window.location.hash));
      }

      startTransition(() => {
        void hydrateAdminSession(nextSession).catch(() => {
          // Errors are surfaced by the caller that initiated auth changes.
        });
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signInAsAdmin({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      throw new Error(error?.message || "Unable to log in.");
    }

    try {
      await hydrateAdminSession(data.session);
    } catch (authError) {
      throw new Error(
        authError.message || "This account is not allowed to access the admin dashboard."
      );
    }
  }

  async function sendPasswordResetEmail(email, redirectTo) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async function updateAdminPassword(password) {
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      throw new Error(error.message);
    }

    setIsRecoveryMode(false);

    if (typeof window !== "undefined") {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return data.user;
  }

  async function signOutAdmin() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }

  const value = useMemo(
    () => ({
      session,
      adminUser,
      isAdmin,
      isLoading,
      isRecoveryMode,
      signInAsAdmin,
      sendPasswordResetEmail,
      updateAdminPassword,
      signOutAdmin,
    }),
    [session, adminUser, isAdmin, isLoading, isRecoveryMode]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
}
