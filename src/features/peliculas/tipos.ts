export interface Pelicula {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime?: number; // Duración en minutos
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

export interface ApiResponsePaginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genero {
  id: number;
  name: string;
}

export interface Reparto {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Actor {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  birthday: string;
  place_of_birth: string;
}
