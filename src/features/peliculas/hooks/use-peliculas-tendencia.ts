import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

export function usePeliculasTendencia() {
  return useQuery({
    queryKey: ["peliculas", "tendencia"],
    queryFn: () => peliculasServicio.getTendencias(),
  });
}
