'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Copy as CopyIcon } from 'lucide-react';
import { useState } from 'react';

export interface CopyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  textToCopy: string;
  textOnCopy?: string;
  successDuration?: number;
}

export const Copy = ({
  className,
  title,
  textToCopy = 'npx dedevs-ui@latest add buttons/copy',
  textOnCopy = 'Copied',
  successDuration = 1000,
  ...props
}: CopyProps) => {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), successDuration);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }

  return (
    <Button
      className={cn(
        'min-w-40 relative group',
        'bg-emerald-50 dark:bg-emerald-950',
        'hover:bg-emerald-100 dark:hover:bg-emerald-900',
        'text-emerald-600 dark:text-emerald-300',
        'border border-emerald-200 dark:border-emerald-800',
        isCopied && 'bg-emerald-100 dark:bg-emerald-900',
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      <div
        className={cn(
          'w-full flex items-center justify-center gap-2',
          'transition-transform duration-200',
          isCopied && 'scale-105'
        )}
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4 text-emerald-500" />
            <span>{textOnCopy}</span>
          </>
        ) : (
          <>
            <CopyIcon
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                'group-hover:scale-110'
              )}
            />
            <span>{title}</span>
          </>
        )}
      </div>
    </Button>
  );
};
