import React, { useEffect, useRef, memo } from 'react';
import { Droplets, Shield, Award, Truck, RotateCcw, FileText, CheckCircle, Zap, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import UnixaBrand from '../../components/common/UnixaBrand';
import ourMissionImg from '../../assets/images/ourMissson.webp';

const About = memo(() => {
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
    <div className="bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

      {/* Hero Section - Matched to Purifiers/Home Premium Feel */}
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
            <Droplets className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-[var(--color-primary)]">
              Pure Water Solutions
            </span>
          </div>

          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-none">
            About <UnixaBrand className="text-4xl md:text-8xl" /> <span className="text-[var(--color-primary)]">Legacy</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-semibold">
            Leading the revolution in water purification technology with innovative solutions for healthier living.
          </p>
        </div>

        {/* Section Separator Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
      </section>

      {/* Our Mission - Updated with ourMissionImg and Clean CSS */}
      <section ref={addToRefs} className="py-12 px-6 md:px-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase leading-none">
                  Our <span className="text-[var(--color-primary)]">Mission</span>
                </h2>
                <div className="w-16 h-1.5 bg-[var(--color-primary)] rounded-full"></div>
              </div>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                  At <UnixaBrand className="text-base" />, we're committed to revolutionizing water purification technology. Our systems ensure every drop of water you consume is pure, safe, and mineral-rich.
                </p>
                <p className="text-base text-slate-400 font-medium leading-relaxed">
                  With cutting-edge RO technology, UV sterilization, and multi-stage filtration, we deliver water that exceeds international quality standards while being environmentally sustainable.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-4xl mb-2 text-[var(--color-secondary)]">15+</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Years of Excellence</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-4xl mb-2 text-[var(--color-secondary)]">99.9%</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Purification Rate</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-700">
                <img
                  src={ourMissionImg}
                  alt="Our Mission"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative background glow */}
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-[var(--color-primary)]/10 blur-[100px] rounded-full" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-cyan-400/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Updated UI */}
      <section ref={addToRefs} className="py-20 px-8 md:px-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-[var(--color-secondary)]">
              Why Choose <UnixaBrand />?
            </h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Droplets />, title: "Advanced RO", desc: "State-of-the-art reverse osmosis system removes 99.9% of contaminants." },
              { icon: <Shield />, title: "UV Guard", desc: "Powerful UV-C light eliminates bacteria and harmful microorganisms." },
              { icon: <CheckCircle />, title: "Smart IQ", desc: "IoT-enabled systems for real-time water quality and filter monitoring." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  {React.cloneElement(feature.icon, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)] uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology - Industrial Clean Look Matched to Home */}
      <section ref={addToRefs} className="py-20 px-8 md:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {[
                { icon: <Zap />, title: "Energy Hub", sub: "Eco-friendly power" },
                { icon: <Filter />, title: "11-Stage", sub: "Nano Filtration" },
                { icon: <Shield />, title: "Child Lock", sub: "Safety First" },
                { icon: <Award />, title: "Certified", sub: "ISI Approved" }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all">
                  <div className="text-[var(--color-primary)] mb-4 flex justify-center">{React.cloneElement(item.icon, { size: 32 })}</div>
                  <h4 className="font-bold text-[var(--color-secondary)] text-sm uppercase tracking-widest">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-xs">High-Precision</h4>
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-secondary)] tracking-tight uppercase leading-none">
                  CUTTING-EDGE <br /><span className="text-[var(--color-primary)] underline decoration-4 underline-offset-8">TECH</span>
                </h2>
              </div>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Our water purifiers incorporate the latest innovations. From smart sensors to automated cleaning cycles, every feature is designed for absolute purity.
              </p>
              <div className="flex items-center gap-4 text-[var(--color-primary)]">
                <div className="w-12 h-px bg-[var(--color-primary)]/30"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Future of Hydration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies - Clean Row View Matched to Home/Purifiers */}
      <section ref={addToRefs} className="py-20 px-8 md:px-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase leading-none">Our <span className="text-[var(--color-primary)]">Policies</span></h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { to: "/return-policy", icon: <RotateCcw />, title: "Return Policy", desc: "Easy 30-day returns and exchanges." },
              { to: "/shipping-policy", icon: <Truck />, title: "Shipping Policy", desc: "Fast and secure Pan-India delivery." },
              { to: "/terms-of-service", icon: <FileText />, title: "Terms of Service", desc: "Our platform rules and conditions." }
            ].map((p, i) => (
              <Link key={i} to={p.to} className="group h-full">
                <div className="bg-white p-10 rounded-[4rem] border border-slate-200 h-full flex flex-col items-center text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-[var(--color-primary)] mb-8 shadow-inner group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all transform group-hover:rotate-6">
                    {React.cloneElement(p.icon, { size: 32 })}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-secondary)] uppercase tracking-tight mb-4">{p.title}</h3>
                  <p className="text-sm text-slate-400 font-medium mb-8 flex-grow">{p.desc}</p>
                  <div className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

About.displayName = 'About';
export default About;