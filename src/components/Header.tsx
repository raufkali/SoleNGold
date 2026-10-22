import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { totals, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Men', path: '/category/men' },
    { label: 'Women', path: '/category/women' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#171717] text-white text-[11px] tracking-[0.2em] uppercase py-2 px-4 text-center border-b border-[#2A2A2A]">
        <span>Complimentary Express Delivery Nationwide on Orders Above Rs. 10,000</span>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#E7E3DA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Zone 1: Brand Wordmark in Serif Face */}
            <button
              onClick={() => handleNavClick('/')}
              className="text-left group cursor-pointer focus:outline-hidden"
              aria-label="SOLE & GOLD Home"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-[#171717] uppercase block">
                SOLE <span className="text-[#B89550]">&amp;</span> GOLD
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#686868] uppercase block mt-[-3px]">
                Atelier · Footwear
              </span>
            </button>

            {/* Zone 2: 4-6 Clean Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.15em] uppercase text-[#171717]">
              {navLinks.map((link) => {
                const isActive =
                  currentPath === link.path ||
                  (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`relative py-2 transition-colors cursor-pointer focus:outline-hidden whitespace-nowrap ${
                      isActive
                        ? 'text-[#B89550] font-semibold'
                        : 'text-[#171717] hover:text-[#B89550]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B89550]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Shopping Bag */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Shopping Bag Trigger Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 text-[#171717] hover:text-[#B89550] transition-colors cursor-pointer border border-transparent hover:border-[#E7E3DA] focus:outline-hidden flex items-center gap-2"
                aria-label={`Shopping bag with ${totals.totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                <span className="hidden sm:inline text-xs tracking-wider uppercase font-medium">
                  Bag
                </span>
                <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-white bg-[#B89550] tabular-nums">
                  {totals.totalItems}
                </span>
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#171717] hover:text-[#B89550] focus:outline-hidden"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E3DA] bg-[#FFFFFF] px-6 py-6 shadow-xs animate-in fade-in duration-150">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`text-left text-sm uppercase tracking-[0.18em] py-2 flex items-center justify-between border-b border-[#F8F7F3] ${
                      isActive ? 'text-[#B89550] font-semibold' : 'text-[#171717]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#686868]" />
                  </button>
                );
              })}
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate('/cart');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#171717] text-white text-xs uppercase tracking-[0.2em] font-medium text-center hover:bg-[#B89550] transition-colors"
                >
                  View Shopping Bag ({totals.totalItems})
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
