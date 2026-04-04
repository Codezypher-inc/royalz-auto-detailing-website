const STORAGE_KEY = "adminSession";

export function getAdminSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("isAdmin");
    return null;
  }
}

export function saveAdminSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.localStorage.setItem("isAdmin", "true");
}

export function clearAdminSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem("isAdmin");
}

export function isAdminLoggedIn() {
  const session = getAdminSession();
  return Boolean(session?.accessToken);
}
