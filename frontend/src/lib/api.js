const browserHostname =
  typeof window !== "undefined" ? window.location.hostname : "localhost";
const DEFAULT_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || `http://${browserHostname}:8088`;
const API_BASE_URLS = Array.from(
  new Set([
    DEFAULT_API_BASE_URL,
    "http://localhost:8088",
    "http://127.0.0.1:8088",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ]),
);

async function request(path, options = {}) {
  let lastError = null;
  const method = options.method || "GET";
  const hasBody = options.body !== undefined;
  const headers = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        credentials: "include",
        headers,
        method,
        ...options,
      });

      const contentType = response.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message = formatErrorMessage(payload);
        throw new Error(message);
      }

      return payload;
    } catch (error) {
      lastError = error;

      // Retry only when the backend is unreachable on this port.
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "Cannot reach the backend server. Start the Spring app on localhost:8088 or localhost:8080.",
  );
}

function formatErrorMessage(payload) {
  if (typeof payload === "string") {
    return payload;
  }

  if (Array.isArray(payload?.details) && payload.details.length > 0) {
    return payload.details.join(", ");
  }

  return payload?.message || "Request failed";
}

export function getStudents() {
  return request("/students");
}

export function getTests() {
  return request("/tests");
}

export function getSchemaOverview() {
  return request("/schema/overview");
}

export function getMarks() {
  return request("/marks");
}

export function login(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function signup(payload) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function resetPassword(payload) {
  return request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export { DEFAULT_API_BASE_URL as API_BASE_URL };
