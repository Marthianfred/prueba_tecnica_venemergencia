import { render, screen } from '@testing-library/react';
import { PeliculasGrid } from './PeliculasGrid';
import { expect, test, vi } from 'vitest';
import * as usePeliculasFiltradasModule from '../hooks/use-peliculas-filtradas';

// Mock de useDebounce para que retorne el valor inmediatamente
vi.mock('@/shared/hooks/use-debounce', () => ({
  useDebounce: (val: any) => val,
}));

// Mock del componente hijo complejo para aislar el test del Grid
vi.mock('./BuscadorPeliculas', () => ({
  BuscadorPeliculas: () => <div data-testid="buscador-mock">Buscador</div>,
}));

vi.mock('./PeliculaCard', () => ({
  PeliculaCard: ({ pelicula }: any) => <div>{pelicula.title}</div>,
}));

test('PeliculasGrid muestra estado de carga', () => {
  vi.spyOn(usePeliculasFiltradasModule, 'usePeliculasFiltradas').mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
    isFetching: true,
  } as any);

  render(<PeliculasGrid />);
  // Buscamos elementos que indiquen carga (clase animate-pulse usada en el skeleton)
  // O verificamos que no hay películas
  const skeletons = document.getElementsByClassName('animate-pulse');
  expect(skeletons.length).toBeGreaterThan(0);
});

test('PeliculasGrid muestra películas cuando hay datos', () => {
  const mockData = {
    results: [
      { id: 1, title: 'Test Movie 1', poster_path: '/p1.jpg', vote_average: 8, release_date: '2022' },
      { id: 2, title: 'Test Movie 2', poster_path: '/p2.jpg', vote_average: 7, release_date: '2023' }
    ],
    total_pages: 1,
  };

  vi.spyOn(usePeliculasFiltradasModule, 'usePeliculasFiltradas').mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
    error: null,
    isFetching: false,
  } as any);

  render(<PeliculasGrid />);
  
  expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
});
