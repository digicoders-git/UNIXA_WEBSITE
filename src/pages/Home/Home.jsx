import React, { useEffect, useRef, useState, memo, useCallback, lazy, Suspense } from 'react';
import { Shield, Droplets, Leaf, Heart as HeartIcon, Star, Award, Users, Zap, Activity, Sparkles, RefreshCw, Settings, Phone, Wrench, Clock } from 'lucide-react';
import { listProductsApi } from '../../api/product';
import { debounce, throttle } from '../../utils/performance';

// Lazy load all heavy components
const Footer = lazy(() => import('../../components/layout/Footer'));
const LadduCard = lazy(() => import('../../components/cards/LadduCard'));
const HeroSlider = lazy(() => import('../../components/Slider/HeroSlider'));
import Loader from '../../components/common/Loader';

// Import images directly
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
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 text-center bg-[var(--color-surface)] relative z-10 shadow-sm overflow-hidden" id="products">
        {/* Decorative Wave Background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none opacity-5">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126.33,212.21,116.36,251.35,110.37,285.95,95.15,321.39,56.44Z" className="fill-[var(--color-primary)]"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-primary)]/20">
            Premium Alkaline Water Ionizers
          </div>
          <h2 className="text-4xl md:text-7xl text-[var(--color-secondary)] mb-6 font-bold font-[var(--font-heading)] drop-shadow-sm">Explore Our Products</h2>
          <p className="text-[var(--color-text-muted)] mb-16 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Discover the perfect alkaline water solution for your home, engineered for Indian water conditions.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14 px-2 sm:px-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-96 bg-[var(--color-muted)] rounded-xl animate-pulse"></div>
              ))
            ) : (
              products.slice(0, 3).map((item) => (
                <div key={item._id} className="h-full transform hover:-translate-y-2 transition-transform duration-300">
                  <Suspense fallback={<div className="h-96 bg-[var(--color-muted)] rounded-xl animate-pulse"></div>}>
                    <LadduCard
                      product={{
                        id: item._id,
                        name: item.name,
                        img: item.mainImage?.url,
                        price: item.price,
                        finalPrice: item.finalPrice,
                        discountPercent: item.discountPercent,
                        priceStr: `₹${item.finalPrice}`,
                        description: item.description,
                        category: item.category?.name || 'Alkaline'
                      }}
                    />
                  </Suspense>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Our Philosophy/Introduction Section */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-[var(--color-muted)]/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-primary)]/10 rounded-full blur-3xl"></div>
              <img src={water2} alt="Unixa Philosophy" className="relative z-10 rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl z-20 hidden md:block border border-[var(--color-primary)]/20">
                <p className="text-4xl font-bold text-[var(--color-primary)] mb-1">25+</p>
                <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Years of Purity</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-sm">Our Philosophy</h4>
                <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-heading)] leading-tight">
                  Water that is <span className="text-[var(--color-primary)]">crafted for you</span>, crafted by you
                </h2>
              </div>
              <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                Unixa HydroLife Ionized Water Machines are engineered for Indian water sources, offering efficient filtration and ionization to ensure that every drop is pure, alkaline, and rich in antioxidants.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[var(--color-primary)]/10 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Unixa Philosophy</h5>
                    <p className="text-sm text-[var(--color-text-muted)]">Achieving purity begins with achieving Zero Compromise in everything we do.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[var(--color-secondary)]/10 p-2 rounded-lg">
                    <Droplets className="w-5 h-5 text-[var(--color-secondary)]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">#CraftYourWater</h5>
                    <p className="text-sm text-[var(--color-text-muted)]">Catering to different pH ranges of water along with an enhanced water taste.</p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[var(--color-secondary)] transition-all">
                Learn More About Us <RefreshCw className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section ref={addToRefs} className="scroll-section py-16 px-8 md:px-24 bg-[var(--color-muted)]/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--color-primary)]/20 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-1">50,000+</h3>
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Happy Families</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--color-secondary)]/20 group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10 text-[var(--color-secondary)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-1">BIS</h3>
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Certified Quality</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--color-accent)]/20 group-hover:scale-110 transition-transform">
                <Star className="w-10 h-10 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-1">4.9/5</h3>
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Customer Rating</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--color-primary)]/20 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-1">24/7</h3>
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section ref={addToRefs} className="scroll-section bg-[var(--color-surface)] py-20 px-8 md:px-24 relative z-20 overflow-hidden mb-2" id="technology">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-6">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-[1px] w-12 bg-[var(--color-primary)]"></div>
              <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.6em] text-xs lg:text-sm">Advanced Technology</h4>
              <div className="h-[1px] w-12 bg-[var(--color-primary)]"></div>
            </div>
            <h2 className="text-5xl md:text-9xl font-black text-[var(--color-text)] font-[var(--font-heading)] leading-none tracking-tighter">
              Alkaline <span className="text-[var(--color-primary)] drop-shadow-[0_4px_10px_rgba(14,165,233,0.3)]">Technology</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* Left Column: Multi-Image Grid with HD Quality Focus */}
            <div className="flex flex-col gap-6 h-full justify-center">
              <div className="relative group overflow-hidden rounded-[40px] shadow-2xl aspect-square">
                <Suspense fallback={<div className="w-full h-full bg-[var(--color-muted)] animate-pulse rounded-[40px]"></div>}>
                  <img src={water2} alt="Advanced Water Purification Technology" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-100" loading="lazy" />
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


      {/* Why Choose Unixa HydroLife Section */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24 bg-[var(--color-surface)] relative z-10 overflow-hidden" id="priorities">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl text-[var(--color-secondary)] mb-6 font-bold">Why Choose Unixa HydroLife?</h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">The best alkaline water machine in India, combining research expertise and technology innovation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Point 1: Made in India */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-primary)]/20 group-hover:bg-[var(--color-primary)] group-hover:rotate-6 transition-all duration-500">
                < Award className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Made in India</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Engineered specifically for Indian water conditions and power stability.</p>
            </div>

            {/* Point 2: Ionizer Plates */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30">
              <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-secondary)]/20 group-hover:bg-[var(--color-secondary)] group-hover:rotate-6 transition-all duration-500">
                <Zap className="w-7 h-7 text-[var(--color-secondary)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Platinum Plates</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">High-quality platinum-coated titanium plates for superior ionization efficiency.</p>
            </div>

            {/* Point 3: 5 Types of Water */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30">
              <div className="w-14 h-14 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-accent)]/20 group-hover:bg-[var(--color-accent)] group-hover:rotate-6 transition-all duration-500">
                <Droplets className="w-7 h-7 text-[var(--color-accent)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">5+ Water Types</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Craft your water with adjustable pH levels from 3.5 to 10.5 for all your needs.</p>
            </div>

            {/* Point 4: Purification Options */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-primary)]/20 group-hover:bg-[var(--color-primary)] group-hover:rotate-6 transition-all duration-500">
                <Shield className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pure+ Technology</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Multi-stage purification including UV and ultra-filtration for maximum safety.</p>
            </div>

            {/* Point 5: Product Design */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30">
              <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-secondary)]/20 group-hover:bg-[var(--color-secondary)] group-hover:rotate-6 transition-all duration-500">
                <Settings className="w-7 h-7 text-[var(--color-secondary)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Elegant Design</h3>
              <h4 className="text-[10px] font-bold text-[var(--color-secondary)] mb-2 uppercase tracking-widest">Premium Aesthetic</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Sleek, modern design that complements your premium kitchen decor.</p>
            </div>

            {/* Point 6: Doorstep Delivery */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30">
              <div className="w-14 h-14 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-accent)]/20 group-hover:bg-[var(--color-accent)] group-hover:rotate-6 transition-all duration-500">
                < Droplets className="w-7 h-7 text-[var(--color-accent)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Delivery</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Hassle-free doorbell delivery across all major cities in India.</p>
            </div>

            {/* Point 7: Trusted Care */}
            <div className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] hover:border-[var(--color-primary)]/30 lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="w-20 h-20 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center border-4 border-[var(--color-primary)]/20 group-hover:scale-110 transition-transform">
                  <HeartIcon className="w-10 h-10 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Trusted Care Solutions</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">Expert service network with 24/7 support and annual maintenance guarantee for absolute peace of mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Drink Unixa HydroLife Water Section */}
      <section ref={addToRefs} className="scroll-section py-20 px-8 md:px-24 bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-secondary)]/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-primary)]/20">
              Unixa HydroLife Benefits
            </div>
            <h2 className="text-4xl md:text-6xl text-[var(--color-text)] mb-6 font-bold font-[var(--font-heading)]">Why Drink <span className="text-[var(--color-primary)]">Unixa HydroLife</span> Water?</h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">Experience the power of ionized, antioxidant-rich water that transforms your health from the cellular level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] group hover:-translate-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Immunity Booster</h3>
              <h4 className="text-xs font-bold text-[var(--color-primary)] mb-3 uppercase tracking-widest">Free Radical Scavengers</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">The antioxidant water from HydroLife helps neutralize free radicals by donating electrons and stabilizing molecules.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] group hover:-translate-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Create Wellness</h3>
              <h4 className="text-xs font-bold text-[var(--color-secondary)] mb-3 uppercase tracking-widest">Immunity Powerhouse</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">The ionization process enriches the water with optimum minerals and antioxidants that improve your immune system.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] group hover:-translate-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Antioxidizing</h3>
              <h4 className="text-xs font-bold text-[var(--color-accent)] mb-3 uppercase tracking-widest">Ultra Hydration</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">HydroLife water hydrates at the cellular level, supporting natural detox processes and helping you feel your best.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[var(--color-muted)] group hover:-translate-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Low TDS Water</h3>
              <h4 className="text-xs font-bold text-[var(--color-primary)] mb-3 uppercase tracking-widest">Healthy minerals</h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">HydroLife provides mineral-rich hydration that helps balance body pH and maintain peak wellness every day.</p>
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

      <Suspense fallback={<div className="h-64 bg-[var(--color-surface)] animate-pulse border-t border-[var(--color-secondary)]/10"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;