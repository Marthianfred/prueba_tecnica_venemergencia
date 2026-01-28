'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/shared/componentes/Card';
import { Pelicula } from '../tipos';
import { API_CONFIG } from '@/shared/config/api.config';

interface PeliculaCardProps {
  pelicula: Pelicula;
  layout?: 'grid' | 'list';
}

export function PeliculaCard({ pelicula, layout = 'grid' }: PeliculaCardProps) {
  const imageUrl = pelicula.poster_path 
    ? `${API_CONFIG.IMAGE_BASE_URL}/w500${pelicula.poster_path}`
    : API_CONFIG.PLACEHOLDER_IMAGE;

  if (layout === 'list') {
    return (
      <Link href={`/pelicula/${pelicula.id}`} className="block w-full group">
        <Card className="flex flex-row h-48 w-full border-white/5 bg-white/5 overflow-hidden hover:border-indigo-500/50 hover:bg-white/10 transition-all">
          {/* Imagen */}
          <div className="relative w-32 h-full flex-shrink-0">
             <Image 
              src={imageUrl} 
              alt={pelicula.title} 
              fill 
              sizes="200px" 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          
          {/* Info */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {pelicula.title}
            </h3>
            
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-500 text-xs font-bold border border-yellow-500/20">
                ★ {(pelicula.vote_average || 0).toFixed(1)}
              </span>
              <span className="text-white/60 text-sm">
                 {pelicula.release_date ? new Date(pelicula.release_date).getFullYear() : 'N/A'}
              </span>
            </div>

            <p className="text-white/70 text-sm line-clamp-2 md:line-clamp-3">
              {pelicula.overview || 'Sin descripción disponible.'}
            </p>
          </div>
        </Card>
      </Link>
    );
  }

  // Layout Grid (Original)
  return (
    <Link href={`/pelicula/${pelicula.id}`} className="block h-[450px] w-full">
      <Card className="group relative h-full w-full border-transparent hover:border-white/10 transition-colors overflow-hidden rounded-xl bg-[#18181b]">
        <Image 
          src={imageUrl} 
          alt={pelicula.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-500 text-xs font-bold backdrop-blur-md border border-yellow-500/20 flex items-center gap-1">
              ★ {(pelicula.vote_average || 0).toFixed(1)}
            </span>
            <span className="text-white/60 text-xs">
              {pelicula.release_date ? new Date(pelicula.release_date).getFullYear() : 'N/A'}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {pelicula.title}
          </h3>
        </div>
      </Card>
    </Link>
  );
}
