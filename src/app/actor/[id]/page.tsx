'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDetalleActor } from '@/features/peliculas/hooks/use-detalle-actor';
import { API_CONFIG } from '@/shared/config/api.config';
import { PeliculaCard } from '@/features/peliculas/componentes/PeliculaCard';

export default function PaginaDetalleActor() {
  const params = useParams();
  const actorId = Number(params.id);
  const { data, isLoading, isError } = useDetalleActor(actorId);

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
        <h2 className="text-2xl font-bold mb-4">Actor no encontrado</h2>
        <Link href="/" className="text-indigo-400 hover:text-indigo-300">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const { perfil, peliculas } = data;
  const profileUrl = perfil.profile_path
    ? `${API_CONFIG.IMAGE_BASE_URL}/h632${perfil.profile_path}`
    : null;

  // Ordenar películas por popularidad o fecha
  const peliculasOrdenadas = [...peliculas].sort((a, b) => b.vote_average - a.vote_average);

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Botón Volver */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors border border-white/10"
        >
          <ArrowLeft size={18} />
          <span>Inicio</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Columna Izquierda: Foto y Datos Personales */}
          <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl mb-6 bg-white/5 border border-white/10">
                {profileUrl ? (
                  <Image
                    src={profileUrl}
                    alt={perfil.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-white/20 text-3xl font-bold">
                     ?
                   </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{perfil.name}</h1>
              
              <div className="space-y-3 text-sm text-white/70">
                {perfil.birthday && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-400" />
                    <span>Nacido: {new Date(perfil.birthday).toLocaleDateString()}</span>
                  </div>
                )}
                {perfil.place_of_birth && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-400" />
                    <span>{perfil.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Biografía y Filmografía */}
          <div className="flex-1">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-l-4 border-indigo-500 pl-4">Biografía</h2>
              <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed">
                {perfil.biography ? (
                  perfil.biography.split('\n\n').map((parrafo, i) => (
                    <p key={i} className="mb-4">{parrafo}</p>
                  ))
                ) : (
                  <p className="italic text-white/40">No hay biografía disponible.</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-indigo-500 pl-4">
                Filmografía Conocida ({peliculas.length})
              </h2>
              
              {peliculas.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {peliculasOrdenadas.map((pelicula) => (
                   <PeliculaCard key={pelicula.id} pelicula={pelicula} />
                 ))}
                </div>
              ) : (
                <p className="text-white/40">No se encontraron películas para este actor.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
