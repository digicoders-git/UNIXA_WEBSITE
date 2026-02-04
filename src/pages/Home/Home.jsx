import React, { useEffect, useRef, useState, memo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Shield, Droplets, Heart as HeartIcon, Award, Zap, Activity, Settings, Phone, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

import { throttle } from '../../utils/performance';
// Lazy load all heavy components
const Footer = lazy(() => import('../../components/layout/Footer'));
const ProductCard = lazy(() => import('../../components/cards/PurifierCard'));
const HeroSlider = lazy(() => import('../../components/Slider/HeroSlider'));
import UnixaBrand from '../../components/common/UnixaBrand';

// Import images directly
import water2 from '../../assets/images/water2.webp';

const Home = memo(() => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);


  // Dynamic Products State
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // VITE_API_URL is expected to include /api, e.g., http://localhost:5000/api
        const apiUrl = import.meta.env.VITE_API_URL; 
        const { data } = await axios.get(`${apiUrl}/products`);
        if (data && data.products) {
          // Show top 3 products for the home page showcase as requested
          setProducts(data.products.slice(0, 3));
        }

      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

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
    <div className="bg-white text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden selection:bg-[var(--color-primary)] selection:text-white">

      {/* Hero Slider Section */}
      <Suspense fallback={<div className="h-[40vh] bg-slate-50 animate-pulse"></div>}>
        <HeroSlider />
      </Suspense>


      {/* Products Section - International Catalog Look */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12 bg-white" id="products">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8 md:mb-24">
            <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">The Purest Choice</h4>
            <h2 className="text-3xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase leading-none">
              OUR <span className="text-[var(--color-primary)]">Purifiers</span>
            </h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {products.map((item) => (
              <Suspense key={item._id} fallback={<div className="h-80 bg-slate-100/50 rounded-2xl animate-pulse"></div>}>
                <ProductCard product={item} />
              </Suspense>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => navigate('/purifiers')}
              className="group relative px-10 py-4 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-black text-xs uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all hover:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] active:scale-95 shadow-lg shadow-slate-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View All Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>


      <section className="py-12 px-8 md:px-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center text-center md:text-left">
            <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="rounded-[30px] overflow-hidden shadow-xl border-4 border-white w-full max-w-[450px]">
                <img src={water2} alt="Wellness" className="w-full h-auto block" />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-[var(--color-primary)]/10 rounded-full mx-auto md:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                  <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-[8px]">The <UnixaBrand className="text-[10px]" /> Way</h4>
                </div>
                <h2 className="text-2xl md:text-6xl font-bold text-[var(--color-secondary)] uppercase leading-tight tracking-tighter">
                  Engineered for <br /><span className="text-[var(--color-primary)]">Pure</span> Perfection
                </h2>
                <p className="text-sm md:text-xl text-slate-500 font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
                  <UnixaBrand className="text-xs md:text-base" /> machines are redefined for Indian homes. We combine advanced filtration with modern aesthetics.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-200">
                {[
                  { t: "ATOMIC STANDARDS", d: "Pure hydration guaranteed.", i: <CheckCircle2 size={18} /> },
                  { t: "IONIZED WATER", d: "Optimal pH for health.", i: <Droplets size={18} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[var(--color-primary)] shadow-sm shrink-0">{item.i}</div>
                    <div className="text-left">
                      <h5 className="font-bold text-[var(--color-secondary)] text-[10px] md:text-sm tracking-widest">{item.t}</h5>
                      <p className="text-[8px] md:text-xs text-slate-400 font-bold uppercase tracking-wider hidden md:block">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Technology Section - Industrial/Clean Look */}
      <section ref={addToRefs} className="scroll-section py-8 px-8 md:px-24 bg-white" id="technology">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-5xl font-bold text-[var(--color-secondary)] uppercase tracking-tight leading-none">
                  MODERN <br /><span className="text-[var(--color-primary)] underline decoration-2 underline-offset-4">TECH</span>
                </h2>
                <div className="p-4 md:p-6 bg-slate-50 border-l-4 border-[var(--color-primary)] rounded-r-2xl mx-auto md:mx-0">
                  <p className="text-base md:text-lg text-[var(--color-secondary)] font-bold italic mb-2">
                    "Advancing purity with precision tech."
                  </p>
                  <p className="text-slate-500 font-medium text-[10px] md:text-sm leading-relaxed">
                    Our system removes 99.9% of bacteria while ensuring healthy hydration.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                {["RO SYSTEM", "UV GUARD", "UF TECH", "SMART IQ"].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center md:items-start gap-1">
                    <div className="w-6 h-0.5 bg-[var(--color-primary)]/30"></div>
                    <span className="font-bold text-[var(--color-secondary)] text-[8px] md:text-sm tracking-widest leading-none">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="rounded-[30px] overflow-hidden shadow-xl border border-slate-100 max-w-[450px]">
                <img src={water2} alt="Technology" className="w-full h-auto block grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Row-wise on Mobile */}
      <section className="py-12 px-6 md:px-24 bg-[#F8FAFC] border-y border-slate-200" id="priorities">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tighter uppercase text-[var(--color-secondary)]">Why Choose <UnixaBrand /></h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
            {[
              { t: "INDIAN BUILT", d: "Tuned for water", icon: <Award /> },
              { t: "PLATINUM TECH", d: "Pure Efficiency", icon: <Zap /> },
              { t: "PH MODES", d: "Healthy Options", icon: <Droplets /> },
              { t: "PURE+ NANO", d: "11-Stage Filter", icon: <Shield /> },
              { t: "ELITE STYLE", d: "Premium Design", icon: <Settings /> },
              { t: "FAST SHIP", d: "Pan India", icon: <Activity /> },
              { t: "PRO CARE", d: "Expert help", icon: <HeartIcon /> },
              { t: "DIGITAL IQ", d: "Live Monitor", icon: <Wrench /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center md:flex-col md:text-center p-4 md:p-8 bg-white border border-slate-200 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                <div className="p-2 md:p-4 rounded-lg md:rounded-2xl bg-slate-50 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all shrink-0">
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                <div className="ml-4 md:ml-0 md:mt-4">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-widest leading-none mb-1 md:mb-2">{item.t}</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider hidden md:block">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Row-wise on Mobile */}
      <section ref={addToRefs} className="py-16 px-8 md:px-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-2xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase leading-none">OUR <span className="text-[var(--color-primary)]">Services</span></h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-10">
            {[
              { t: "FREE SETUP", icon: <Settings /> },
              { t: "CHECKUP", icon: <Wrench /> },
              { t: "24/7 CARE", icon: <Phone /> },
              { t: "WARRANTY", icon: <Shield /> }
            ].map((s, i) => (
              <div key={i} className="flex items-center md:flex-col md:text-center p-4 md:p-8 bg-slate-50 rounded-2xl md:rounded-[3rem] border border-slate-200 group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-sm border border-slate-100 shrink-0">
                  {React.cloneElement(s.icon, { size: 20 })}
                </div>
                <div className="ml-4 md:ml-0 md:mt-6">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase text-[var(--color-secondary)]">{s.t}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-48 bg-white animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
// Updated for dynamic catalog sync
