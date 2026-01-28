export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3",
  API_KEY:
    process.env.NEXT_PUBLIC_TMDB_TOKEN || "3fd2be6f0c70a2a598f084ddfb75487c",
  IMAGE_BASE_URL:
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://image.tmdb.org/t/p",
};
