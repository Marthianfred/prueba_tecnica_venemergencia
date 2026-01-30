import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

export function useDetallePelicula(id: number) {
  return useQuery({
    queryKey: ["pelicula", id],
    queryFn: async () => {
      const [detalle, creditos, reviews] = await Promise.all([
        peliculasServicio.getDetalle(id),
        peliculasServicio.getCreditos(id),
        peliculasServicio.getReviews(id),
      ]);
      return { detalle, reparto: creditos.cast, reviews: reviews.results };
    },
    enabled: !!id,
  });
}
