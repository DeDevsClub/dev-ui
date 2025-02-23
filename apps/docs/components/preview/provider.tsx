'use client';

import { SandboxProvider } from '@repo/sandbox';
import { useTheme } from 'next-themes';
import type { ComponentProps } from 'react';

type PreviewProviderProps = Omit<
  ComponentProps<typeof SandboxProvider>,
  'theme'
>;

export const PreviewProvider = ({
  options,
  ...props
}: PreviewProviderProps) => {
  const { theme } = useTheme();
  const darkTheme = theme === 'dark' ? 'dark' : 'dark';

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <SandboxProvider
      theme={darkTheme}
      {...props}
      options={{
        ...options,
        externalResources: [
          ...(options?.externalResources || []),
          new URL('/preview/shadcn.css', window.location.origin).toString(),
          new URL(
            '/preview/tailwind-config.js',
            window.location.origin
          ).toString(),
        ],
      }}
    />
  );
};
