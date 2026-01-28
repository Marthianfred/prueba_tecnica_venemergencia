import { API_CONFIG } from "../config/api.config";

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  // Asegurar que el endpoint tenga el separador correcto para query params
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${API_CONFIG.BASE_URL}${endpoint}${separator}api_key=${API_CONFIG.API_KEY}`;

  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.status_message || "Error en la petición");
  }

  return response.json();
}
