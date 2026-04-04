const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" && payload !== null && payload.error
        ? payload.error
        : "Request failed.";

    throw new Error(errorMessage);
  }

  return payload;
}

export function apiGet(path, token) {
  return request(path, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function apiPost(path, body, token) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body || {}),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function apiPut(path, body, token) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(body || {}),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export { API_BASE_URL };
