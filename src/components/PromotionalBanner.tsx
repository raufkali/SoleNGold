import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROMOTIONAL_BANNER } from '../data/products';

interface PromotionalBannerProps {
  navigate: (path: string) => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ navigate }) => {
  const banner = PROMOTIONAL_BANNER;

  return (
    <section className="my-16 sm:my-24 bg-[#F8F7F3] border-y border-[#E7E3DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 lg:py-16">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89550]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold">
                {banner.badge}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight leading-[1.15] mb-5">
              {banner.title}
            </h2>

            <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed mb-6 max-w-xl">
              {banner.description}
            </p>

            {/* Editorial highlights / stats */}
            {banner.stats && banner.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg border-t border-[#E7E3DA] pt-6">
                {banner.stats.map((stat, i) => (
                  <div key={i}>
                    <span className="block font-serif text-2xl text-[#171717] font-medium">
                      {stat.value}
                    </span>
                    <span className="text-xs tracking-wider text-[#686868] uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {banner.primaryCta && (
                <button
                  onClick={() => navigate(banner.primaryCta.path)}
                  className="px-8 py-3.5 bg-[#171717] hover:bg-[#B89550] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border border-[#171717] hover:border-[#B89550] flex items-center gap-2 group"
                >
                  <span>{banner.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}

              {banner.secondaryCta && (
                <button
                  onClick={() => navigate(banner.secondaryCta.path)}
                  className="px-8 py-3.5 bg-transparent hover:bg-white text-[#171717] text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border border-[#E7E3DA] hover:border-black"
                >
                  {banner.secondaryCta.text}
                </button>
              )}
            </div>
          </div>

          {/* Editorial Lifestyle Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] border border-[#E7E3DA] bg-white p-2">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {banner.imageTag && (
                <div className="absolute bottom-4 right-4 bg-white/95 px-4 py-2 border border-[#E7E3DA] text-[10px] tracking-[0.2em] uppercase font-medium text-[#171717]">
                  {banner.imageTag}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
