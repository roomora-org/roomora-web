/**
 * Single place that knows where the access token lives.
 * - "Remember me" ON  -> localStorage   (survives closing the browser)
 * - "Remember me" OFF -> sessionStorage (cleared when the tab/browser closes)
 *
 * When the real backend is connected, use getToken() in services/api.ts
 * (e.g. for the Authorization header) instead of reading localStorage directly.
 */
const KEY = "roomora-token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
  } catch {
    return null; // storage blocked (private mode, etc.)
  }
}

export function setToken(token: string, remember = true) {
  try {
    clearToken();
    (remember ? localStorage : sessionStorage).setItem(KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
