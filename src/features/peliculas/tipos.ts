export interface Pelicula {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface ApiResponseTrendig {
  page: number;
  results: Pelicula[];
  total_pages: number;
  total_results: number;
}
