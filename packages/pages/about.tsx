import React from 'react';
import type { FC } from 'react';

export interface AboutProps {
  title: string;
  mission: string;
  description: string;
}

export const About: FC<AboutProps> = ({ title, mission, description }) => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl mb-8">{mission}</p>
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </section>
  );
};

// Usage example
// <About
//   title="About Quinx"
//   mission="Quinx was founded with a simple mission: to democratize Discord bot creation. We believe that everyone should have the power to enhance their Discord communities, regardless of their coding skills."
//   description="Our platform combines cutting-edge technology with an intuitive interface, allowing you to build sophisticated bots that would typically require extensive programming knowledge. With Quinx, you're limited only by your imagination."
// />
