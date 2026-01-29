import React, { useEffect, useRef } from 'react';
import { Droplets, X, Check, AlertTriangle, Shield, Heart, Zap, Filter } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const Compare = () => {
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
    <div style={{ backgroundColor: `var(--color-surface)`, color: `var(--color-text)`, fontFamily: `var(--font-body)` }} className="min-h-screen -mt-12">

      {/* Hero Section */}
      <section className="relative py-8 md:py-12 px-6 text-center overflow-hidden rounded-b-[40px] md:rounded-b-[100px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
        {/* Animated Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .bubble {
              position: absolute;
              border-radius: 50%;
              animation: float-bubble 15s infinite ease-in-out;
            }
            .bubble-1 {
              width: 80px;
              height: 80px;
              background: rgba(248, 250, 252, 0.15);
              left: 15%;
              top: 25%;
              animation-delay: 0s;
            }
            .bubble-2 {
              width: 60px;
              height: 60px;
              background: rgba(248, 250, 252, 0.12);
              right: 20%;
              top: 35%;
              animation-delay: 4s;
            }
            .bubble-3 {
              width: 100px;
              height: 100px;
              background: rgba(248, 250, 252, 0.18);
              left: 70%;
              bottom: 30%;
              animation-delay: 8s;
            }
            .bubble-4 {
              width: 70px;
              height: 70px;
              background: rgba(248, 250, 252, 0.14);
              right: 65%;
              bottom: 40%;
              animation-delay: 12s;
            }
            @keyframes float-bubble {
              0%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.4;
              }
              50% {
                transform: translateY(-30px) scale(1.1);
                opacity: 0.7;
              }
            }
          `
        }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <Droplets className="w-6 h-6 md:w-8 md:h-8" style={{ color: `var(--color-surface)` }} />
            <span className="font-semibold text-xs md:text-sm uppercase tracking-wider" style={{ color: `var(--color-surface)` }}>
              Water Comparison
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6" style={{ color: `var(--color-surface)`, fontFamily: `var(--font-heading)` }}>
            UNIXA vs Regular Water
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: `var(--color-surface)` }}>
            Discover the difference between regular tap water and UNIXA's advanced purification technology
          </p>
        </div>
      </section>

      {/* Water Comparison Section */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12 relative" style={{ backgroundColor: `var(--color-surface)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
              Regular Water vs UNIXA Purified Water
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Regular Water */}
            <div className="p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `2px solid rgba(239, 68, 68, 0.3)` }}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `rgba(239, 68, 68, 0.1)` }}>
                  <AlertTriangle className="w-10 h-10" style={{ color: `rgba(239, 68, 68, 0.8)` }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: `rgba(239, 68, 68, 0.8)` }}>Regular Tap Water</h3>
              </div>

              <div className="space-y-4">
                {[
                  'Contains harmful bacteria & viruses',
                  'High levels of chlorine & chemicals',
                  'Heavy metals like lead & mercury',
                  'Unfiltered sediments & particles',
                  'Bad taste & odor',
                  'Risk of waterborne diseases',
                  'No quality assurance'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <X className="w-5 h-5 flex-shrink-0" style={{ color: `rgba(239, 68, 68, 0.8)` }} />
                    <span style={{ color: `var(--color-text-muted)` }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UNIXA Water */}
            <div className="p-8 rounded-2xl" style={{ backgroundColor: `var(--color-surface)`, border: `2px solid var(--color-accent)` }}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `rgba(132, 204, 22, 0.15)` }}>
                  <Shield className="w-10 h-10" style={{ color: `var(--color-accent)` }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: `var(--color-accent)` }}>UNIXA Purified Water</h3>
              </div>

              <div className="space-y-4">
                {[
                  '99.9% bacteria & virus removal',
                  'Advanced RO + UV purification',
                  'Heavy metals completely filtered',
                  'Crystal clear & pure water',
                  'Great taste & odor-free',
                  'Safe for entire family',
                  'ISO certified quality'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" style={{ color: `var(--color-accent)` }} />
                    <span style={{ color: `var(--color-text-muted)` }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Drink UNIXA Water */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12" style={{ background: `linear-gradient(135deg, rgba(10, 40, 106, 0.05), rgba(6, 182, 212, 0.05))`, borderTop: `1px solid var(--color-border)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
              Why Drink UNIXA Purified Water?
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Better Health',
                desc: 'Pure water boosts immunity, improves digestion, and keeps your family healthy and hydrated.',
                color: 'var(--color-accent)'
              },
              {
                icon: Shield,
                title: 'Complete Protection',
                desc: 'Advanced multi-stage filtration removes all harmful contaminants and disease-causing microorganisms.',
                color: 'var(--color-primary)'
              },
              {
                icon: Zap,
                title: 'Enhanced Energy',
                desc: 'Clean water improves metabolism, increases energy levels, and helps maintain optimal body functions.',
                color: 'var(--color-secondary)'
              },
              {
                icon: Filter,
                title: 'Superior Taste',
                desc: 'Experience the pure, refreshing taste of water without any chemical aftertaste or odor.',
                color: 'var(--color-accent)'
              },
              {
                icon: Droplets,
                title: 'Mineral Balance',
                desc: 'Retains essential minerals while removing harmful substances for optimal hydration and nutrition.',
                color: 'var(--color-primary)'
              },
              {
                icon: Check,
                title: 'Peace of Mind',
                desc: 'Certified quality assurance means you can trust every drop for your family\'s wellbeing.',
                color: 'var(--color-secondary)'
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl text-center hover:-translate-y-2 transition-all duration-300"
                  style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${benefit.color}15` }}>
                    <IconComponent className="w-8 h-8" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: `var(--color-primary)` }}>{benefit.title}</h3>
                  <p style={{ color: `var(--color-text-muted)` }}>{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12 relative" style={{ backgroundColor: `var(--color-surface)`, borderTop: `1px solid var(--color-border)` }}>
        {/* Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="health-bubble health-bubble-1"></div>
          <div className="health-bubble health-bubble-2"></div>
          <div className="health-bubble health-bubble-3"></div>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .health-bubble {
              position: absolute;
              border-radius: 50%;
              animation: float-health 18s infinite ease-in-out;
            }
            .health-bubble-1 {
              width: 120px;
              height: 120px;
              background: rgba(132, 204, 22, 0.08);
              left: 10%;
              top: 20%;
              animation-delay: 0s;
            }
            .health-bubble-2 {
              width: 90px;
              height: 90px;
              background: rgba(6, 182, 212, 0.10);
              right: 15%;
              top: 30%;
              animation-delay: 6s;
            }
            .health-bubble-3 {
              width: 110px;
              height: 110px;
              background: rgba(10, 40, 106, 0.06);
              left: 60%;
              bottom: 25%;
              animation-delay: 12s;
            }
            @keyframes float-health {
              0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
              }
              50% {
                transform: translate(20px, -25px) scale(1.1);
                opacity: 0.5;
              }
            }
          `
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                Transform Your Health
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: `var(--color-text-muted)` }}>
                Pure water is the foundation of good health. UNIXA's advanced purification technology ensures every glass you drink contributes to your wellbeing.
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: `var(--color-text-muted)` }}>
                From improved skin health to better kidney function, pure water impacts every aspect of your body's performance and longevity.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `var(--color-surface)`, border: `2px solid var(--color-border)` }}>
                  <h4 className="font-bold text-2xl mb-2" style={{ color: `var(--color-accent)` }}>100%</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Pure & Safe</p>
                </div>
                <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `var(--color-surface)`, border: `2px solid var(--color-border)` }}>
                  <h4 className="font-bold text-2xl mb-2" style={{ color: `var(--color-secondary)` }}>24/7</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Fresh Water</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden" style={{ background: `linear-gradient(45deg, rgba(132, 204, 22, 0.2), rgba(6, 182, 212, 0.2))` }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-24 h-24 mx-auto mb-4" style={{ color: `var(--color-accent)` }} />
                    <h3 className="text-xl font-bold" style={{ color: `var(--color-primary)` }}>Healthy Living</h3>
                    <p className="text-sm mt-2" style={{ color: `var(--color-text-muted)` }}>Pure water for pure life</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compare;