import React, { useEffect, useRef } from 'react';
import { Droplets, Shield, Award, Truck, RotateCcw, FileText, CheckCircle, Zap, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';

const About = () => {
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
      <section className="relative py-12 px-6 text-center overflow-hidden rounded-b-[100px]" style={{ background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)` }}>
        {/* Animated Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .bubble {
              position: absolute;
              border-radius: 50%;
              animation: float-bubble 15s infinite ease-in-out;
            }
            .bubble-1 {
              width: 60px;
              height: 60px;
              background: rgba(248, 250, 252, 0.15);
              left: 10%;
              top: 20%;
              animation-delay: 0s;
            }
            .bubble-2 {
              width: 40px;
              height: 40px;
              background: rgba(248, 250, 252, 0.12);
              right: 15%;
              top: 30%;
              animation-delay: 3s;
            }
            .bubble-3 {
              width: 80px;
              height: 80px;
              background: rgba(248, 250, 252, 0.18);
              left: 70%;
              bottom: 30%;
              animation-delay: 6s;
            }
            .bubble-4 {
              width: 50px;
              height: 50px;
              background: rgba(248, 250, 252, 0.10);
              right: 60%;
              bottom: 40%;
              animation-delay: 9s;
            }
            .bubble-5 {
              width: 30px;
              height: 30px;
              background: rgba(248, 250, 252, 0.14);
              left: 30%;
              top: 40%;
              animation-delay: 12s;
            }
            .bubble-6 {
              width: 70px;
              height: 70px;
              background: rgba(248, 250, 252, 0.16);
              right: 30%;
              top: 60%;
              animation-delay: 2s;
            }
            @keyframes float-bubble {
              0%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.4;
              }
              50% {
                transform: translateY(-40px) scale(1.2);
                opacity: 0.7;
              }
            }
          `
        }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Droplets className="w-8 h-8" style={{ color: `var(--color-surface)` }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: `var(--color-surface)` }}>
              Pure Water Solutions
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ color: `var(--color-accent)`, fontFamily: `var(--font-heading)` }}>
            About UNIXA
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: `var(--color-surface)` }}>
            Leading the revolution in water purification technology with innovative solutions for healthier living
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 backdrop-blur-sm px-6 py-3 rounded-full" style={{ backgroundColor: `var(--color-surface)15`, border: `1px solid var(--color-surface)30` }}>
              <Shield className="w-5 h-5" style={{ color: `var(--color-muted)` }} />
              <span className="font-bold" style={{ color: `var(--color-muted)` }}>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 backdrop-blur-sm px-6 py-3 rounded-full" style={{ backgroundColor: `var(--color-surface)15`, border: `1px solid var(--color-surface)30` }}>
              <Award className="w-5 h-5" style={{ color: `var(--color-muted)` }} />
              <span className="font-bold" style={{ color: `var(--color-muted)` }}>Industry Leader</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12 relative" style={{ backgroundColor: `var(--color-surface)`}}>
        {/* Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="mission-bubble mission-bubble-1"></div>
          <div className="mission-bubble mission-bubble-2"></div>
          <div className="mission-bubble mission-bubble-3"></div>
          <div className="mission-bubble mission-bubble-4"></div>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .mission-bubble {
              position: absolute;
              border-radius: 50%;
              animation: float-mission 20s infinite ease-in-out;
            }
            .mission-bubble-1 {
              width: 150px;
              height: 150px;
              background: rgba(10, 40, 106, 0.08);
              left: 8%;
              top: 10%;
              animation-delay: 0s;
            }
            .mission-bubble-2 {
              width: 100px;
              height: 100px;
              background: rgba(6, 182, 212, 0.12);
              right: 15%;
              top: 20%;
              animation-delay: 5s;
            }
            .mission-bubble-3 {
              width: 80px;
              height: 80px;
              background: rgba(132, 204, 22, 0.10);
              left: 70%;
              bottom: 25%;
              animation-delay: 10s;
            }
            .mission-bubble-4 {
              width: 120px;
              height: 120px;
              background: rgba(10, 40, 106, 0.06);
              left: 20%;
              bottom: 15%;
              animation-delay: 15s;
            }
            @keyframes float-mission {
              0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.4;
              }
              50% {
                transform: translate(15px, -25px) scale(1.15);
                opacity: 0.6;
              }
            }
          `
        }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: `var(--color-text-muted)` }}>
                At UNIXA, we're committed to revolutionizing water purification technology. Our advanced filtration systems ensure every drop of water you consume is pure, safe, and healthy for you and your family.
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: `var(--color-text-muted)` }}>
                With cutting-edge RO technology, UV sterilization, and multi-stage filtration, we deliver water that exceeds international quality standards while being environmentally sustainable.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-xl" style={{ backgroundColor: `var(--color-surface)`, border: `2px solid var(--color-border)` }}>
                  <h4 className="font-bold text-2xl mb-2" style={{ color: `var(--color-secondary)` }}>15+</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Years of Excellence</p>
                </div>
                <div className="p-6 rounded-xl" style={{ backgroundColor: `var(--color-surface)`, border: `2px solid var(--color-border)` }}>
                  <h4 className="font-bold text-2xl mb-2" style={{ color: `var(--color-secondary)` }}>99.9%</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Purification Rate</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden" style={{ background: `linear-gradient(45deg, var(--color-primary)20, var(--color-secondary)20)` }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Filter className="w-24 h-24 mx-auto mb-4" style={{ color: `var(--color-primary)` }} />
                    <h3 className="text-xl font-bold" style={{ color: `var(--color-primary)` }}>Advanced Filtration</h3>
                    <p className="text-sm mt-2" style={{ color: `var(--color-text-muted)` }}>Multi-stage purification process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose UNIXA */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12" style={{ backgroundColor: `var(--color-surface)`, borderTop: `1px solid var(--color-border)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
              Why Choose UNIXA?
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--color-primary)15` }}>
                <Droplets className="w-10 h-10" style={{ color: `var(--color-primary)` }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Advanced RO Technology</h3>
              <p style={{ color: `var(--color-text-muted)` }}>State-of-the-art reverse osmosis system removes 99.9% of contaminants, ensuring crystal clear water.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--color-secondary)15` }}>
                <Shield className="w-10 h-10" style={{ color: `var(--color-secondary)` }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>UV Sterilization</h3>
              <p style={{ color: `var(--color-text-muted)` }}>Powerful UV-C light eliminates bacteria, viruses, and other harmful microorganisms completely.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--color-accent)15` }}>
                <CheckCircle className="w-10 h-10" style={{ color: `var(--color-accent)` }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Smart Monitoring</h3>
              <p style={{ color: `var(--color-text-muted)` }}>IoT-enabled systems with real-time water quality monitoring and filter replacement alerts.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12" style={{ background: `linear-gradient(135deg, var(--color-primary)05, var(--color-secondary)05)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                  <Zap className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-accent)` }} />
                  <h4 className="font-bold mb-2" style={{ color: `var(--color-primary)` }}>Energy Efficient</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Low power consumption</p>
                </div>
                <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                  <Filter className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-secondary)` }} />
                  <h4 className="font-bold mb-2" style={{ color: `var(--color-primary)` }}>Multi-Stage</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>7-stage purification</p>
                </div>
                <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                  <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-primary)` }} />
                  <h4 className="font-bold mb-2" style={{ color: `var(--color-primary)` }}>Safe & Secure</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>Child safety locks</p>
                </div>
                <div className="p-6 rounded-xl text-center" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                  <Award className="w-12 h-12 mx-auto mb-4" style={{ color: `var(--color-accent)` }} />
                  <h4 className="font-bold mb-2" style={{ color: `var(--color-primary)` }}>Certified</h4>
                  <p className="text-sm" style={{ color: `var(--color-text-muted)` }}>ISI & NSF approved</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
                Cutting-Edge Technology
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: `var(--color-text-muted)` }}>
                Our water purifiers incorporate the latest technological innovations to deliver unparalleled water quality. From smart sensors to automated cleaning cycles, every feature is designed for your convenience.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: `var(--color-text-muted)` }}>
                Experience the future of water purification with UNIXA's intelligent systems that adapt to your usage patterns and maintain optimal performance automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12 relative" style={{ backgroundColor: `var(--color-surface)` }}>
        {/* Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="commitment-bubble commitment-bubble-1"></div>
          <div className="commitment-bubble commitment-bubble-2"></div>
          <div className="commitment-bubble commitment-bubble-3"></div>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .commitment-bubble {
              position: absolute;
              border-radius: 50%;
              animation: float-commitment 18s infinite ease-in-out;
            }
            .commitment-bubble-1 {
              width: 120px;
              height: 120px;
              background: var(--color-primary)10;
              left: 5%;
              top: 15%;
              animation-delay: 0s;
            }
            .commitment-bubble-2 {
              width: 80px;
              height: 80px;
              background: var(--color-secondary)15;
              right: 10%;
              top: 25%;
              animation-delay: 6s;
            }
            .commitment-bubble-3 {
              width: 100px;
              height: 100px;
              background: var(--color-accent)10;
              left: 50%;
              bottom: 20%;
              animation-delay: 12s;
            }
            @keyframes float-commitment {
              0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
              }
              50% {
                transform: translate(20px, -30px) scale(1.1);
                opacity: 0.5;
              }
            }
          `
        }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
              Our Commitments
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Free Installation', icon: Truck, desc: 'Professional installation and setup at your doorstep with 1-year warranty.' },
              { title: 'Service Guarantee', icon: RotateCcw, desc: '24/7 customer support with quick response and hassle-free maintenance.' },
              { title: 'Quality Assurance', icon: FileText, desc: 'Rigorous quality testing and certification for every product we deliver.' }
            ].map((commitment, index) => {
              const IconComponent = commitment.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300 text-center group"
                  style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `var(--color-secondary)15` }}>
                    <IconComponent className="w-10 h-10" style={{ color: `var(--color-secondary)` }} />
                  </div>
                  <h4 className="font-bold text-xl mb-4" style={{ color: `var(--color-primary)` }}>{commitment.title}</h4>
                  <p style={{ color: `var(--color-text-muted)` }}>{commitment.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section ref={addToRefs} className="scroll-section py-12 px-6 md:px-12" style={{ backgroundColor: `var(--color-muted)`, borderTop: `1px solid var(--color-border)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: `var(--color-primary)`, fontFamily: `var(--font-heading)` }}>
              Our Policies
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: `var(--color-secondary)` }}></div>
            <p className="mt-4 text-lg" style={{ color: `var(--color-text-muted)` }}>Learn about our customer-friendly policies and terms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Return Policy */}
            <Link to="/return-policy" className="group">
              <div className="p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300 text-center h-full" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `rgba(132, 204, 22, 0.15)` }}>
                  <RotateCcw className="w-10 h-10" style={{ color: `var(--color-accent)` }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Return Policy</h3>
                <p className="mb-6" style={{ color: `var(--color-text-muted)` }}>Easy returns and exchanges within 30 days. Customer satisfaction is our priority.</p>
                <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all" style={{ color: `var(--color-secondary)` }}>
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Shipping Policy */}
            <Link to="/shipping-policy" className="group">
              <div className="p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300 text-center h-full" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `rgba(6, 182, 212, 0.15)` }}>
                  <Truck className="w-10 h-10" style={{ color: `var(--color-secondary)` }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Shipping Policy</h3>
                <p className="mb-6" style={{ color: `var(--color-text-muted)` }}>Fast and secure delivery across India. Free installation and setup included.</p>
                <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all" style={{ color: `var(--color-secondary)` }}>
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Terms of Service */}
            <Link to="/terms-of-service" className="group">
              <div className="p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300 text-center h-full" style={{ backgroundColor: `var(--color-surface)`, border: `1px solid var(--color-border)` }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `rgba(10, 40, 106, 0.15)` }}>
                  <FileText className="w-10 h-10" style={{ color: `var(--color-primary)` }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: `var(--color-primary)` }}>Terms of Service</h3>
                <p className="mb-6" style={{ color: `var(--color-text-muted)` }}>Our terms and conditions for using UNIXA products and services.</p>
                <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all" style={{ color: `var(--color-secondary)` }}>
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;