import { render, screen } from '@testing-library/react';
import { PeliculaCard } from './PeliculaCard';
import { Pelicula } from '../tipos';
import { expect, test, vi } from 'vitest';

// Mock de API_CONFIG
vi.mock('@/shared/config/api.config', () => ({
  API_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  },
}));

const mockPelicula: Pelicula = {
  id: 1,
  title: 'Película de Prueba',
  overview: 'Esta es una descripción de prueba.',
  poster_path: '/path.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  genre_ids: [1, 2],
};

test('PeliculaCard renderiza el título y la puntuación correctamente', () => {
  render(<PeliculaCard pelicula={mockPelicula} />);
  
  expect(screen.getByText('Película de Prueba')).toBeInTheDocument();
  expect(screen.getByText('★ 8.5')).toBeInTheDocument();
  expect(screen.getByText(/2024|2023/)).toBeInTheDocument();
});
