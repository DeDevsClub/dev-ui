import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FooterProps {
  className?: string;
  sections?: Section[];
  companyName?: string;
}

interface Section {
  title: string;
  links: LinkItem[];
}

interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

function Footer({
  className,
  sections = [],
  companyName = 'DeDevs Club',
}: FooterProps) {
  return (
    <footer className={cn('bg-gray-900 text-white py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
