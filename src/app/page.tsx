import { PeliculasGrid } from '@/features/peliculas/componentes/PeliculasGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white selection:bg-indigo-500/30">
      {/* Hero / Header Section */}
      <header className="relative py-20 px-6 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            VeneMovieApp
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Descubre las películas más populares y en tendencia del momento con una experiencia visual premium.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <PeliculasGrid />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">
            © 2026 VeneMovieApp. Desarrollado por <span className="text-white/60 font-semibold">Marthianfred</span>.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm font-medium">Data provided by TMDB</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
