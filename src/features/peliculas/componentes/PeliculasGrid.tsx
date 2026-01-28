'use client';

import { usePeliculasTendencia } from '../hooks/use-peliculas-tendencia';
import { PeliculaCard } from './PeliculaCard';

export function PeliculasGrid() {
  const { data, isLoading, isError, error } = usePeliculasTendencia();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-[450px] w-full rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20">
        <p className="text-red-500 font-medium">Error al cargar películas</p>
        <p className="text-white/60 text-sm mt-2">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {data?.results.map((pelicula) => (
        <PeliculaCard key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
}
