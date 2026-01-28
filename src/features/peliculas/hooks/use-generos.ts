import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

export function useGeneros() {
  return useQuery({
    queryKey: ["generos"],
    queryFn: peliculasServicio.getGeneros,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas de caché ya que los géneros no cambian mucho
  });
}
