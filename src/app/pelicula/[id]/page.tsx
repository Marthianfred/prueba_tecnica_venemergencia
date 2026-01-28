'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDetallePelicula } from '@/features/peliculas/hooks/use-detalle-pelicula';
import { API_CONFIG } from '@/shared/config/api.config';
import { Card } from '@/shared/componentes/Card';

export default function PaginaDetallePelicula() {
  const params = useParams();
  const movieId = Number(params.id);
  const { data, isLoading, isError } = useDetallePelicula(movieId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Película no encontrada</h2>
        <Link href="/" className="text-indigo-400 hover:text-indigo-300">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const { detalle, reparto } = data;
  const backdropUrl = detalle.backdrop_path 
    ? `${API_CONFIG.IMAGE_BASE_URL}/original${detalle.backdrop_path}`
    : null;
  const posterUrl = detalle.poster_path
    ? `${API_CONFIG.IMAGE_BASE_URL}/w500${detalle.poster_path}`
    : null;

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero Section con Backdrop */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={detalle.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
        
        {/* Botón Volver */}
        <div className="absolute top-6 left-6 z-10">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors border border-white/10"
          >
            <ArrowLeft size={18} />
            <span>Volver</span>
          </Link>
        </div>

        {/* Info Principal Superpuesta */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
            {/* Poster Flotante */}
            <div className="hidden md:block w-64 aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl border border-white/10 transform translate-y-12">
               {posterUrl && (
                <Image
                  src={posterUrl}
                  alt={detalle.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Metadatos Texto */}
            <div className="flex-1 space-y-4 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                {detalle.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/80">
                <span className="flex items-center gap-1 text-yellow-500 font-bold px-2 py-1 bg-yellow-500/10 rounded-md border border-yellow-500/20">
                  <Star size={16} fill="currentColor" /> {detalle.vote_average.toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {new Date(detalle.release_date).getFullYear()}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {detalle.genres?.map((genre) => (
                    <span key={genre.id} className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-white/70">
                       {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
                {detalle.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Secundario */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="md:ml-[280px]"> {/* Margen para alinear con el contenido a la derecha del poster */}
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Reparto Principal <span className="text-indigo-500">★</span>
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {reparto.slice(0, 10).map((actor) => (
              <Link href={`/actor/${actor.id}`} key={actor.id}>
                <Card className="h-full hover:bg-white/5 transition-colors group cursor-pointer border-transparent hover:border-white/10">
                  <div className="aspect-[2/3] relative rounded-t-xl overflow-hidden bg-white/5">
                    {actor.profile_path ? (
                      <Image
                        src={`${API_CONFIG.IMAGE_BASE_URL}/w185${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                       <div className="absolute inset-0 flex items-center justify-center text-white/20">
                         Sin Foto
                       </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-sm truncate text-white group-hover:text-indigo-400 transition-colors">{actor.name}</p>
                    <p className="text-xs text-white/50 truncate">{actor.character}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
