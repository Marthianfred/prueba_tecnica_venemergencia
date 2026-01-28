import { fetcher } from "@/shared/servicios/api-cliente";
import { ApiResponseTrendig } from "../tipos";

export const peliculasServicio = {
  getTendencias: async (): Promise<ApiResponseTrendig> => {
    return fetcher<ApiResponseTrendig>("/trending/movie/day?language=es-ES");
  },
};
