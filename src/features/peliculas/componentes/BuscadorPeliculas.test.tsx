import { render, screen, fireEvent } from '@testing-library/react';
import { BuscadorPeliculas } from './BuscadorPeliculas';
import { expect, test, vi } from 'vitest';

test('BuscadorPeliculas renderiza inputs y permite escribir', () => {
  const mockOnSearchChange = vi.fn();
  const mockOnStartYearChange = vi.fn();
  const mockOnEndYearChange = vi.fn();

  render(
    <BuscadorPeliculas
      search=""
      onSearchChange={mockOnSearchChange}
      startYear=""
      onStartYearChange={mockOnStartYearChange}
      endYear=""
      onEndYearChange={mockOnEndYearChange}
    />
  );

  const searchInput = screen.getByPlaceholderText('Buscar películas por título...');
  fireEvent.change(searchInput, { target: { value: 'Matrix' } });
  expect(mockOnSearchChange).toHaveBeenCalledWith('Matrix');
});

test('BuscadorPeliculas: Selects de año funcionan correctamente', () => {
  const mockOnStartYearChange = vi.fn();
  
  render(
    <BuscadorPeliculas
      search=""
      onSearchChange={() => {}}
      startYear=""
      onStartYearChange={mockOnStartYearChange}
      endYear=""
      onEndYearChange={() => {}}
    />
  );

  // Encontrar el combobox de "Desde" por su opción placeholder implícita
  // O mejor, por el valor mostrado si fuera controlado, pero aquí buscamos por rol o texto
  // Dado que son selects nativos, usamos getByRole 'combobox' pero hay 2.
  // Buscaremos por texto de la opción default para ubicar el select específico
  // O podemos añadir aria-labels a los componentes para facilitar el testing.
  
  // Por ahora, añadiremos testIds o aria-label en el componente si fuera necesario, 
  // pero intentemos seleccionar por display value si es posible, o asumimos orden.
  
  const selects = screen.getAllByRole('combobox');
  const startYearSelect = selects[0]; // Asumimos orden visual
  
  fireEvent.change(startYearSelect, { target: { value: '2020' } });
  expect(mockOnStartYearChange).toHaveBeenCalledWith('2020');
});
