const API_BASE = import.meta.env?.VITE_API_BASE || "https://jsonplaceholder.typicode.com";

export async function getJson(path, signal) {
  const response = await fetch(API_BASE + path, { signal });
  if (!response.ok) {
    const error = new Error("HTTP " + response.status);
    error.status = response.status;
    throw error;
  }
  return response.json();
}
