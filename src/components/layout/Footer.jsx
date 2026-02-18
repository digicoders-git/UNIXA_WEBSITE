import { Mail, Phone, MapPin, Heart, Instagram, Youtube, MessageCircle, Facebook, Droplet, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UnixaBrand from '../common/UnixaBrand';
import { FaWhatsapp } from "react-icons/fa";
import logo from '../../assets/footer-logo.jpg';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-secondary)] text-white/90">
      {/* Animated Top Wave Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full"></div>
      </div>
      
      {/* Animated Water Droplets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          >
            <Droplet size={16} className="text-cyan-400/20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12 pt-20 pb-8">
        {/* Top Section with Logo & Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pb-12 border-b border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="UNIXA" className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform" />
            </div>
            <div className="flex gap-6">
              {[
                { icon: <Award size={20} />, text: 'ISO Certified' },
                { icon: <Shield size={20} />, text: '5 Year Warranty' },
                { icon: <Droplet size={20} />, text: 'Pure Water' }
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <span className="text-[var(--color-primary)]">{badge.icon}</span>
                  <span className="text-xs font-bold text-white">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-base leading-relaxed text-white/90 max-w-md font-medium">
              Revolutionizing hydration with premium technology. We bring the longevity of advanced water purification to every Indian household.
            </p>

            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/unixawatertechnologies?igsh=aW05ODVkazJhMDRy', icon: <Instagram size={18} />, color: 'from-pink-500 to-purple-600' },
                { href: 'https://youtube.com/@unixawatertechnologies?si=_hDRleqBGuw2TkgL', icon: <Youtube size={18} />, color: 'from-red-500 to-red-600' },
                { href: 'https://www.facebook.com/share/1BDkH9zTFx/', icon: <Facebook size={18} />, color: 'from-blue-500 to-blue-600' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-cyan-400"></span> Company
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', link: '/' },
                  { name: 'Purifiers', link: '/purifiers' },
                  { name: 'Technology', link: '/#technology' },
                  { name: 'Reviews', link: '/testimonials' },
                  { name: 'Support', link: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.link} className="text-sm font-bold text-white/80 hover:text-[var(--color-primary)] transition-all no-underline flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-4 transition-all"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-cyan-400"></span> Legal
              </h4>
              <ul className="space-y-3">
                {['Shipping Policy', 'Return Policy', 'Terms of Service', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-bold text-white/80 hover:text-[var(--color-primary)] transition-all no-underline flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-4 transition-all"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Cards - Premium Design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-10 border-y border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            { icon: <Mail size={20} />, label: 'Email', value: 'unixatechnologies@gmail.com', href: 'mailto:unixatechnologies@gmail.com', color: 'from-blue-500/20 to-cyan-500/20', hoverColor: 'group-hover:from-blue-500 group-hover:to-cyan-500' },
            { icon: <FaWhatsapp  size={20} />, label: 'WhatsApp', value: '+91 9278176663', href: 'https://wa.me/919278176663', color: 'from-green-500/20 to-emerald-500/20', hoverColor: 'group-hover:from-green-500 group-hover:to-emerald-500' },
            { icon: <Phone size={20} />, label: 'Support', value: '+91 9278176662', href: 'tel:+919278176662', color: 'from-orange-500/20 to-red-500/20', hoverColor: 'group-hover:from-orange-500 group-hover:to-red-500' },
            { icon: <MapPin size={20} />, label: 'Location', value: 'New Delhi, India', href: null, color: 'from-purple-500/20 to-pink-500/20', hoverColor: 'group-hover:from-purple-500 group-hover:to-pink-500' }
          ].map((contact, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group"
            >
              <a
                href={contact.href || '#'}
                target={contact.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br ${contact.color} ${contact.hoverColor} border border-white/10 backdrop-blur-sm transition-all duration-300 h-full ${!contact.href && 'pointer-events-none'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {contact.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/80">{contact.label}</span>
                </div>
                <p className="text-sm font-bold text-white leading-tight break-all">{contact.value}</p>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar - Premium */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6"
        >
          <p className="text-sm font-bold text-white/70 flex items-center gap-2">
            © {new Date().getFullYear()} <UnixaBrand className="text-sm" color="white" />. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm font-medium">Crafted with</span>
            <Heart size={12} className="text-red-500 animate-pulse" fill="currentColor" />
            <span className="text-white/60 text-sm font-medium">by</span>
            <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-bold text-sm hover:text-cyan-400 transition-colors">
              Team Digicoders
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;