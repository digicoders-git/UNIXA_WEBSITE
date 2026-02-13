import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import { Droplets, X, Check, AlertTriangle, Shield, Heart, Zap, Filter, ArrowRight, Star, Quote } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import UnixaBrand from '../../components/common/UnixaBrand';
import Loader from '../../components/common/Loader';

import iconImmunity from '../../assets/images/features/immunity_boost.svg';
import iconBio from '../../assets/images/features/uv_guard.svg';
import iconMeta from '../../assets/images/features/metabolism.svg';
import iconHydra from '../../assets/images/features/hydration_plus.svg';
import iconNano from '../../assets/images/features/pure_nano.svg';
import iconRel from '../../assets/images/features/reliability.svg';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Testimonials = () => {
  const sectionRefs = useRef([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews/all');
        if (data.success) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Fallback reviews if database is empty
  const fallbackReviews = [
    { user: "Rahul Sharma", role: "Elite Member", comment: "The water quality from UNIXA is simply amazing. My family has noticed a huge difference in taste and health within just a month of use.", rating: 5 },
    { user: "Mrs. Priya Gupta", role: "Certified Health Expert", comment: "As a professional, I've seen many purifiers, but UNIXA's multi-stage technology is truly in a league of its own. Purest water I've ever tested.", rating: 5 },
    { user: "Sanjay Verma", role: "Home Automation Lead", comment: "Installation was seamless and the smart features are game changers. It's the only appliance in my home that I trust 100%.", rating: 5 }
  ];

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="min-h-screen bg-[var(--color-surface)]" style={{ fontFamily: `var(--font-body)` }}>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 px-6 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white border-b border-slate-100 rounded-b-[40px] md:rounded-b-[80px]">
        {/* High Visibility Water Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
              style={{
                width: `${(i * 7 + 15) % 50 + 15}px`,
                height: `${(i * 7 + 15) % 50 + 15}px`,
                left: `${(i * 13) % 100}%`,
                bottom: `-${(i * 5 + 20) % 40 + 20}%`,
                animationDuration: `${(i % 4) + 4}s`,
                animationDelay: `${(i % 5)}s`
              }}
            />
          ))}
        </div>

        <style>{`
            @keyframes float-bubble {
                0% { transform: translateY(0) scale(1); opacity: 0; }
                20% { opacity: 0.4; }
                80% { opacity: 0.4; }
                100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
            }
            .animate-float-bubble {
                animation: float-bubble linear infinite;
            }
        `}</style>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-full mx-auto">
            <Droplets size={20} className="text-[var(--color-primary)]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Real Stories. Real Purity.
            </span>
          </div>

          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none">
            Customer <span className="text-[var(--color-primary)]">Voices</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-bold">
            See why thousands of families trust <UnixaBrand className="text-sm md:text-xl" /> for their daily hydration.
          </p>
        </div>

        {/* Section Separator Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
      </section>

      {/* Customer Reviews - Dynamic Slider */}
      <section ref={addToRefs} className="py-24 px-4 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full mx-auto">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600">Rated 4.9/5 by 2000+ Users</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-[var(--color-secondary)] leading-none">
              LOVED BY <span className="text-[var(--color-primary)] underline decoration-4 underline-offset-8">THOUSANDS</span>
            </h2>
          </div>

          {loading ? (
             <div className="min-h-[300px] flex items-center justify-center">
                <Loader text="Loading Reviews..." />
             </div>
          ) : (
            <div className="testimonials-slider relative px-0 md:px-8">
              <Swiper
                modules={[Autoplay, Pagination, EffectCoverflow]}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                className="py-12"
              >
                {displayReviews.map((review, i) => (
                  <SwiperSlide key={i} className="max-w-md w-full">
                    <div className="bg-slate-50 p-8 md:p-10 rounded-[3rem] border border-slate-100 h-full flex flex-col justify-center relative shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-500 group">
                      <Quote className="absolute top-8 right-8 text-[var(--color-primary)]/10 rotate-180" size={64} />
                      
                      <div className="flex gap-1 mb-6">
                        {[...Array(review.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-slate-600 font-medium italic mb-8 leading-relaxed text-base md:text-lg flex-grow">
                        "{review.comment || review.text}"
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg uppercase">
                          {(review.user || review.name || 'U')[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--color-secondary)] tracking-tight text-base leading-none mb-1">
                            {review.user || review.name}
                          </h4>
                          <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest">
                            {review.role || "Verified Buyer"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            </div>
          )}
        </div>
      </section>

       {/* Scientific Comparison Section */}
       <section ref={addToRefs} className="py-20 px-6 md:px-12 bg-white relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

            {/* Entry Level Water */}
            <div className="p-10 rounded-[4rem] bg-slate-50 border border-slate-100 flex flex-col hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-400">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-secondary)] tracking-tight uppercase">Standard Tap Water</h3>
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em]">Compromised Quality</p>
                </div>
              </div>

              <ul className="space-y-6 flex-grow">
                {[
                  'Undetected micro-plastics and silt',
                  'Residual chlorine from municipality',
                  'Harmful dissolved solids (TDS)',
                  'Industrial chemical runoff traces',
                  'Inconsistent mineral composition',
                  'Bacterial growth in aging pipes',
                  'Metallic aftertaste and odor'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-500 font-semibold text-sm group">
                    <div className="w-6 h-6 bg-red-100/50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <X size={14} className="text-red-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* HydroLife Standard */}
            <div className="p-10 rounded-[4rem] bg-white border-2 border-[var(--color-primary)]/20 flex flex-col shadow-2xl shadow-blue-500/10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8">
                <Shield size={80} className="text-[var(--color-primary)]/5 group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/30">
                  <Droplets size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-secondary)] tracking-tight uppercase"><UnixaBrand /> HydroLife</h3>
                  <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.3em]">Certified Purity</p>
                </div>
              </div>

              <ul className="space-y-6 flex-grow relative z-10">
                {[
                  '7-Stage RO + Copper + UV-C',
                  'Neutralizes 99.9% pathogens',
                  'Mineralizer infusion for health',
                  'Smart TDS control technology',
                  'Alkaline pH balancing system',
                  'Nano-silver anti-bacterial tank',
                  'Sweet, natural spring-like taste'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                    <div className="w-6 h-6 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-[var(--color-primary)]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Benefits */}
      <section ref={addToRefs} className="py-24 px-8 md:px-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-[var(--color-secondary)]">
              Why Choose <span className="text-[var(--color-primary)]">UNIXA?</span>
            </h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: iconImmunity, title: 'Immunity Boost', desc: 'Hydration that strengthens your defense system.' },
              { img: iconBio, title: 'Bio-Safe Tech', desc: 'No-touch purification for total sterilization.' },
              { img: iconMeta, title: 'Metabolism', desc: 'Alkaline water that powers your cellular energy.' },
              { img: iconHydra, title: 'Hydration+', desc: 'Optimized mineral structure for faster absorption.' },
              { img: iconNano, title: 'Pure Flow', desc: 'Consistent performance even with high-TDS input.' },
              { img: iconRel, title: 'Reliability', desc: 'Built to last with military-grade components.' }
            ].map((b, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-8 shrink-0">
                  <img src={b.img} alt={b.title} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)] uppercase tracking-tight">{b.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
