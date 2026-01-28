import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

export function useDetallePelicula(id: number) {
  return useQuery({
    queryKey: ["pelicula", id],
    queryFn: async () => {
      const [detalle, creditos] = await Promise.all([
        peliculasServicio.getDetalle(id),
        peliculasServicio.getCreditos(id),
      ]);
      return { detalle, reparto: creditos.cast };
    },
    enabled: !!id,
  });
}
