import { getAccessToken } from "@/lib/auth-storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL && process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console
  console.error(
    "NEXT_PUBLIC_API_URL is not set. Configure it in frontend/.env.local."
  );
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path: string, options: RequestInit): Promise<Response> {
  const headers = new Headers(options.headers);

  // FormData bodies need the browser to set the multipart boundary itself.
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL ?? ""}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = response.statusText;

    try {
      const errorBody = await response.json();
      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      } else if (Array.isArray(errorBody?.message)) {
        message = errorBody.message.join(", ");
      }
    } catch {
      // response body is not JSON; keep statusText as the message
    }

    throw new ApiError(response.status, message);
  }

  return response;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await request(path, options);

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

// For authenticated binary responses (e.g. radiograph images), which can't be
// loaded with a plain <img src> because the API requires a Bearer token.
export async function apiFetchBlob(
  path: string,
  options: RequestInit = {}
): Promise<Blob> {
  const response = await request(path, options);
  return response.blob();
}
