export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
};

if (!API_CONFIG.BASE_URL) {
  console.warn(
    "Advertencia: NEXT_PUBLIC_API_URL no está definida en el entorno.",
  );
}
