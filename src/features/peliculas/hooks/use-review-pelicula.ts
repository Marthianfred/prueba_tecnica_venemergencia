import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

export function useReviewPelicula(id: number) {
  return useQuery({
    queryKey: ["pelicula", "review", id],
    queryFn: async () => {
      const [review] = await Promise.all([
        peliculasServicio.getReviews(id)
      ]);
      return { review };
    },
    enabled: !!id,
  });
}
