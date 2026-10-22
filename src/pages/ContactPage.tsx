import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { validateContactForm } from '../utils/cartLogic';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#FFFFFF] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight mb-4">
            We’re Here to Help.
          </h1>
          <p className="text-sm sm:text-base text-[#686868] font-light leading-relaxed">
            Have questions regarding sizing, custom patina requests, or order status? Our shoe artisans and customer advisors are available 7 days a week.
          </p>
        </div>

        {/* 2-Column Grid: Contact Form Left, Direct Channels Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form Left (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-[#F8F7F3] border border-[#E7E3DA]">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-white border border-[#B89550] flex items-center justify-center text-[#B89550] mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-2 font-normal">
                    Inquiry Received (Demo Mode)
                  </h3>
                  <p className="text-xs text-[#686868] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-[#171717]">{formData.name}</strong>. Your message regarding "
                    {formData.subject}" has been recorded for this demo session. Since no external mail server is connected, no real email was dispatched.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-[#171717] hover:bg-[#B89550] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] pb-3 border-b border-[#E7E3DA]">
                    Send Us an Inquiry
                  </h2>

                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#686868] mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Bilal Ahmed"
                      className="w-full bg-white border border-[#E7E3DA] p-3 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-600 mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#686868] mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="bilal@example.com"
                      className="w-full bg-white border border-[#E7E3DA] p-3 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#686868] mb-1.5 font-medium">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Sizing Advice for Verona Loafers"
                      className="w-full bg-white border border-[#E7E3DA] p-3 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden transition-colors"
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-600 mt-1" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#686868] mb-1.5 font-medium">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your question or bespoke footwear request in detail..."
                      className="w-full bg-white border border-[#E7E3DA] p-3 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-600 mt-1" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#171717] hover:bg-[#B89550] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>SUBMIT INQUIRY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Channels & Atelier Info (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick WhatsApp Concierge card */}
            <div className="p-6 bg-white border border-[#B89550] relative overflow-hidden">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89550] font-bold block mb-1">
                INSTANT CONCIERGE
              </span>
              <h3 className="font-serif text-xl font-normal text-[#171717] mb-2">
                WhatsApp Live Assistance
              </h3>
              <p className="text-xs text-[#686868] mb-4 leading-relaxed">
                Connect directly with our master fitting advisor for real-time shoe recommendations and stock inquiries.
              </p>
              <a
                href="https://wa.me/923001234567?text=Hello%2C%20I%20have%20a%20question%20about%20your%20shoes."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+92 300 1234567)</span>
              </a>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-6 text-xs text-[#686868] border border-[#E7E3DA] p-6 bg-[#FFFFFF]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#171717] mb-1">
                    Flagship Atelier &amp; Showroom
                  </h4>
                  <p>42 Palm Boulevard, Gulberg III, Lahore, 54000, Pakistan</p>
                  <p className="text-[11px] text-[#A0A0A0] mt-0.5">Private fitting appointments welcome</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#171717] mb-1">
                    Electronic Mail
                  </h4>
                  <p>concierge@soleandgold.com</p>
                  <p className="text-[11px] text-[#A0A0A0] mt-0.5">Response within 4 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#171717] mb-1">
                    Telephone
                  </h4>
                  <p>+92 (042) 3578-9000 / +92 300 1234567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B89550] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#171717] mb-1">
                    Business &amp; Concierge Hours
                  </h4>
                  <p>Monday – Saturday: 10:00 AM – 9:00 PM (PKT)</p>
                  <p>Sunday: 1:00 PM – 8:00 PM (PKT)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
