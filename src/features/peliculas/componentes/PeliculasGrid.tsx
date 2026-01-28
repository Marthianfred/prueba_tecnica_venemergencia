'use client';

import { useState } from 'react';
import { usePeliculasFiltradas } from '../hooks/use-peliculas-filtradas';
import { PeliculaCard } from './PeliculaCard';
import { BuscadorPeliculas } from './BuscadorPeliculas';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { Button } from '@/shared/componentes/Button';
import { LayoutGrid, List } from 'lucide-react'; // Importar iconos

export function PeliculasGrid() {
  // Estado local para los filtros y vista
  const [query, setQuery] = useState('');
  const [genreId, setGenreId] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Estado de vista

  // Debounce (solo para query, dates y genre)
  const debouncedQuery = useDebounce(query, 500);
  const debouncedStartYear = useDebounce(startYear, 500);
  const debouncedEndYear = useDebounce(endYear, 500);
  // Genre se puede debouncear o no, mejor sí para consistencia si user cambia rápido
  const debouncedGenreId = useDebounce(genreId, 500);

  const handleQueryChange = (val: string) => { setQuery(val); setPage(1); };
  const handleStartYearChange = (val: string) => { setStartYear(val); setPage(1); };
  const handleEndYearChange = (val: string) => { setEndYear(val); setPage(1); };
  const handleGenreChange = (val: string) => { setGenreId(val); setPage(1); };

  const { data, isLoading, isError, error, isFetching } = usePeliculasFiltradas({
    query: debouncedQuery,
    startYear: debouncedStartYear,
    endYear: debouncedEndYear,
    genreId: debouncedGenreId,
    page: page
  });

  const getTitle = () => {
    if (debouncedQuery) return `Resultados para "${debouncedQuery}"`;
    if (debouncedGenreId) return 'Películas Filtradas por Género';
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
        genreId={genreId}
        onGenreChange={handleGenreChange}
      />

      {/* Header de la sección y Toggle */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex flex-row justify-between items-center gap-4 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-6 md:h-8 bg-indigo-500 rounded-full" />
            {getTitle()}
          </h2>
          
          {/* Toggle Grid/List */}
          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 md:p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-indigo-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              title="Vista Cuadrícula"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 md:p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-indigo-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              title="Vista Lista"
            >
              <List size={18} />
            </button>
          </div>
        </div>
        
        <p className="text-white/60 ml-4 text-sm md:text-base">
          {isFetching ? 'Actualizando resultados...' : 'Descubre las mejores historias del cine'}
        </p>
      </div>

      {/* Estado Carga Inicial */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[450px] bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20">
          <p className="text-red-400 mb-2">Error al cargar películas</p>
          <Button onClick={() => window.location.reload()} variant="outline">Reintentar</Button>
        </div>
      ) : (
        <>
          {data?.results.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              No se encontraron películas con estos criterios.
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
              : "flex flex-col gap-4"
            }>
              {data?.results.map((pelicula) => (
                <PeliculaCard key={pelicula.id} pelicula={pelicula} layout={viewMode} />
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
