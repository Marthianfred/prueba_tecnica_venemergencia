'use client';

import { useState } from 'react';
import { usePeliculasFiltradas } from '../hooks/use-peliculas-filtradas';
import { PeliculaCard } from './PeliculaCard';
import { BuscadorPeliculas } from './BuscadorPeliculas';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { Button } from '@/shared/componentes/Button';

export function PeliculasGrid() {
  const [query, setQuery] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);
  const debouncedStartYear = useDebounce(startYear, 500);
  const debouncedEndYear = useDebounce(endYear, 500);
  const handleQueryChange = (val: string) => { setQuery(val); setPage(1); };
  const handleStartYearChange = (val: string) => { setStartYear(val); setPage(1); };
  const handleEndYearChange = (val: string) => { setEndYear(val); setPage(1); };

  const { data, isLoading, isError, error, isFetching } = usePeliculasFiltradas({
    query: debouncedQuery,
    startYear: debouncedStartYear,
    endYear: debouncedEndYear,
    page: page
  });

  const getTitle = () => {
    if (debouncedQuery) return `Resultados para "${debouncedQuery}"`;
    if (debouncedStartYear || debouncedEndYear) return 'Películas Filtradas';
    return 'Películas en Tendencia';
  };

  return (
    <div className="space-y-8">
      {/* Buscador y Filtros */}
      <BuscadorPeliculas 
        search={query}
        onSearchChange={handleQueryChange}
        startYear={startYear}
        onStartYearChange={handleStartYearChange}
        endYear={endYear}
        onEndYearChange={handleEndYearChange}
      />

      {/* Header de la sección */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-600 rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">{getTitle()}</h2>
        </div>
        {isFetching && (
          <div className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-400 font-medium animate-pulse">
            Actualizando...
          </div>
        )}
      </div>

      {/* Estado Carga Inicial */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-[450px] w-full rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {/* Estado Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20">
          <p className="text-red-500 font-medium">Error al cargar películas</p>
          <p className="text-white/60 text-sm mt-2">{(error as Error).message}</p>
        </div>
      )}

      {/* Grid de Resultados */}
      {!isLoading && !isError && (
        <>
          {data?.results.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              No se encontraron películas con estos criterios.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data?.results.map((pelicula) => (
                <PeliculaCard key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          )}

          {/* Paginación Simple */}
          {data && data.total_pages > 1 && (
            <div className="flex justify-center gap-4 mt-12">
              <Button 
                variant="secondary" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="flex items-center text-white/60 font-medium">
                Página {page} de {Math.min(data.total_pages, 500)}
              </span>
              <Button 
                variant="secondary" 
                onClick={() => setPage(p => p + 1)}
                disabled={page >= data.total_pages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
