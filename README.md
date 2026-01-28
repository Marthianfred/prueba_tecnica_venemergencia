# VeneMovieApp - Prueba Técnica Frontend

Aplicación web moderna para exploración de películas utilizando la API de TMDB.
Desarrollada con **Next.js 16**, **TypeScript**, **Tailwind CSS** y **TanStack Query**.

## 🚀 Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript 5+
- **Estilos**: Tailwind CSS 3.4
- **Estado Asíncrono**: TanStack Query (React Query) v5
- **Testing**: Vitest + React Testing Library
- **Iconos**: Lucide React

## 📋 Requisitos para Ejecutar

1. **Variables de Entorno**:
   Copiar `.env.example` a `.env` y agregar tu API KEY de TMDB.

   ```bash
   cp .env.example .env
   # Editar NEXT_PUBLIC_API_KEY=tu_api_key
   ```

2. **Instalar Dependencias**:

   ```bash
   npm install
   ```

3. **Correr en Desarrollo**:

   ```bash
   npm run dev
   ```

4. **Docker (Opcional)**:
   ```bash
   docker-compose up --build
   ```

## 🏗 Arquitectura y Decisiones Técnicas

### Vertical Slice Architecture (VSA)

Se adoptó una arquitectura basada en **features** en lugar de capas horizontales tradicionales.

- `src/features/peliculas`: Contiene toda la lógica relacionada con películas (componentes, hooks, servicios, tipos).
- `src/shared`: Kernel compartido con utilidades genéricas (Cliente API, Componentes base UI).

### Manejo de Estado

- **Server State**: Gestionado con TanStack Query para caché, revalidación y manejo de errores (loading, error states).
- **URL State**: Los filtros (búsqueda, año, género) se mantienen en el estado local del componente filtrado para reactividad instantánea, aunque idealmente se sincronizarían con la URL para compartir links.

### Principios SOLID

- **Single Responsibility**: Componentes pequeños y enfocados (e.g., `PeliculaCard` solo renderiza, `UsePeliculasFiltradas` solo gestiona lógica de fetch).
- **Interface Segregation**: Tipos de TypeScript estrictos para las respuestas de la API (`Pelicula`, `Actor`, etc.).

## 🔍 Endpoints Implementados (TMDB)

1. **Tendencias**: `/trending/movie/week` (Home Page)
2. **Búsqueda**: `/search/movie` (Barra con Debounce)
3. **Descubrimiento**: `/discover/movie` (Filtros de Fecha y Género)
4. **Detalle**: `/movie/{id}` + `/credits`
5. **Actor**: `/person/{id}` + `/movie_credits`
6. **Géneros**: `/genre/movie/list`

## ✅ Cobertura de Requisitos

- [x] Home con Grid de Tendencias
- [x] Buscador con Debounce
- [x] Filtros combinados (Año + Género)
- [x] Detalle de Película (Sinopsis, Cast, Runtime)
- [x] Perfil de Actor (Bio + Filmografía)
- [x] Diseño Responsivo y Premium (Glassmorphism)
- [x] Dockerización

---

Desarrollado por [Tu Nombre/Usuario] para la Prueba Técnica.
