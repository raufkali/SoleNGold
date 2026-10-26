import React from 'react';
import { Award, Feather, ShieldCheck, Headphones, Sparkles, Truck, CheckCircle, LucideIcon } from 'lucide-react';
import { BRAND_BENEFITS, BrandBenefit } from '../data/products';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Feather,
  ShieldCheck,
  Headphones,
  Sparkles,
  Truck,
  CheckCircle,
};

export const BrandBenefits: React.FC = () => {
  const benefits: BrandBenefit[] = BRAND_BENEFITS;

  return (
    <section className="py-16 bg-[#FFFFFF] border-b border-[#E7E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Award;
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
