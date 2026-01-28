'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/shared/componentes/Card';
import { Pelicula } from '../tipos';
import { API_CONFIG } from '@/shared/config/api.config';

interface PeliculaCardProps {
  pelicula: Pelicula;
}

export function PeliculaCard({ pelicula }: PeliculaCardProps) {
  const imageUrl = `${API_CONFIG.IMAGE_BASE_URL}/w500${pelicula.poster_path}`;

  return (
    <Link href={`/pelicula/${pelicula.id}`} className="block h-[450px] w-full">
    <Card className="group relative h-full w-full border-transparent hover:border-white/10 transition-colors">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={pelicula.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300" />

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-500 text-xs font-bold backdrop-blur-md border border-yellow-500/20 flex items-center gap-1">
            ★ {(pelicula.vote_average || 0).toFixed(1)}
          </span>
          <span className="text-white/60 text-xs">
            {pelicula.release_date ? new Date(pelicula.release_date).getFullYear() : 'N/A'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
          {pelicula.title}
        </h3>
        
        <p className="text-white/70 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {pelicula.overview}
        </p>
      </div>
    </Card>
    </Link>
  );
}
