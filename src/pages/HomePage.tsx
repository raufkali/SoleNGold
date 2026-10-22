import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { HeroCarousel } from '../components/HeroCarousel';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { BrandBenefits } from '../components/BrandBenefits';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  // Featured products: at least 10 products
  const featuredProducts = PRODUCTS.slice(0, 10);
  // New Arrivals: 4 curated latest pairs
  const newArrivals = PRODUCTS.filter((p) => p.tag === 'NEW ARRIVAL' || p.tag === 'LIMITED EDITION').slice(0, 4);

  return (
    <div className="bg-[#FFFFFF]">
      {/* A. Hero Carousel */}
      <HeroCarousel navigate={navigate} />

      {/* B. Shop by Category */}
      <CategoryGrid navigate={navigate} />

      {/* C. Featured Products Grid (Minimum 10 unique products) */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-t border-[#E7E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E7E3DA]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
                HANDCRAFTED EDITIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#171717] font-normal tracking-tight">
                Featured Footwear
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 sm:mt-0 text-xs font-semibold tracking-[0.18em] uppercase text-[#171717] hover:text-[#B89550] transition-colors flex items-center gap-1.5 cursor-pointer group"
            >
              <span>View Full Archive</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* 4 columns on large desktop, 3 columns on medium, 2 columns on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* D. Promotional Banner */}
      <PromotionalBanner navigate={navigate} />

      {/* E. New Arrivals Dedicated Section */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E7E3DA]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
                JUST UNVEILED
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#171717] font-normal tracking-tight">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigate('/new-arrivals')}
              className="mt-4 sm:mt-0 text-xs font-semibold tracking-[0.18em] uppercase text-[#171717] hover:text-[#B89550] transition-colors flex items-center gap-1.5 cursor-pointer group"
            >
              <span>View All New Releases</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Brand Benefits */}
      <BrandBenefits />

      {/* G. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};
