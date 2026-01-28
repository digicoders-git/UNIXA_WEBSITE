import { Mail, Phone, MapPin, Heart, Shield, FileText, Link as LinkIcon, Youtube, Instagram, MessageCircle, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-12 pb-4 px-8 md:px-24 relative overflow-hidden" style={{ backgroundColor: `var(--color-dark)`, color: `var(--color-text-muted)` }}>
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-50" style={{ background: `linear-gradient(to right, transparent, var(--color-secondary), transparent)` }}></div>
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-bubble footer-bubble-1"></div>
        <div className="footer-bubble footer-bubble-2"></div>
        <div className="footer-bubble footer-bubble-3"></div>
        <div className="footer-bubble footer-bubble-4"></div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .footer-bubble {
            position: absolute;
            background: rgba(6, 182, 212, 0.05);
            border-radius: 50%;
            animation: float-footer-bubble 23s infinite ease-in-out;
          }
          .footer-bubble-1 { width: 100px; height: 100px; left: 10%; top: 20%; animation-delay: 0s; }
          .footer-bubble-2 { width: 140px; height: 140px; right: 15%; top: 30%; animation-delay: 4.5s; }
          .footer-bubble-3 { width: 80px; height: 80px; left: 20%; bottom: 20%; animation-delay: 2.5s; }
          .footer-bubble-4 { width: 120px; height: 120px; right: 25%; bottom: 10%; animation-delay: 6.5s; }
          @keyframes float-footer-bubble {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            50% { transform: translate(25px, -35px) scale(1.1); opacity: 0.5; }
          }
        `
      }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <img src="/sks-logo.png" alt="UNIXA Logo" className="w-12 h-12" />
              <h3 className="text-2xl font-bold" style={{ color: `var(--color-secondary)`, fontFamily: `var(--font-heading)` }}>UNIXA</h3>
            </div>
            <p className="mb-4 leading-relaxed max-w-md" style={{ color: `var(--color-text-muted)` }}>
              Leading provider of advanced water purification systems. We ensure pure, safe, and healthy water for your family with cutting-edge RO and UV technology.
            </p>
            <p className="text-sm italic mb-6" style={{ color: `var(--color-secondary)`, opacity: 0.7 }}>
              "Pure water, pure life - UNIXA's commitment to your health."
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(248, 250, 252, 0.05)', border: '1px solid rgba(248, 250, 252, 0.1)', color: `var(--color-surface)` }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-secondary)';
                  e.target.style.color = 'var(--color-dark)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.05)';
                  e.target.style.color = 'var(--color-surface)';
                }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(248, 250, 252, 0.05)', border: '1px solid rgba(248, 250, 252, 0.1)', color: `var(--color-surface)` }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-secondary)';
                  e.target.style.color = 'var(--color-dark)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.05)';
                  e.target.style.color = 'var(--color-surface)';
                }}
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: 'rgba(248, 250, 252, 0.05)', border: '1px solid rgba(248, 250, 252, 0.1)', color: `var(--color-surface)` }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-secondary)';
                  e.target.style.color = 'var(--color-dark)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.05)';
                  e.target.style.color = 'var(--color-surface)';
                }}
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: `var(--color-secondary)` }}>
              <LinkIcon className="w-5 h-5" style={{ color: `var(--color-secondary)` }} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="transition-colors no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Home</Link></li>
              <li><Link to="/about" className="transition-colors no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>About Us</Link></li>
              <li><Link to="/laddus" className="transition-colors no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Our Products</Link></li>
              <li><Link to="/testimonials" className="transition-colors no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Compare</Link></li>
              <li><Link to="/shop" className="transition-colors no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Shop</Link></li>
              <li><Link to="/contact" className="transition-colors no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: `var(--color-secondary)` }}>
              <Shield className="w-5 h-5" style={{ color: `var(--color-secondary)` }} />
              Legal
            </h4>
            <ul className="space-y-3">
              <li><Link to="/shipping-policy" className="transition-colors flex items-center gap-2 no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                <FileText className="w-4 h-4 opacity-70" />
                Shipping Policy
              </Link></li>
              <li><Link to="/return-policy" className="transition-colors flex items-center gap-2 no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                <FileText className="w-4 h-4 opacity-70" />
                Return Policy
              </Link></li>
              <li><Link to="/terms-of-service" className="transition-colors flex items-center gap-2 no-underline text-sm font-medium" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
                <Shield className="w-4 h-4 opacity-70" />
                Terms of Service
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-10 mb-10" style={{ borderTop: '1px solid rgba(248, 250, 252, 0.05)' }}>
          <div className="flex justify-center gap-8 md:gap-16 flex-wrap text-sm uppercase tracking-widest">
            <a href="mailto:info@unixa.com" className="flex items-center gap-3 transition-colors no-underline" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
              <Mail className="w-5 h-5" style={{ color: `var(--color-secondary)` }} />
              info@unixa.com
            </a>
            <a href="tel:+911800123456" className="flex items-center gap-3 transition-colors no-underline" style={{ color: `var(--color-text-muted)` }} onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>
              <Phone className="w-5 h-5" style={{ color: `var(--color-secondary)` }} />
              +91 1800-123-456
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=UNIXA+Water+Purifiers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors no-underline"
              style={{ color: `var(--color-text-muted)` }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            >
              <MapPin className="w-5 h-5" style={{ color: `var(--color-secondary)` }} />
              Industrial Area, New Delhi
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center pb-8 px-4" style={{ borderTop: '1px solid rgba(248, 250, 252, 0.05)' }}>
          <p className="text-sm flex flex-col md:flex-row items-center justify-center gap-2" style={{ color: `var(--color-text-muted)` }}>
            <span>© 2024 <span className="font-black tracking-tighter" style={{ color: `var(--color-secondary)`, fontFamily: `var(--font-heading)` }}>UNIXA</span> Water Purifiers.</span>
            <span>Designed and Developed by <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold" style={{ color: `var(--color-secondary)` }}>#TeamDigicoders</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;