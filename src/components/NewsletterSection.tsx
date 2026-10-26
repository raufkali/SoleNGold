import React, { useState } from 'react';
import { validateEmail } from '../utils/cartLogic';
import { Check, Mail } from 'lucide-react';
import { NEWSLETTER } from '../data/products';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#F8F7F3] border-b border-[#E7E3DA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
          {NEWSLETTER.badge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight mb-4">
          {NEWSLETTER.title}
        </h2>
        <p className="text-sm text-[#686868] max-w-lg mx-auto mb-8 font-light leading-relaxed">
          {NEWSLETTER.description}
        </p>

        {submitted ? (
          <div className="p-6 bg-white border border-[#B89550] inline-flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-[#B89550] text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                {NEWSLETTER.successMessage}
              </p>
              <p className="text-xs text-[#686868]">
                {NEWSLETTER.disclaimer}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-0 border border-[#E7E3DA] bg-white focus-within:border-[#B89550] transition-colors">
              <div className="relative flex-1 flex items-center pl-3">
                <Mail className="w-4 h-4 text-[#686868] shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full py-3.5 px-3 text-xs text-[#171717] placeholder-[#686868]/70 focus:outline-hidden bg-transparent"
                  aria-label="Email Address for Newsletter"
                />
              </div>
              <button
                type="submit"
                className="py-3.5 px-6 bg-[#171717] hover:bg-[#B89550] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors shrink-0 cursor-pointer"
              >
                {NEWSLETTER.buttonText}
              </button>
            </div>

            {error && (
              <p className="text-[11px] text-red-600 mt-2 text-left" role="alert">
                {error}
              </p>
            )}

            <p className="text-[11px] text-[#A0A0A0] mt-3 tracking-wide">
              {NEWSLETTER.disclaimer}
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
