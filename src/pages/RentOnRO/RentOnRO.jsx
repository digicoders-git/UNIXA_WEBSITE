import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Droplets, 
  Shield, 
  Wrench, 
  Phone, 
  ArrowRight, 
  CreditCard, 
  Calendar, 
  Clock 
} from 'lucide-react';
import UnixaBrand from '../../components/common/UnixaBrand';
import Footer from '../../components/layout/Footer';
import water2 from '../../assets/images/water2.webp'; // Reusing existing asset

const RentOnRO = () => {
  const navigate = useNavigate();

  const [activePlan, setActivePlan] = useState('standard');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '399',
      features: ['RO + UV Purification', 'Free Maintenance', 'Free Filter Changes', 'Installation: ₹500'],
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '499',
      features: ['RO + UV + Copper', 'Free Maintenance', 'Free Filter Changes', 'Free Installation'],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '699',
      features: ['RO + UV + Alkaline + Zinc', 'Free Maintenance', 'Free Filter Changes', 'Free Installation', 'Smart Monitoring'],
      recommended: false
    }
  ];

  return (
    <div className="bg-white text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)]/5 skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-primary)]/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
              <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest">Smart Rental Plans</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-[var(--color-secondary)] uppercase leading-tight tracking-tighter">
              Pure Water, <br/>
              <span className="text-[var(--color-primary)]">Zero Worries</span>
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
              Experience the best <UnixaBrand /> technology without the upfront cost. 
              Free lifetime maintenance, filter changes, and support included.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[var(--color-primary)] text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
              >
                View Plans
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-secondary)] hover:text-white transition-all text-sm"
              >
                Enquire Now
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[var(--color-primary)]" />
                <span>Zero Maintenance Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[var(--color-primary)]" />
                <span>No Lock-in Period</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
              <img src={water2} alt="Pure Water" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-bold tracking-widest uppercase mb-1">Starting at just</p>
                <div className="text-4xl font-black">₹399<span className="text-lg font-medium opacity-80">/mo</span></div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-[var(--color-accent)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-60 h-60 bg-[var(--color-primary)]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Why Rent Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-xs">Benefits</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase">
              Why <span className="text-[var(--color-primary)]">Rent?</span>
            </h2>
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wrench size={32} />,
                title: "Zero Maintenance",
                desc: "Forget about service charges. We cover all maintenance and repairs for free."
              },
              {
                icon: <Shield size={32} />,
                title: "Free Filter Changes",
                desc: "Regular filter replacements are on us. You only pay the monthly rent."
              },
              {
                icon: <CreditCard size={32} />,
                title: "No Upfront Cost",
                desc: "Don't block your capital. Start using a premium purifier with just a small security deposit."
              }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-[var(--color-primary)]/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-sm mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-24 px-6 md:px-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-xs">Pricing</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase">
              Choose Your <span className="text-[var(--color-primary)]">Plan</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto font-medium">Flexible plans designed for every home and office size.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative p-8 rounded-[2rem] transition-all duration-300 ${
                  plan.recommended 
                    ? 'bg-white shadow-2xl scale-110 border-2 border-[var(--color-primary)] z-10' 
                    : 'bg-white shadow-lg border border-slate-100 hover:scale-105'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-[var(--color-secondary)] uppercase tracking-wider mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-black text-[var(--color-text)]">₹{plan.price}</span>
                  <span className="text-slate-400 font-medium ml-2">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                      <CheckCircle2 size={18} className="shrink-0 text-[var(--color-primary)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg ${
                  plan.recommended
                    ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]'
                    : 'bg-[var(--color-secondary)] text-white hover:bg-slate-800'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-xs mb-4">Process</h4>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase mb-8">
                How It <span className="text-[var(--color-primary)]">Works</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { title: "Select Plan & Pay Deposit", desc: "Choose the plan that fits your needs and pay a fully refundable security deposit.", icon: <CreditCard size={20}/> },
                  { title: "KYC Verification", desc: "Quick and easy address verification process online.", icon: <Shield size={20}/> },
                  { title: "Installation & Demo", desc: "Our expert technician installs the machine and gives you a demo.", icon: <Wrench size={20}/> },
                  { title: "Enjoy Pure Water", desc: "Start drinking 100% safe and tasty water immediately.", icon: <Droplets size={20}/> }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm z-10 relative shadow-md">
                        {i + 1}
                      </div>
                      {i !== 3 && <div className="w-0.5 h-full bg-slate-100 flex-grow my-2"></div>}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2 flex items-center gap-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[2.5rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-bl-[100px]"></div>
               <div className="relative z-10 text-center py-12">
                  <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 uppercase">Ready to get started?</h3>
                  <p className="text-slate-500 mb-8 font-medium">Join 10,000+ happy customers who trust UNIXA.</p>
                  <button 
                  onClick={() => navigate('/contact')}
                  className="px-10 py-5 bg-[var(--color-primary)] text-white font-bold uppercase tracking-widest rounded-full shadow-xl hover:scale-105 transition-all">
                    Book Now
                  </button>
                  <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
                     <span className="flex items-center gap-1"><Shield size={14}/> Secure</span>
                     <span className="flex items-center gap-1"><Clock size={14}/> Fast Setup</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default RentOnRO;
