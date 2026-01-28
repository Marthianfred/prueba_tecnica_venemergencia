import { useQuery } from "@tanstack/react-query";
import { peliculasServicio } from "../servicios/peliculas.servicio";

// Definimos una interfaz para los filtros con 'genreId' opcional
interface Filtros {
  query: string;
  startYear?: string;
  endYear?: string;
  genreId?: string;
  page: number;
}

export function usePeliculasFiltradas({
  query,
  startYear,
  endYear,
  genreId,
  page,
}: Filtros) {
  return useQuery({
    queryKey: ["peliculas", query, startYear, endYear, genreId, page],
    queryFn: () => {
      // 3. (Fallback para casos raros, pero cubierto por 4)

      // 1. Si hay Query -> endpoint /search
      if (query) {
        return peliculasServicio.buscarPeliculas(
          query,
          page,
          startYear,
          endYear,
        );
      }

      // 2. Si NO hay Query pero hay Genre -> endpoint /discover con genre (o reuse getPeliculasPorGenero)
      if (genreId) {
        return peliculasServicio.getPeliculasPorGenero(
          Number(genreId),
          page,
          startYear,
          endYear,
        );
      }

      // 3. Si hay solo fechas (filtros Discover puros)
      if (startYear || endYear) {
        return peliculasServicio.descubrirPeliculas(page, startYear, endYear);
      }

      // 4. Default -> Trending
      return peliculasServicio.getTendencias(page);
    },
    // Mantener datos anteriores mientras carga los nuevos para mejor UX
    placeholderData: (previousData) => previousData,
  });
}
