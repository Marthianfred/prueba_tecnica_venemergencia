'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryClient } from '@/shared/lib/query-client';

interface ProveedoresProps {
  children: ReactNode;
}

export function Proveedores({ children }: ProveedoresProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
