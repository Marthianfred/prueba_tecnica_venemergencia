# 🎬 MovieApp - Prueba Técnica Frontend

Aplicación web moderna para la exploración de películas, filtrado por géneros/años y consulta de detalles técnicos y de elenco, desarrollada como parte de un reto técnico.

## 📋 Objetivo

[cite_start]Construir una interfaz limpia, legible y creativa utilizando la API de TMDB, aplicando buenas prácticas de arquitectura de software, principios SOLID y manejo eficiente de estados asíncronos[cite: 2, 3, 13].

## 🛠 Tech Stack

El proyecto ha sido construido utilizando las siguientes tecnologías y librerías, cumpliendo con los requisitos mínimos y recomendaciones:

- [cite_start]**Core:** React (v19+) con TypeScript[cite: 6].
- [cite_start]**Estilos:** Tailwind CSS (Recomendado) / Styled Components[cite: 7].
- [cite_start]**Estado Global:** Zustand / Redux[cite: 8].
- [cite_start]**Data Fetching:** TanStack Query (React Query)[cite: 9].
- [cite_start]**Enrutamiento:** React Router[cite: 87].
- [cite_start]**Containerización (Opcional):** Docker[cite: 10].

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd movie-app
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto basándote en el `.env.example`.

    > [cite_start]**Nota:** La API Key no debe estar hardcodeada en el código principal[cite: 90].

    ```env
    VITE_TMDB_API_KEY=3fd2be6f0c70a2a598f084ddfb75487c
    VITE_BASE_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)
    ```

4.  **Ejecutar en desarrollo:**

    ```bash
    npm run dev
    ```

5.  **Ejecutar con Docker (Opcional):**
    ```bash
    docker-compose up --build
    ```

---

## ✨ Funcionalidades Implementadas

### 1. 🏠 Catálogo Principal (Home)

- [cite_start]Grid responsive de películas en tendencia de la semana[cite: 16].
- [cite_start]Cards informativas con póster, título y año de lanzamiento[cite: 17].

### 2. 🔍 Buscador y Filtros Avanzados

- [cite_start]**Buscador:** Búsqueda por título con implementación de **debounce** para optimizar llamadas a la API[cite: 19, 77].
- **Filtros Combinados:** Permite filtrar resultados simultáneamente por:
  - [cite_start]Género (Acción, Comedia, etc.)[cite: 21].
  - [cite_start]Rango de años (Fecha de inicio - Fecha fin)[cite: 22].

### 3. 🎞 Detalle de Película

Vista detallada (Modal o Página) que incluye:

- [cite_start]Sinopsis (Overview)[cite: 25].
- [cite_start]Elenco principal (Cast) con fotografías[cite: 26].
- [cite_start]Metadata técnica: Duración, géneros y puntuación[cite: 27].

### 4. 👤 Perfil de Actor (Opcional)

- [cite_start]Biografía del actor/actriz[cite: 30].
- [cite_start]Filmografía relacionada[cite: 31].

---

## 📡 Integración con TMDB API

A continuación se detallan los endpoints utilizados. Todos utilizan la `BASE_URL` configurada.

### 1. Tendencias (Home)

Obtiene películas populares de la semana con paginación.

```http
GET /trending/movie/week?api_key={API_KEY}&page={pageParam}
```
