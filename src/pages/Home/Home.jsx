import React, { useEffect, useRef, useState, memo, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Droplets, Leaf, Heart as HeartIcon, Star, Award, Users, Zap, Activity, Sparkles, RefreshCw, Settings, Phone, Wrench, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { debounce, throttle } from '../../utils/performance';
// Lazy load all heavy components
const Footer = lazy(() => import('../../components/layout/Footer'));
const ProductCard = lazy(() => import('../../components/cards/PurifierCard'));
const HeroSlider = lazy(() => import('../../components/Slider/HeroSlider'));
import Loader from '../../components/common/Loader';

// Import images directly
import water2 from '../../assets/images/water2.webp';

const Home = memo(() => {
  const sectionRefs = useRef([]);
  const ladduScrollRef = useRef(null);

  // Static Data for Products (Japanese Hybrid Technology Models)
  const products = [
    {
      _id: '1',
      name: 'HydroLife Alkaline Pro',
      mainImage: { url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop' },
      price: 45000,
      finalPrice: 39999,
      discountPercent: 11,
      description: 'Advanced 11-stage ionization with Platinum plates. Delivers mineral-rich alkaline water.',
      category: { name: 'Premium' }
    },
    {
      _id: '2',
      name: 'NanoPure Smart',
      mainImage: { url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop' },
      price: 25000,
      finalPrice: 19999,
      discountPercent: 20,
      description: 'Compact Under-sink design for modern kitchens. Space-saving yet powerful filtration.',
      category: { name: 'Smart' }
    },
    {
      _id: '3',
      name: 'SilverStream RO+',
      mainImage: { url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop' },
      price: 15000,
      finalPrice: 12999,
      discountPercent: 13,
      description: 'Superior RO purification with mineral boost. Ideal for high TDS water sources.',
      category: { name: 'Standard' }
    }
  ];

  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      throttle((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, 100),
      { threshold: 0.1, rootMargin: '50px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    }
  };

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

      {/* Hero Slider Section */}
      <Suspense fallback={
        <div className="h-[50vh] bg-[var(--color-muted)] flex items-center justify-center">
          <Loader text="Initializing Pure Water Experience..." />
        </div>
      }>
        <div className="relative">
          <HeroSlider />
        </div>
      </Suspense>

      {/* Trust Strip */}
      <div className="bg-white border-b border-slate-100 py-10 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: <Shield size={24} />, title: "ISI Certified", desc: "Gold Standard Purity" },
            { icon: <RefreshCw size={24} />, title: "Pure Alkaline", desc: "Optimal pH Balance" },
            { icon: <Zap size={24} />, title: "Advanced RO", desc: "11-Stage Filtration" },
            { icon: <Phone size={24} />, title: "24/7 Service", desc: "Expert Doorstep Support" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center lg:items-start lg:flex-row gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50/50 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-center lg:text-left">
                <h4 className="font-bold text-[var(--color-secondary)] uppercase tracking-wider text-[10px] md:text-xs">{item.title}</h4>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Water Purifiers Section */}
      <section ref={addToRefs} className="scroll-section py-8 md:py-16 px-6 md:px-12 bg-slate-50/50 relative overflow-hidden" id="products">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h4 className="text-[var(--color-primary)] font-black uppercase tracking-[0.5em] text-[10px] mb-4">Discovery Selection</h4>
            <h2 className="text-3xl md:text-7xl font-black text-[var(--color-secondary)] mb-6 tracking-tighter leading-tight">Pure <span className="text-[var(--color-primary)]">Ionized</span> Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((item) => (
              <div key={item._id} className="h-full">
                <Suspense fallback={<div className="h-96 bg-slate-100 rounded-3xl animate-pulse"></div>}>
                  <ProductCard product={item} />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophical Introduction */}
      <section ref={addToRefs} className="scroll-section py-16 px-8 md:px-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={water2} alt="Unixa Philosophy" className="relative z-10 rounded-[30px] md:rounded-[50px] shadow-2xl w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -right-6 bg-[var(--color-secondary)] p-8 rounded-[30px] shadow-xl z-20 hidden md:block">
                <p className="text-5xl font-black text-[var(--color-primary)] mb-1">25+</p>
                <p className="text-xs font-black text-white uppercase tracking-widest">Years of Purity</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[var(--color-primary)] font-black uppercase tracking-[0.4em] text-xs">Our Philosophy</h4>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--color-secondary)] leading-tight tracking-tight">
                  Water that is <span className="text-[var(--color-primary)]">crafted</span> specifically for you
                </h2>
              </div>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed">
                Unixa HydroLife Ionized Water Machines are engineered for Indian water sources, ensuring every drop is pure, alkaline, and rich in antioxidants.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)]" />
                  <p className="text-sm font-bold text-[var(--color-secondary)]">Zero Compromise on quality and standards.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)]" />
                  <p className="text-sm font-bold text-[var(--color-secondary)]">Enhanced water taste with optimum pH levels.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section ref={addToRefs} className="scroll-section py-16 px-8 md:px-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: <Users className="w-10 h-10" />, value: "50,000+", label: "Happy Families" },
              { icon: <Award className="w-10 h-10" />, value: "BIS", label: "Certified Quality" },
              { icon: <Star className="w-10 h-10" />, value: "4.9/5", label: "Customer Rating" },
              { icon: <Zap className="w-10 h-10" />, value: "24/7", label: "Expert Support" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all text-[var(--color-primary)]">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-3xl font-black text-[var(--color-secondary)] mb-1 tracking-tighter">{item.value}</h3>
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section ref={addToRefs} className="scroll-section bg-white py-16 px-8 md:px-24 relative z-20 overflow-hidden" id="technology">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h4 className="text-[var(--color-primary)] font-black uppercase tracking-[0.5em] text-[10px]">Advanced Technology</h4>
            <h2 className="text-4xl md:text-7xl font-black text-[var(--color-secondary)] tracking-tighter uppercase leading-none">
              The Science of <span className="text-[var(--color-primary)]">Alkaline</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group overflow-hidden rounded-[40px] shadow-2xl">
              <img src={water2} alt="Technology" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-black text-2xl uppercase tracking-tighter">11-Stage RO+UV+UF</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                <p className="text-xl text-[var(--color-secondary)] leading-relaxed font-bold italic mb-6">
                  "Removing 99.9% of contaminants while retaining vital minerals."
                </p>
                <p className="text-slate-500 font-medium">
                  Our advanced Japanese hybrid technology ensures that your water is not just pure, but also carries the healthy mineral balance your body needs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { t: "RO Purifying", d: "Removes heavy metals & salts." },
                  { t: "UV Shield", d: "Eliminates bacteria & viruses." },
                  { t: "UF Ultra", d: "Suspended particle removal." },
                  { t: "Smart Care", d: "Real-time quality monitoring." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <h5 className="font-black text-[var(--color-secondary)] text-sm uppercase tracking-wide">{item.t}</h5>
                    <p className="text-xs text-slate-400 font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Points on Mobile, Cards on Tablet+ */}
      <section ref={addToRefs} className="scroll-section py-16 px-6 md:px-24 bg-slate-50" id="priorities">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl text-[var(--color-secondary)] mb-4 font-black tracking-tighter uppercase">Why Choose <span className="text-[var(--color-primary)]">Unixa?</span></h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          {/* Points for Mobile */}
          <div className="md:hidden space-y-4">
            {[
              "Made in India specifically for Indian water conditions.",
              "Premium Platinum-Coated Titanium Plates.",
              "Adjustable pH levels from 3.5 to 10.5.",
              "Multi-stage 11-Stage RO+UV+UF purification.",
              "Sleek & Elegant Japanese Design.",
              "Hassle-free doorbell delivery across India.",
              "24/7 Expert maintenance support."
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0" />
                <p className="text-[10px] font-black text-[var(--color-secondary)] uppercase tracking-wider">{p}</p>
              </div>
            ))}
          </div>

          {/* Cards for Tablet/Desktop */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Made in India", d: "Engineered for local water sources.", icon: <Award /> },
              { t: "Platinum Plates", d: "Superior ionization efficiency.", icon: <Zap /> },
              { t: "pH Variety", d: "Choose from 5+ water types.", icon: <Droplets /> },
              { t: "Pure+ Tech", d: "11-stage advanced purification.", icon: <Shield /> },
              { t: "Elegant Design", d: "Modern Japanese aesthetics.", icon: <Settings /> },
              { t: "Free Shipping", d: "Doorstep delivery pan India.", icon: <Truck /> },
              { t: "Elite Service", d: "Lifetime maintenance guarantee.", icon: <HeartIcon /> },
              { t: "Digital Smart", d: "Real-time TDS & filter monitoring.", icon: <Wrench /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[30px] border border-slate-100 transition-all hover:shadow-2xl group flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-slate-50 text-[var(--color-primary)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  {item.icon || <Droplets />}
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">{item.t}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Drink Unixa Water Section */}
      <section ref={addToRefs} className="py-16 px-6 md:px-24 bg-white" id="benefits">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl text-[var(--color-secondary)] mb-4 font-black tracking-tighter uppercase">Why Drink <span className="text-[var(--color-primary)]">Unixa?</span></h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          {/* Points for Mobile */}
          <div className="md:hidden space-y-4">
            {[
              { t: "Immunity Booster", d: "Neutralizes free radicals instantly." },
              { t: "Optimal Wellness", d: "Enriched with healthy minerals." },
              { t: "Ultra Hydration", d: "Deep cellular absorption technology." },
              { t: "pH Balance", d: "Maintains natural body alkalinity." }
            ].map((item, i) => (
              <div key={i} className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                <h3 className="text-sm font-black text-[var(--color-primary)] uppercase tracking-widest mb-1">{item.t}</h3>
                <p className="text-[11px] font-bold text-slate-500">{item.d}</p>
              </div>
            ))}
          </div>

          {/* Cards for Tablet/Desktop */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {[
              { t: "Immunity Booster", d: "Anti-free radical properties.", icon: <Activity /> },
              { t: "Create Wellness", d: "Rich in vital antioxidants.", icon: <Sparkles /> },
              { t: "Antioxidizing", d: "Neutralizes body acidity.", icon: <RefreshCw /> },
              { t: "Balanced TDS", d: "Retains essential electrolytes.", icon: <HeartIcon /> }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[40px] border border-slate-100 bg-white text-center hover:shadow-2xl transition-all h-full flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 text-[var(--color-primary)] rounded-full flex items-center justify-center mb-8">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3 tracking-tight">{item.t}</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section ref={addToRefs} className="py-16 px-8 md:px-24 bg-slate-50 relative z-10" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl text-[var(--color-secondary)] mb-4 font-black tracking-tighter uppercase">Our <span className="text-[var(--color-primary)]">Services</span></h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full mb-4"></div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs italic">Expert Care Every Step of the Way</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Free Installation", d: "Professional setup by certified tech.", icon: <Settings /> },
              { t: "Regular Maintenance", d: "Monthly scheduled checkups.", icon: <Wrench /> },
              { t: "24/7 Support", d: "Instant help for any water issues.", icon: <Phone /> },
              { t: "5-Year Warranty", d: "Comprehensive protection plan.", icon: <Shield /> }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100 flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-slate-50 text-[var(--color-primary)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.t}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-64 bg-white animate-pulse border-t border-slate-100"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
});

// Mocking Truck and Wrench as I might have missed them in imports
function Truck(props) { return <Activity {...props} /> }

Home.displayName = 'Home';
export default Home;