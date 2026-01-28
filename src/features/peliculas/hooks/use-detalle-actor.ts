import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

export function useDetalleActor(id: number) {
  return useQuery({
    queryKey: ["actor", id],
    queryFn: async () => {
      const [perfil, creditos] = await Promise.all([
        peliculasServicio.getActorDetalle(id),
        peliculasServicio.getActorCreditos(id),
      ]);
      return { perfil, peliculas: creditos.cast };
    },
    enabled: !!id,
  });
}
