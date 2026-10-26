import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryGridProps {
  navigate: (path: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ navigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E7E3DA]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
              CURATED SILHOUETTES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="mt-4 sm:mt-0 text-xs font-semibold tracking-[0.18em] uppercase text-[#171717] hover:text-[#B89550] transition-colors flex items-center gap-1.5 self-start cursor-pointer group"
          >
            <span>Explore All Footwear</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4 Rectangular Image Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(category.path || `/category/${category.id}`)}
              className="group relative h-[380px] sm:h-[420px] overflow-hidden bg-[#F8F7F3] border border-[#E7E3DA] cursor-pointer flex flex-col justify-end p-6"
            >
              {/* Background Product Image with subtle scale on hover */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Scrim for readable high-contrast typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Tile Content */}
              <div className="relative z-10 text-white">
                <span className="text-[11px] tracking-[0.2em] text-[#E7E3DA] uppercase font-light block mb-1">
                  {category.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white mb-3">
                  {category.title}
                </h3>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B89550] group-hover:text-white transition-colors">
                  <span>DISCOVER</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
