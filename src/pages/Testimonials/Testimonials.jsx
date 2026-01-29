import React, { useEffect, useRef } from 'react';
import { Droplets, X, Check, AlertTriangle, Shield, Heart, Zap, Filter, ArrowRight, Star } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import UnixaBrand from '../../components/common/UnixaBrand';

const Testimonials = () => {
  const sectionRefs = useRef([]);

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

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]" style={{ fontFamily: `var(--font-body)` }}>

      {/* Hero Section - Matched to About/Purifiers Premium Feel */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 px-6 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white border-b border-slate-100 rounded-b-[40px] md:rounded-b-[80px]">
        {/* High Visibility Water Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-300/40 border border-white/40 blur-[0.5px] animate-float-bubble"
              style={{
                width: `${Math.random() * 50 + 15}px`,
                height: `${Math.random() * 50 + 15}px`,
                left: `${Math.random() * 100}%`,
                bottom: `-${Math.random() * 20 + 20}%`,
                animationDuration: `${Math.random() * 4 + 4}s`,
                animationDelay: `${Math.random() * 5}s`
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
              Comparison Benchmark
            </span>
          </div>

          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-none">
            Comparison <span className="text-[var(--color-primary)]">Matters</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-semibold">
            Not all water is created equal. Discover the scientific difference between standard filtration and <UnixaBrand className="text-sm md:text-xl" /> HydroLife.
          </p>
        </div>

        {/* Section Separator Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
      </section>

      {/* Scientific Comparison Section */}
      <section ref={addToRefs} className="py-20 px-6 md:px-12 bg-white relative">
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

              {/* <div className="mt-12 group/btn">
                <button className="w-full h-16 bg-[var(--color-secondary)] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[var(--color-primary)] transition-all duration-300 flex items-center justify-center gap-3">
                  Examine Systems <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Benefits - Re-styled to match About/Home */}
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
              { icon: Heart, title: 'Immunity Boost', desc: 'Hydration that strengthens your defense system.' },
              { icon: Shield, title: 'Bio-Safe Tech', desc: 'No-touch purification for total sterilization.' },
              { icon: Zap, title: 'Metabolism', desc: 'Alkaline water that powers your cellular energy.' },
              { icon: Droplets, title: 'Hydration+', desc: 'Optimized mineral structure for faster absorption.' },
              { icon: Filter, title: 'Pure Flow', desc: 'Consistent performance even with high-TDS input.' },
              { icon: Check, title: 'Reliability', desc: 'Built to last with military-grade components.' }
            ].map((b, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <b.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)] uppercase tracking-tight">{b.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews - New Section for Testimonials Feel */}
      <section ref={addToRefs} className="py-24 px-8 md:px-24 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full mx-auto">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600">Rated 4.9/5 by 2000+ Users</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase text-[var(--color-secondary)] leading-none">
              LOVED BY <span className="text-[var(--color-primary)] underline decoration-4 underline-offset-8">THOUSANDS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", role: "Elite Member", text: "The water quality from UNIXA is simply amazing. My family has noticed a huge difference in taste and health within just a month of use.", stars: 5 },
              { name: "Mrs. Priya Gupta", role: "Certified Health Expert", text: "As a professional, I've seen many purifiers, but UNIXA's multi-stage technology is truly in a league of its own. Purest water I've ever tested.", stars: 5 },
              { name: "Sanjay Verma", role: "Home Automation Lead", text: "Installation was seamless and the smart features are game changers. It's the only appliance in my home that I trust 100%.", stars: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[4rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.stars)].map((_, idx) => (
                    <Star key={idx} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 font-medium italic mb-10 leading-relaxed text-lg">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-secondary)] tracking-tight text-base leading-none mb-1">{review.name}</h4>
                    <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
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