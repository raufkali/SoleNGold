import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  navigate: (path: string) => void;
}

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaAction: () => void;
  secondaryCtaText?: string;
  secondaryCtaAction?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides: Slide[] = [
    {
      id: 1,
      image: '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
      badge: 'NEW SEASON / 2026 COLLECTION',
      title: 'Step Into Something Exceptional.',
      subtitle:
        'Discover footwear designed for every step of your journey — cut from hand-selected calfskin and engineered for effortless presence.',
      primaryCtaText: 'SHOP COLLECTION',
      primaryCtaAction: () => navigate('/shop'),
      secondaryCtaText: 'EXPLORE NEW ARRIVALS',
      secondaryCtaAction: () => navigate('/new-arrivals'),
    },
    {
      id: 2,
      image: '/src/assets/images/hero_loafers_editorial_1792682103010.jpg',
      badge: 'ARTISANAL TUSCAN LEATHERS',
      title: 'Everyday Style. Elevated.',
      subtitle:
        'Hand-burnished penny loafers and formal shoes bringing together heritage Italian construction, natural cork beds, and timeless silhouette.',
      primaryCtaText: 'EXPLORE THE COLLECTION',
      primaryCtaAction: () => navigate('/category/men'),
    },
    {
      id: 3,
      image: '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
      badge: 'ARCHITECTURAL EVENING EDIT',
      title: 'Made to Make an Impression.',
      subtitle:
        'Striking strap geometries, balanced block heels, and buttery kidskin linings designed for poise and all-evening comfort.',
      primaryCtaText: 'SHOP WOMEN',
      primaryCtaAction: () => navigate('/category/women'),
      secondaryCtaText: 'VIEW SNEAKERS',
      secondaryCtaAction: () => navigate('/category/sneakers'),
    },
  ];

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#171717] min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Editorial footwear hero carousel"
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with subtle editorial zoom */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Subtle luxury vignette & text legibility scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl py-16 sm:py-24">
                {/* Badge / Micro-label */}
                <div className="inline-block border border-[#B89550] px-3 py-1 bg-black/40 backdrop-blur-xs mb-4">
                  <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B89550] uppercase">
                    {slide.badge}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-5">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-[#E7E3DA] font-light leading-relaxed mb-8 max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Call To Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={slide.primaryCtaAction}
                    className="px-8 py-3.5 bg-[#B89550] hover:bg-[#96753B] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border border-[#B89550]"
                  >
                    {slide.primaryCtaText}
                  </button>

                  {slide.secondaryCtaText && slide.secondaryCtaAction && (
                    <button
                      onClick={slide.secondaryCtaAction}
                      className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border border-[#E7E3DA]"
                    >
                      {slide.secondaryCtaText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Previous / Next Arrow Controls */}
      <div className="absolute inset-y-0 left-4 z-30 hidden sm:flex items-center">
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-black/40 hover:bg-[#B89550] text-white border border-white/20 hover:border-[#B89550] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 z-30 hidden sm:flex items-center">
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-black/40 hover:bg-[#B89550] text-white border border-white/20 hover:border-[#B89550] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[3px] transition-all cursor-pointer ${
              index === currentSlide ? 'w-10 bg-[#B89550]' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
