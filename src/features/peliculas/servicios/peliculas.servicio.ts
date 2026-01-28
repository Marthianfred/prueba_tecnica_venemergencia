import { fetcher } from "@/shared/servicios/api-cliente";
import {
  ApiResponsePaginated,
  Pelicula,
  Genero,
  Reparto,
  Actor,
} from "../tipos";

export const peliculasServicio = {
  // 1. Películas en Tendencia (Semana)
  getTendencias: async (page = 1): Promise<ApiResponsePaginated<Pelicula>> => {
    return fetcher<ApiResponsePaginated<Pelicula>>(
      `/trending/movie/week?page=${page}`,
    );
  },

  // 2. Búsqueda por Texto con filtros de fecha
  buscarPeliculas: async (
    query: string,
    page = 1,
    startYear?: string,
    endYear?: string,
  ): Promise<ApiResponsePaginated<Pelicula>> => {
    let endpoint = `/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
    if (startYear) endpoint += `&primary_release_date.gte=${startYear}-01-01`;
    if (endYear) endpoint += `&primary_release_date.lte=${endYear}-12-31`;
    return fetcher<ApiResponsePaginated<Pelicula>>(endpoint);
  },

  // 3. Descubrimiento y Filtros
  descubrirPeliculas: async (
    page = 1,
    startYear?: string,
    endYear?: string,
  ): Promise<ApiResponsePaginated<Pelicula>> => {
    let endpoint = `/discover/movie?sort_by=popularity.desc&page=${page}`;
    if (startYear) endpoint += `&primary_release_date.gte=${startYear}-01-01`;
    if (endYear) endpoint += `&primary_release_date.lte=${endYear}-12-31`;
    return fetcher<ApiResponsePaginated<Pelicula>>(endpoint);
  },

  // 4. Filtrado por Género
  getGeneros: async (): Promise<{ genres: Genero[] }> => {
    return fetcher<{ genres: Genero[] }>("/genre/movie/list");
  },

  getPeliculasPorGenero: async (
    genreId: number,
    page = 1,
    startYear?: string,
    endYear?: string,
  ): Promise<ApiResponsePaginated<Pelicula>> => {
    let endpoint = `/discover/movie?with_genres=${genreId}&page=${page}`;
    if (startYear) endpoint += `&primary_release_date.gte=${startYear}-01-01`;
    if (endYear) endpoint += `&primary_release_date.lte=${endYear}-12-31`;
    return fetcher<ApiResponsePaginated<Pelicula>>(endpoint);
  },

  // 5. Detalle de Película y Reparto
  getDetalle: async (movieId: number): Promise<Pelicula> => {
    return fetcher<Pelicula>(`/movie/${movieId}`);
  },

  getCreditos: async (movieId: number): Promise<{ cast: Reparto[] }> => {
    return fetcher<{ cast: Reparto[] }>(`/movie/${movieId}/credits`);
  },

  // 6. Datos del Actor y Filmografía
  getActorDetalle: async (personId: number): Promise<Actor> => {
    return fetcher<Actor>(`/person/${personId}`);
  },

  getActorCreditos: async (personId: number): Promise<{ cast: Pelicula[] }> => {
    return fetcher<{ cast: Pelicula[] }>(`/person/${personId}/movie_credits`);
  },
};
