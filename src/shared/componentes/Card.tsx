import { HTMLAttributes } from 'react';
import { cn } from '@/shared/utilidades/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, children, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300',
        hover && 'hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
