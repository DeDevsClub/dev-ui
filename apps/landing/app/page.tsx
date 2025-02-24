// import { BenefitsSection } from '@/components/layout/sections/benefits';
// import { CommunitySection } from '@/components/layout/sections/community';
// import { ContactSection } from '@/components/layout/sections/contact';
// import { FAQSection } from '@/components/layout/sections/faq';
// import { FeaturesSection } from '@/components/layout/sections/features';
// import { FooterSection } from '@/components/layout/sections/footer';
// import { HeroSection } from '@/components/layout/sections/hero';
// import { PricingSection } from '@/components/layout/sections/pricing';
// import { ServicesSection } from '@/components/layout/sections/services';
// import { SponsorsSection } from '@/components/layout/sections/sponsors';
// import { TeamSection } from '@/components/layout/sections/team';
// import { TestimonialSection } from '@/components/layout/sections/testimonial';

import { BenefitsSection } from '@/components/layout/sections/benefits';
import { ContactSection } from '@/components/layout/sections/contact';
import { FeaturesSection } from '@/components/layout/sections/features';
import { FooterSection } from '@/components/layout/sections/footer';
import { HeroSection } from '@/components/layout/sections/hero';
import { PricingSection } from '@/components/layout/sections/pricing';
import { SponsorsSection } from '@/components/layout/sections/sponsors';
import { TeamSection } from '@/components/layout/sections/team';
import { TestimonialSection } from '@/components/layout/sections/testimonial';

export const metadata = {
  title: 'Quinx',
  description: 'Quinx is a Discord bot creation platform',
  openGraph: {
    type: 'website',
    url: 'https://github.com/dedevsclub/dedevs-ui.git',
    title: 'Quinx',
    description: 'Quinx is a Discord bot creation platform',
    images: [
      {
        url: 'https://raw.githubusercontent.com/nobruf/shadcn-landing-page/refs/heads/main/public/demo-img.jpg',
        width: 1200,
        height: 630,
        alt: 'DeDevs UI: Landing Starter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://github.com/dedevsclub/dedevs-ui.git',
    title: 'Quinx',
    description: 'Quinx is a Discord bot creation platform',
    images: [
      'https://raw.githubusercontent.com/nobruf/shadcn-landing-page/refs/heads/main/public/demo-img.jpg',
    ],
  },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      {/* <PricingSection /> */}
      {/* <TestimonialSection /> */}
      {/* <TeamSection /> */}
      {/* <ContactSection /> */}
      <FooterSection />
    </div>
  );
}
