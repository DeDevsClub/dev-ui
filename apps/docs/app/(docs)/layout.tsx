import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { source } from '../../lib/source';
type LayoutProps = {
  readonly children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://ui.dedevs.club'
  ),
};

const Layout = ({ children }: LayoutProps) => (
  <DocsLayout
    tree={source.pageTree}
    tabMode="navbar"
    sidebar={{ collapsible: false }}
    nav={{
      title: (
        <Image
          src="/logo.svg"
          alt="DeDevs UI"
          width={611}
          height={116}
          className="h-5 w-[105px] dark:invert"
        />
      ),
      mode: 'top',
    }}
  >
    {children}
  </DocsLayout>
);

export default Layout;
