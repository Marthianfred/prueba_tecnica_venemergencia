import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

interface Filtros {
  query: string;
  startYear?: string;
  endYear?: string;
  page?: number;
}

export function usePeliculasFiltradas(filtros: Filtros) {
  return useQuery({
    queryKey: ["peliculas", "filtradas", filtros],
    queryFn: () => {
      // 1. Si hay texto de búsqueda
      if (filtros.query.trim()) {
        return peliculasServicio.buscarPeliculas(
          filtros.query,
          filtros.page,
          filtros.startYear,
          filtros.endYear,
        );
      }

      // 2. Si no hay texto pero hay filtros de fecha (Modo Descubrimiento)
      if (filtros.startYear || filtros.endYear) {
        return peliculasServicio.descubrirPeliculas(
          filtros.page,
          filtros.startYear,
          filtros.endYear,
        );
      }

      // 3. Por defecto: Tendencias (si no hay nada)
      return peliculasServicio.getTendencias(filtros.page);
    },
    // Mantener datos anteriores mientras carga los nuevos para mejor UX
    placeholderData: (previousData) => previousData,
  });
}
