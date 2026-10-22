import React from 'react';
import { Award, Feather, ShieldCheck, Headphones } from 'lucide-react';

export const BrandBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Handcrafted by master cordwainers using vegetable-tanned full-grain European hides.',
    },
    {
      icon: Feather,
      title: 'Comfort-First Design',
      description: 'Anatomical memory footbeds and breathable kidskin linings for effortless all-day wear.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Reliable Cash on Delivery & encrypted bank transfers with simple 30-day size exchanges.',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Direct concierge assistance via WhatsApp and email 7 days a week from 9 AM to 9 PM.',
    },
  ];

  return (
    <section className="py-16 bg-[#FFFFFF] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-6 bg-[#F8F7F3] border border-[#E7E3DA] flex flex-col justify-start"
              >
                <div className="w-10 h-10 border border-[#B89550] flex items-center justify-center text-[#B89550] mb-4 bg-white">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#171717] mb-2 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#686868] font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
