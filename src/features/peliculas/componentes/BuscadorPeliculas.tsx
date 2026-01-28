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
  // Generar años desde 2030 hasta 1900
  const years = Array.from({ length: 131 }, (_, i) => 2030 - i);

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
            className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
            placeholder="Buscar películas por título..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filtros de Fecha (Selects) */}
        <div className="flex gap-2">
          {/* Año Inicio */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Calendar className="h-4 w-4 text-white/40 group-focus-within:text-indigo-400" />
            </div>
            <select
              value={startYear}
              onChange={(e) => {
                const val = e.target.value;
                onStartYearChange(val);
                if (endYear && val > endYear) {
                   onEndYearChange(val); 
                }
              }}
              className="w-36 pl-10 pr-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="" className="bg-[#0a0a0b] text-white/60">Desde</option>
              {years.map(year => (
                <option key={`start-${year}`} value={year} className="bg-[#0a0a0b]">
                  {year}
                </option>
              ))}
            </select>
            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>

          {/* Año Fin */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Calendar className="h-4 w-4 text-white/40 group-focus-within:text-indigo-400" />
            </div>
            <select
              value={endYear}
              onChange={(e) => {
                const val = e.target.value;
                onEndYearChange(val);
                if (startYear && val < startYear) {
                    onStartYearChange(val);
                }
              }}
              className="w-36 pl-10 pr-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer hover:bg-white/10"
            >
              <option value="" className="bg-[#0a0a0b] text-white/60">Hasta</option>
              {years.map(year => (
                <option 
                  key={`end-${year}`} 
                  value={year} 
                  className="bg-[#0a0a0b]"
                  disabled={startYear ? parseInt(String(year)) < parseInt(startYear) : false}
                >
                  {year}
                </option>
              ))}
            </select>
             {/* Custom Arrow */}
             <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
