import { Mail, Phone, MapPin, Heart, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import UnixaBrand from '../common/UnixaBrand';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-8 md:px-24 relative overflow-hidden bg-[var(--color-secondary)] text-white/80">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent"></div>

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[var(--color-primary)]/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-1">
                <img src="/sks-logo.png" alt="UNIXA" className="w-16 h-16 object-contain" />
              </div>
              <div>
                <UnixaBrand className="text-4xl" color="white" />
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">Pure Water Solutions</p>
              </div>
            </div>

            <p className="text-xl leading-relaxed text-slate-300 max-w-md font-medium">
              Revolutionizing hydration with premium technology. We bring the longevity of advanced water purification to every Indian household.
            </p>

            <div className="flex gap-5">
              {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:-translate-y-2 text-white group"
                >
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-10 lg:col-span-2">
            <div>
              <h4 className="!text-white font-black mb-10 uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[var(--color-primary)]"></span> Company
              </h4>
              <ul className="space-y-5">
                {['Home', 'Purifiers', 'Technology', 'Reviews', 'Support'].map((link) => (
                  <li key={link}>
                    <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-base font-bold text-slate-200 hover:text-[var(--color-primary)] transition-all no-underline flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-3 transition-all"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="!text-white font-black mb-10 uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[var(--color-primary)]"></span> Legal
              </h4>
              <ul className="space-y-5">
                {['Shipping Policy', 'Return Policy', 'Terms of Service', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-base font-bold text-slate-200 hover:text-[var(--color-primary)] transition-all no-underline flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-3 transition-all"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="py-12 border-y border-white/10 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-[var(--color-primary)] border border-blue-500/20 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
              <Mail size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1">Email Support</p>
              <a href="mailto:info@unixa.com" className="text-lg font-bold text-white hover:text-[var(--color-primary)] transition-colors">info@unixa.com</a>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all">
              <Phone size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-400 mb-1">Toll Free</p>
              <a href="tel:+911800123456" className="text-lg font-bold text-white hover:text-[var(--color-primary)] transition-colors">+91 1800-123-456</a>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-1">Headquarters</p>
              <p className="text-lg font-bold text-white leading-tight">Industrial Area, New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
          <p className="text-sm font-bold text-slate-300">
            © {new Date().getFullYear()} <UnixaBrand className="text-sm" color="white" />. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500 font-medium">Crafted with</span>
            <Heart size={18} className="text-red-500 fill-red-500 animate-pulse" />
            <span className="text-slate-500 font-bold">by</span>
            <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-black text-lg hover:underline transition-all">
              #TeamDigicoders
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;