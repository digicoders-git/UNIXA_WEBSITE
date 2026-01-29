import React, { useEffect, useRef } from 'react';
import { Droplets, X, Check, AlertTriangle, Shield, Heart, Zap, Filter } from 'lucide-react';
import Footer from '../../components/layout/Footer';

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

      {/* Comparison Hero */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden bg-[var(--color-secondary)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary)/15,transparent_70%)] opacity-30"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Droplets size={16} className="text-[var(--color-primary)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Purity Benchmark</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter font-[var(--font-heading)] leading-none">
            Comparison <span className="text-[var(--color-primary)]">Matters</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-semibold">
            Not all water is created equal. Discover the scientific difference between standard filtration and UNIXA HydroLife.
          </p>
        </div>
      </section>

      {/* Scientific Comparison Section */}
      <section ref={addToRefs} className="scroll-section py-32 px-6 md:px-12 bg-white relative z-10 -mt-10 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

            {/* Entry Level Water */}
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                  <AlertTriangle size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[var(--color-secondary)] tracking-tight">Standard Tap Water</h3>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Compromised Quality</p>
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
                  <li key={i} className="flex items-center gap-4 text-slate-500 font-medium group">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <X size={14} className="text-red-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* HydroLife Standard */}
            <div className="p-10 rounded-[3rem] bg-[var(--color-secondary)] border border-blue-500/20 flex flex-col shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <Shield size={80} className="text-white/5 group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white">
                  <Droplets size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">UNIXA HydroLife</h3>
                  <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest">Certified Purity</p>
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
                  <li key={i} className="flex items-center gap-4 text-white/70 font-medium">
                    <div className="w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="w-full h-14 bg-[var(--color-primary)] text-white rounded-2xl font-black uppercase tracking-widest mt-12 hover:scale-[1.02] transition-transform">
                View Ionizers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Benefits */}
      <section ref={addToRefs} className="scroll-section py-32 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[var(--color-secondary)] tracking-tighter">
              Why Choose <span className="text-[var(--color-primary)]">UNIXA?</span>
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
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
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-blue-500/5 hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] transition-colors">
                  <b.icon size={24} className="text-[var(--color-primary)] group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)]">{b.title}</h3>
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