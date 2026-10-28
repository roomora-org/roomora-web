import axios, { AxiosError } from "axios";

export interface ParsedApiError {
  message: string;
  status?: number;
  code?: string;
  isNetworkError: boolean;
  isTimeout: boolean;
  isServerError: boolean;
}

export function parseApiError(error: unknown): ParsedApiError {
  const fallback: ParsedApiError = {
    message: "Something went wrong. Please try again.",
    isNetworkError: false,
    isTimeout: false,
    isServerError: false,
  };

  // If the browser itself is offline, we don't even need to inspect axios
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return {
      ...fallback,
      message:
        "You are offline. Please check your internet connection and try again.",
      isNetworkError: true,
    };
  }

  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) {
      return { ...fallback, message: error.message || fallback.message };
    }
    return fallback;
  }

  const err = error as AxiosError<any>;

  if (!err.response) {
    const code = err.code;
    if (
      code === "ECONNABORTED" ||
      err.message?.toLowerCase().includes("timeout")
    ) {
      return {
        ...fallback,
        message:
          "The request timed out. Please check your connection and try again.",
        code,
        isTimeout: true,
      };
    }
    return {
      ...fallback,
      message:
        "No internet connection. Please check your network and try again.",
      code,
      isNetworkError: true,
    };
  }

  const status = err.response.status;
  const data = err.response.data;

  let serverMessage: string | undefined;
  if (typeof data === "string") {
    serverMessage = data;
  } else if (Array.isArray(data?.message)) {
    serverMessage = data.message.join(", ");
  } else if (typeof data?.message === "string") {
    serverMessage = data.message;
  }

  if (status >= 500) {
    return {
      message:
        serverMessage ||
        "The server is having trouble right now. Please try again in a moment.",
      status,
      code: err.code,
      isNetworkError: false,
      isTimeout: false,
      isServerError: true,
    };
  }

  if (status === 429) {
    return {
      message:
        serverMessage ||
        "Too many requests. Please wait a moment and try again.",
      status,
      code: err.code,
      isNetworkError: false,
      isTimeout: false,
      isServerError: false,
    };
  }

  return {
    message: serverMessage || `Request failed (${status}). Please try again.`,
    status,
    code: err.code,
    isNetworkError: false,
    isTimeout: false,
    isServerError: false,
  };
}

export function showApiError(
  toastFn: (msg: string, opts?: { description?: string }) => void,
  error: unknown,
  defaultTitle = "Something went wrong"
) {
  const parsed = parseApiError(error);
  let title = defaultTitle;

  if (parsed.isNetworkError) title = "No internet connection";
  else if (parsed.isTimeout) title = "Request timed out";
  else if (parsed.isServerError) title = "Server error";
  else if (parsed.status === 429) title = "Too many requests";

  toastFn(title, { description: parsed.message });
}