'use client';

import { cn } from '@/lib/utils';
import { Grid } from 'lucide-react';
import type { ReactNode } from 'react';

export interface BentoGridItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

export interface BentoGridProps {
  items?: BentoGridItemProps[];
  gap?: number;
  className?: string;
}

const itemsSample: BentoGridItemProps[] = [
  {
    title: 'Bento Grid',
    description: 'A grid of items',
    icon: <Grid />,
  },
  {
    title: 'Bento Grid',
    description: 'A grid of items',
    icon: <Grid />,
  },
  {
    title: 'Bento Grid',
    description: 'A grid of items',
    icon: <Grid />,
  },
  {
    title: 'Bento Grid',
    description: 'A grid of items',
    icon: <Grid />,
  },
];

export const BentoGrid = ({
  items = itemsSample,
  gap = 3,
  className,
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 p-4 max-w-7xl mx-auto',
        `gap-${gap}`,
        className
      )}
    >
      {items.map((item, index) => (
        <BentoGridItem key={index} item={item} />
      ))}
    </div>
  );
};

export interface BentoGridItemComponentProps {
  item: BentoGridItemProps;
  className?: string;
}

export const BentoGridItem = ({
  item,
  className,
}: BentoGridItemComponentProps) => {
  return (
    <div
      className={cn(
        'group relative p-4 rounded-xl overflow-hidden transition-all duration-300',
        'border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black',
        'hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]',
        'hover:-translate-y-0.5 will-change-transform',
        item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1',
        {
          'shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5':
            item.hasPersistentHover,
          'dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]':
            item.hasPersistentHover,
        },
        className
      )}
    >
      <div
        className={`absolute inset-0 ${
          item.hasPersistentHover
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        } transition-opacity duration-300`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
      </div>

      <div className="relative flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10">
            {item.icon}
          </div>
          {item.status && (
            <span className="text-xs font-medium px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10">
              {item.status}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {item.title}
            {item.meta && (
              <span className="ml-2 text-xs text-gray-500">{item.meta}</span>
            )}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.description}
          </p>
        </div>

        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-black/5 dark:bg-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
