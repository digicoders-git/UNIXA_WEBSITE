import React, { useEffect, useRef, useState, memo, useCallback, lazy, Suspense } from 'react';
import { Shield, Droplets, Leaf, Heart as HeartIcon, Star, Award, Users, Zap, Activity, Sparkles, RefreshCw, Settings, Phone, Wrench, Clock } from 'lucide-react';
import { listProductsApi } from '../../api/product';
import { debounce, throttle } from '../../utils/performance';

// Lazy load all heavy components
const Footer = lazy(() => import('../../components/layout/Footer'));
const LadduCard = lazy(() => import('../../components/cards/LadduCard'));
const LazyVideoReviews = lazy(() => import('../../components/sections/LazyVideoReviews'));
const HeroSlider = lazy(() => import('../../components/Slider/HeroSlider'));
const BrandAdvertisement = lazy(() => import('../../components/sections/BrandAdvertisement'));
import Loader from '../../components/common/Loader';

// Import images directly
import water1 from '../../assets/images/water1.webp';
import water2 from '../../assets/images/water2.webp';


const Home = memo(() => {
  const sectionRefs = useRef([]);
  const ladduScrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await listProductsApi();
      // console.log('Home products data:', data);
      // Check if data has products array or if products are directly in data
      if (data.products) {
        setProducts(data.products);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  useEffect(() => {
    if (!products.length) return;

    const ladduContainer = ladduScrollRef.current;
    if (!ladduContainer) return;

    let ladduInterval;
    let isLadduHovered = false;

    const startLadduScroll = throttle(() => {
      if (ladduInterval || isLadduHovered) return;
      ladduInterval = setInterval(() => {
        if (!ladduContainer || isLadduHovered) return;
        if (ladduContainer.scrollLeft >= ladduContainer.scrollWidth / 3) {
          ladduContainer.scrollLeft = 0;
        } else {
          ladduContainer.scrollLeft += 1.5;
        }
      }, 30);
    }, 100);

    const stopLadduScroll = () => {
      if (ladduInterval) {
        clearInterval(ladduInterval);
        ladduInterval = null;
      }
    };

    const handleMouseEnter = () => {
      isLadduHovered = true;
      stopLadduScroll();
    };

    const handleMouseLeave = () => {
      isLadduHovered = false;
      startLadduScroll();
    };

    setTimeout(startLadduScroll, 200);
    ladduContainer.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    ladduContainer.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      stopLadduScroll();
      ladduContainer.removeEventListener('mouseenter', handleMouseEnter);
      ladduContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [products]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    }
  };

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden mt-12 md:mt-16">

      {/* Hero Slider Section */}
      <Suspense fallback={
        <div className="h-[50vh] md:h-[80vh] bg-[var(--color-surface)] flex items-center justify-center">
          <Loader text="Loading Pure Water Solutions..." />
        </div>
      }>
        <HeroSlider />
      </Suspense>

      {/* Our Water Purifiers Section */}
      <section ref={addToRefs} className="scroll-section py-12 px-8 md:px-24 text-center bg-[var(--color-surface)] relative z-10 shadow-sm border-y border-[var(--color-secondary)]/10 overflow-hidden -mt-2" id="products">
        {/* Decorative Bubbles for This Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="home-bubble home-bubble-1"></div>
          <div className="home-bubble home-bubble-2"></div>
          <div className="home-bubble home-bubble-3"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .home-bubble {
              position: absolute;
              background: var(--color-secondary);
              border-radius: 50%;
              opacity: 0.1;
              animation: float-bubble 25s infinite ease-in-out;
            }
            .home-bubble-1 { width: 150px; height: 150px; left: 5%; top: 10%; animation-delay: 0s; }
            .home-bubble-2 { width: 250px; height: 250px; right: -5%; top: 40%; animation-delay: 4s; }
            .home-bubble-3 { width: 100px; height: 100px; left: 40%; bottom: 5%; animation-delay: 2s; }
            @keyframes float-bubble {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(40px, -60px) scale(1.1); }
            }
          `
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-secondary)]/20">
            Premium Water Purifiers
          </div>
          <h2 className="text-4xl md:text-7xl text-[var(--color-secondary)] mb-6 font-bold font-[var(--font-heading)] drop-shadow-sm">Pure Water Solutions</h2>
          <p className="italic text-[var(--color-text-muted)] mb-16 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Advanced filtration technology ensuring every drop is pure, safe, and healthy for your family.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14 px-2 sm:px-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-96 bg-[var(--color-muted)] rounded-xl animate-pulse"></div>
              ))
            ) : (
              products.slice(0, 6).map((item) => (
                <div key={item._id} className="h-full transform hover:-translate-y-2 transition-transform duration-300">
                  <Suspense fallback={<div className="h-96 bg-[var(--color-muted)] rounded-xl animate-pulse"></div>}>
                    <LadduCard
                      product={{
                        id: item._id,
                        name: item.name,
                        img: item.mainImage?.url || '/src/assets/images/besan-laddu.png',
                        price: item.price,
                        finalPrice: item.finalPrice,
                        discountPercent: item.discountPercent,
                        priceStr: `₹${item.finalPrice}`,
                        description: item.description,
                        category: item.category?.name || 'Traditional'
                      }}
                    />
                  </Suspense>
                </div>
              ))
            )}
          </div>

          {!isLoading && products.length === 0 && (
            <div className="py-20 flex flex-col items-center">
              <p className="text-[var(--color-text-muted)] font-medium">No products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section ref={addToRefs} className="scroll-section py-16 px-8 md:px-24 bg-[var(--color-surface)] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-1">50,000+</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Happy Families</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-1">ISI</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Certified Quality</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-1">4.8/5</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Customer Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-1">24/7</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Service Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      {/* Our Technology Section */}
      <section ref={addToRefs} className="scroll-section bg-[var(--color-surface)] py-20 px-8 md:px-24 relative z-20 overflow-hidden mb-2" id="technology">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-6">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-12 bg-[var(--color-secondary)]"></div>
              <h4 className="text-[var(--color-secondary)] font-bold uppercase tracking-[0.6em] text-xs lg:text-sm">Advanced Technology</h4>
              <div className="h-[1px] w-12 bg-[var(--color-secondary)]"></div>
            </div>
            <h2 className="text-5xl md:text-9xl font-black text-[var(--color-text)] font-[var(--font-heading)] leading-none tracking-tighter">
              Pure Water <span className="text-[var(--color-primary)] drop-shadow-[0_4px_10px_rgba(5,150,105,0.2)]">Technology</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* Left Column: Multi-Image Grid with HD Quality Focus */}
            <div className="flex flex-col gap-6 h-full justify-center">
              <div className="relative group overflow-hidden rounded-[40px] shadow-2xl aspect-square">
                <Suspense fallback={<div className="w-full h-full bg-[var(--color-muted)] animate-pulse rounded-[40px]"></div>}>
                  <img src={water1} alt="Advanced Water Purification Technology" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-100" loading="lazy" />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-8">
                  <p className="text-white font-bold text-xl drop-shadow-lg">RO + UV + UF Technology</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-[30px] shadow-xl border-2 border-[var(--color-muted)] aspect-square">
                <Suspense fallback={<div className="w-full h-full bg-[var(--color-muted)] animate-pulse rounded-[30px]"></div>}>
                  <img src={water2} alt="Water Purifier Installation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </Suspense>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-6 left-8">
                  <p className="text-white font-bold text-lg drop-shadow-lg">Professional Installation</p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Story Blocks */}
            <div className="flex flex-col justify-center gap-12">
              <div className="space-y-6">
                <p className="text-2xl text-[var(--color-text)] leading-relaxed italic font-medium border-l-8 border-[var(--color-primary)] pl-8 bg-[var(--color-primary)]/5 py-4 rounded-r-2xl">
                  "Multi-stage purification technology that removes 99.9% of contaminants while retaining essential minerals for your family's health."
                </p>
                <div className="space-y-4">
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed opacity-90">
                    Our advanced water purifiers feature cutting-edge RO, UV, and UF technologies working together to eliminate bacteria, viruses, heavy metals, and dissolved impurities from your water supply.
                  </p>
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed opacity-90">
                    With smart monitoring systems and filter change indicators, our purifiers ensure consistent water quality while maintaining optimal performance and energy efficiency.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-muted)] hover:border-[var(--color-primary)]/40 transition-colors group">
                  <h4 className="text-[var(--color-primary)] font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-ping"></span>
                    RO Technology
                  </h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Reverse Osmosis removes <span className="text-[var(--color-primary)]">dissolved salts, heavy metals</span> and harmful chemicals for pure drinking water.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-muted)] hover:border-[var(--color-secondary)]/40 transition-colors">
                  <h4 className="text-[var(--color-secondary)] font-black text-xs uppercase tracking-widest mb-3">UV Sterilization</h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    UV light eliminates bacteria, viruses and microorganisms while preserving <span className="italic">essential minerals</span> naturally.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-muted)] hover:border-[var(--color-accent)]/40 transition-colors">
                  <h4 className="text-[var(--color-accent)] font-black text-xs uppercase tracking-widest mb-3">UF Filtration</h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Ultra-filtration removes suspended particles and provides additional protection against contaminants.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-[var(--color-muted)] hover:border-[var(--color-primary)]/40 transition-colors">
                  <h4 className="text-[var(--color-primary)] font-black text-xs uppercase tracking-widest mb-3">Smart Monitoring</h4>
                  <p className="text-[var(--color-text)] font-semibold leading-relaxed">
                    Digital display shows filter life, water quality status and maintenance alerts for optimal performance.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[40px] shadow-xl border border-[var(--color-muted)] relative overflow-hidden group">
                <div className="p-6 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/5 rounded-xl shadow-sm border-2 border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] transition-colors group">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 bg-[var(--color-primary)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Droplets className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--color-primary)] mb-1">99.9% Pure</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">Guaranteed purity with comprehensive filtration technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* <Suspense fallback={
        <div className="py-20 px-8 md:px-24 bg-white text-center border-y border-[var(--color-secondary)]/10">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <Loader text="Loading Loved Stories..." />
          </div>
        </div>
      }>
        <LazyVideoReviews addToRefs={addToRefs} isHomePage={true} />
      </Suspense> */}

      {/* As Seen On - Media Coverage Section */}


      {/* Why Choose Our Water Purifiers Section */}
      <section ref={addToRefs} className="scroll-section py-10 px-8 md:px-24 bg-[var(--color-surface)] relative z-10 shadow-sm mb-2" id="priorities">
        <h2 className="text-4xl text-[var(--color-secondary)] mb-16 font-bold text-center">Why Choose Our Water Purifiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[var(--color-muted)]">
            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">Advanced Filtration</h3>
            <p className="text-sm text-[var(--color-text)]">Multi-stage RO+UV+UF technology removes 99.9% of contaminants, bacteria, and viruses for pure water.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[var(--color-muted)]">
            <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Pure & Safe</h3>
            <p className="text-sm text-[var(--color-text)]">Crystal clear water that retains essential minerals while eliminating harmful chemicals and impurities.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[var(--color-muted)]">
            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-accent)] mb-2">Eco-Friendly</h3>
            <p className="text-sm text-[var(--color-text)]">Energy-efficient design with minimal water wastage and long-lasting filters for sustainable living.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[var(--color-muted)]">
            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">Family Care</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Trusted by thousands of families for providing healthy, great-tasting water for all ages.</p>
          </div>
        </div>
      </section>

      {/* Why Drink Unixa HydroLife Water Section */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-primary)]/20">
              Unixa HydroLife Benefits
            </div>
            <h2 className="text-4xl md:text-6xl text-[var(--color-text)] mb-6 font-bold font-[var(--font-heading)]">Why Drink <span className="text-[var(--color-primary)]">Unixa HydroLife</span> Water?</h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">Experience the power of ionized, antioxidant-rich water that transforms your health from the cellular level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Immunity Booster</h3>
              <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wide">Free Radical Scavengers</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">The antioxidant water from Hydrolife help neutralize free radicals by donating electrons and stabilize the molecule.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Create Wellness</h3>
              <h4 className="text-sm font-semibold text-[var(--color-secondary)] mb-3 uppercase tracking-wide">Immunity Powerhouse</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">The ionization process enriches the water with optimum minerals and antioxidants that improves your immune system.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Antioxidizing</h3>
              <h4 className="text-sm font-semibold text-[var(--color-accent)] mb-3 uppercase tracking-wide">Ultra Hydration</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">The water hydrates at the cellular level, supporting your body's natural detox processes and helping you feel your best all day long.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Low TDS Healthy Water</h3>
              <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wide">Lifelong Investment</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">ZeroB Hydrolife is an investment in your well-being. The water ionizer provides hydration, balance body pH and maintain peak wellness every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-[var(--color-surface)] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-[var(--color-text)] mb-6 font-bold font-[var(--font-heading)]">Health <span className="text-[var(--color-secondary)]">Benefits</span></h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">Discover how pure, ionized water can transform your health and well-being with scientifically proven benefits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 p-8 rounded-2xl border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">Enhanced Immunity</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Antioxidant-rich water strengthens your immune system and helps fight against diseases naturally.</p>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-accent)]/10 p-8 rounded-2xl border border-[var(--color-secondary)]/20 hover:border-[var(--color-secondary)]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-xl flex items-center justify-center mb-4">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">Better Hydration</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Micro-clustered water molecules provide superior cellular hydration and nutrient absorption.</p>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-primary)]/10 p-8 rounded-2xl border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-accent)] rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">Improved Energy</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Balanced pH levels and optimal hydration boost your energy levels throughout the day.</p>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 p-8 rounded-2xl border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">Natural Detox</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Supports your body's natural detoxification processes and eliminates harmful toxins.</p>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-primary)]/10 p-8 rounded-2xl border border-[var(--color-secondary)]/20 hover:border-[var(--color-secondary)]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">Anti-Aging</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Antioxidants help reduce oxidative stress and slow down the aging process naturally.</p>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-secondary)]/10 p-8 rounded-2xl border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--color-accent)] rounded-xl flex items-center justify-center mb-4">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">Heart Health</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Proper hydration and mineral balance support cardiovascular health and circulation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-gradient-to-br from-[var(--color-secondary)]/5 to-[var(--color-primary)]/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-secondary)]/20">
              Professional Services
            </div>
            <h2 className="text-4xl md:text-6xl text-[var(--color-text)] mb-6 font-bold font-[var(--font-heading)]">Our <span className="text-[var(--color-secondary)]">Services</span></h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">Complete water purifier solutions with professional installation, maintenance, and lifetime support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] text-center group hover:scale-105">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Free Installation</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Professional installation by certified technicians at your doorstep, completely free of charge.</p>
              <div className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wide">✓ Same Day Service</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] text-center group hover:scale-105">
              <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Regular Maintenance</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Scheduled cleaning, filter replacement, and system optimization to ensure peak performance.</p>
              <div className="text-xs text-[var(--color-secondary)] font-semibold uppercase tracking-wide">✓ Monthly Service</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] text-center group hover:scale-105">
              <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">24/7 Support</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Round-the-clock customer support and emergency service for any water purifier issues.</p>
              <div className="text-xs text-[var(--color-accent)] font-semibold uppercase tracking-wide">✓ Emergency Service</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--color-muted)] text-center group hover:scale-105">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Extended Warranty</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Comprehensive warranty coverage with extended protection plans for complete peace of mind.</p>
              <div className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wide">✓ 5 Year Warranty</div>
            </div>
          </div>

          <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg border border-[var(--color-muted)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">10,000+</div>
                <div className="text-sm text-[var(--color-text-muted)] uppercase tracking-wide">Installations Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--color-secondary)] mb-2">99.8%</div>
                <div className="text-sm text-[var(--color-text-muted)] uppercase tracking-wide">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">24hrs</div>
                <div className="text-sm text-[var(--color-text-muted)] uppercase tracking-wide">Average Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Suspense fallback={
        <div className="py-20 px-4 md:px-24 bg-zinc-950 flex flex-col items-center justify-center border-y border-[var(--color-secondary)]/20">
          <Loader text="Crafting Brand Legacy..." />
        </div>
      }>
        <BrandAdvertisement addToRefs={addToRefs} />
      </Suspense> */}



      <Suspense fallback={<div className="h-64 bg-[var(--color-surface)] animate-pulse border-t border-[var(--color-secondary)]/10"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;