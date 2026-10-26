import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT, BRAND } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const waUrl =
    CONTACT.whatsappUrl ||
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
      CONTACT.whatsappPrefilledMessage || 'Hello, I have a question about your shoes.'
    )}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Label */}
      <span
        className={`hidden sm:inline-block bg-[#171717] text-white text-[11px] font-medium uppercase tracking-[0.18em] px-3 py-2 border border-[#E7E3DA]/30 shadow-md transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us
      </span>

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 border border-white/20 focus:outline-hidden"
        aria-label={`Chat with ${BRAND.displayName} on WhatsApp`}
        title={`Chat with ${BRAND.displayName} on WhatsApp`}
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </div>
  );
};
