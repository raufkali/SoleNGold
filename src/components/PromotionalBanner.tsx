import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PromotionalBannerProps {
  navigate: (path: string) => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ navigate }) => {
  return (
    <section className="my-16 sm:my-24 bg-[#F8F7F3] border-y border-[#E7E3DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 lg:py-16">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89550]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold">
                THE SEASONAL EDIT
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight leading-[1.15] mb-5">
              A Better Step Starts Here.
            </h2>

            <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed mb-6 max-w-xl">
              Discover your next favorite pair in our latest collection. Every shoe is shaped on anatomical lasts, using full-grain leathers sourced from historic European tanneries, finished with artisanal hand-buffing.
            </p>

            {/* Editorial highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg border-t border-[#E7E3DA] pt-6">
              <div>
                <span className="block font-serif text-2xl text-[#171717] font-medium">100%</span>
                <span className="text-xs tracking-wider text-[#686868] uppercase">Full-Grain Italian Leather</span>
              </div>
              <div>
                <span className="block font-serif text-2xl text-[#171717] font-medium">30-Day</span>
                <span className="text-xs tracking-wider text-[#686868] uppercase">Complimentary Sizing Exchange</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-3.5 bg-[#171717] hover:bg-[#B89550] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border border-[#171717] hover:border-[#B89550] flex items-center gap-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate('/category/formal')}
                className="px-8 py-3.5 bg-transparent hover:bg-white text-[#171717] text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border border-[#E7E3DA] hover:border-black"
              >
                VIEW FORMAL CRAFT
              </button>
            </div>
          </div>

          {/* Editorial Lifestyle Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] border border-[#E7E3DA] bg-white p-2">
              <img
                src="/src/assets/images/promo_craftsmanship_1792682103600.jpg"
                alt="Atelier shoe crafting workbench with master leather artisan"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 bg-white/95 px-4 py-2 border border-[#E7E3DA] text-[10px] tracking-[0.2em] uppercase font-medium text-[#171717]">
                HANDCRAFTED ATELIER · 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
