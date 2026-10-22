import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171717] text-white border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] uppercase text-white block mb-3">
              SOLE <span className="text-[#B89550]">&amp;</span> GOLD
            </span>
            <p className="text-xs text-[#A0A0A0] leading-relaxed mb-6 max-w-sm">
              Artisanal luxury footwear designed with architectural restraint and hand-buffed European leathers. Every pair is crafted to accompany your journey with understated elegance.
            </p>
            <div className="text-xs text-[#E7E3DA] space-y-1">
              <p>Atelier: 42 Palm Boulevard, Gulberg III, Lahore, Pakistan</p>
              <p>Concierge WhatsApp: +92 300 1234567</p>
              <p>Email: concierge@soleandgold.com</p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89550] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A0A0]">
              <li>
                <button
                  onClick={() => navigate('/shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category/men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category/women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category/sneakers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Sneakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category/formal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Formal &amp; Black Tie
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/new-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89550] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A0A0]">
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size &amp; Fit Advisory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Domestic &amp; Global Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns &amp; 30-Day Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Leather Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Back to Top */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89550] mb-4">
              Follow Us
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A0A0] mb-6">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram / @soleandgold
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook / SoleGoldAtelier
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Pinterest Lookbook
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#B89550] hover:text-white transition-colors cursor-pointer border border-[#2A2A2A] hover:border-[#B89550] px-3 py-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2A2A2A] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A0A0A0] gap-4">
          <p>© 2026 SOLE &amp; GOLD ATELIER. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/contact')}>
              Privacy Policy
            </span>
            <span>·</span>
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/contact')}>
              Terms of Service
            </span>
            <span>·</span>
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/contact')}>
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
