import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND, CONTACT, NAVIGATION, FOOTER_DATA, SOCIAL_LINKS } from '../data/products';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [logoLoadError, setLogoLoadError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLogo = BRAND.logoLightUrl || BRAND.logoUrl;

  return (
    <footer className="bg-[#171717] text-white border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <button
              onClick={() => {
                navigate('/');
                scrollToTop();
              }}
              className="text-left cursor-pointer focus:outline-hidden mb-4 block"
              aria-label={`${BRAND.displayName} Home`}
            >
              <div className="flex items-center gap-3">
                {footerLogo && !logoLoadError && (
                  <img
                    src={footerLogo}
                    alt={BRAND.logoAlt || BRAND.displayName}
                    className="h-9 w-9 sm:h-10 sm:w-10 object-cover rounded-full border border-[#B89550]/50 shrink-0"
                    onError={() => setLogoLoadError(true)}
                  />
                )}
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] uppercase text-white block">
                  {BRAND.wordmarkPrefix}{' '}
                  <span className="text-[#B89550]">{BRAND.wordmarkAccent}</span>{' '}
                  {BRAND.wordmarkSuffix}
                </span>
              </div>
            </button>

            <p className="text-xs text-[#A0A0A0] leading-relaxed mb-6 max-w-sm">
              {FOOTER_DATA.aboutText}
            </p>

            <div className="text-xs text-[#E7E3DA] space-y-1">
              <p>Atelier: {CONTACT.atelierAddress}</p>
              <p>
                Concierge WhatsApp:{' '}
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B89550] transition-colors"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-[#B89550] transition-colors"
                >
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89550] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A0A0]">
              {NAVIGATION.footerCollections.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89550] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A0A0]">
              {NAVIGATION.footerClientCare.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Back to Top */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89550] mb-4">
              Follow Us
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A0A0A0] mb-6">
              {SOCIAL_LINKS.instagram && (
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram / @soleandgold
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.facebook && (
                <li>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook / SoleGoldAtelier
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.pinterest && (
                <li>
                  <a
                    href={SOCIAL_LINKS.pinterest}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Pinterest Lookbook
                  </a>
                </li>
              )}
              {SOCIAL_LINKS.twitter && (
                <li>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    X / Twitter
                  </a>
                </li>
              )}
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
          <p>{FOOTER_DATA.copyright}</p>
          <div className="flex items-center gap-6">
            <span
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                navigate('/contact');
                scrollToTop();
              }}
            >
              Privacy Policy
            </span>
            <span>·</span>
            <span
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                navigate('/contact');
                scrollToTop();
              }}
            >
              Terms of Service
            </span>
            <span>·</span>
            <span
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                navigate('/contact');
                scrollToTop();
              }}
            >
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
