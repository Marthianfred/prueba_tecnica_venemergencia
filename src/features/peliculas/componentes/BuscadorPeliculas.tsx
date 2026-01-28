'use client';

import { Search, Calendar } from 'lucide-react';
import { Button } from '@/shared/componentes/Button';

interface BuscadorProps {
  search: string;
  onSearchChange: (value: string) => void;
  startYear: string;
  onStartYearChange: (value: string) => void;
  endYear: string;
  onEndYearChange: (value: string) => void;
}

export function BuscadorPeliculas({
  search,
  onSearchChange,
  startYear,
  onStartYearChange,
  endYear,
  onEndYearChange,
}: BuscadorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barra de Búsqueda */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/40" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            placeholder="Buscar películas por título..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filtros de Fecha */}
        <div className="flex gap-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-white/40 group-focus-within:text-indigo-400" />
            </div>
            <input
              type="number"
              min="1900"
              max="2030"
              placeholder="Año Inicio"
              className="w-32 pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={startYear}
              onChange={(e) => onStartYearChange(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-white/40 group-focus-within:text-indigo-400" />
            </div>
            <input
              type="number"
              min="1900"
              max="2030"
              placeholder="Año Fin"
              className="w-32 pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={endYear}
              onChange={(e) => onEndYearChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
