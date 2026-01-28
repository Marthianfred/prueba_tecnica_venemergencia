export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
  PLACEHOLDER_IMAGE: "https://via.placeholder.com/500x750?text=No+Image",
};

if (!API_CONFIG.API_KEY && typeof window !== "undefined") {
  console.warn("⚠️ API KEY no configurada. Revisa tu archivo .env");
}
