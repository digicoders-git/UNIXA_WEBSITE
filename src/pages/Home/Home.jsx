import React, { useEffect, useRef, useState, memo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import api from '../../services/api';
import { Shield, Droplets, Settings, Phone, Wrench, CheckCircle2, ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

import { throttle } from '../../utils/performance';
// Lazy load all heavy components
const Footer = lazy(() => import('../../components/layout/Footer'));
const ProductCard = lazy(() => import('../../components/cards/PurifierCard'));
const HeroSlider = lazy(() => import('../../components/Slider/HeroSlider'));
const FeaturedBlogs = lazy(() => import('../../components/common/FeaturedBlogs'));
import UnixaBrand from '../../components/common/UnixaBrand';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Import images directly
import water2 from '../../assets/images/mhImage.png';

import iconIndian from '../../assets/images/features/indian_built.svg';
import iconPlatinum from '../../assets/images/features/platinum_tech.svg';
import iconPh from '../../assets/images/features/ph_modes.svg';
import iconNano from '../../assets/images/features/pure_nano.svg';
import iconElite from '../../assets/images/features/elite_style.svg';
import iconFast from '../../assets/images/features/fast_ship.svg';
import iconCare from '../../assets/images/features/pro_care.svg';
import iconDigi from '../../assets/images/features/digital_iq.svg';

const Home = memo(() => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);


  // Dynamic Products State
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [sliderReviews, setSliderReviews] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // VITE_API_URL is expected to include /api, e.g., http://localhost:5000/api
        const { data } = await api.get('/products');
        if (data && data.products) {
          // Show top 3 products for the home page showcase as requested
          setProducts(data.products.slice(0, 3));
        }

      } catch (error) {
        // Silently handle error
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews/all');
        if (data.success) {
          setReviews(data.reviews);
        }
      } catch (error) {
        // Silently handle error
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchSliderReviews = async () => {
      try {
        const { data } = await api.get('/reviews/slider');
        if (data.success) {
          setSliderReviews(data.reviews);
        }
      } catch (error) {
        // Silently handle error
      }
    };
    fetchSliderReviews();
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await api.get('/certificates/active');
        if (Array.isArray(data)) {
          setCertificates(data);
        }
      } catch (error) {
        // Silently handle error
      }
    };
    fetchCertificates();
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-24"
          >
            <h4 className="text-[var(--color-primary)] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">The Purest Choice</h4>
            <h2 className="text-3xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase leading-none">
              OUR <span className="text-[var(--color-primary)]">Purifiers</span>
            </h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {products.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <Suspense fallback={<div className="h-80 bg-slate-100/50 rounded-2xl animate-pulse"></div>}>
                  <ProductCard product={item} />
                </Suspense>
              </motion.div>
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
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <div className="rounded-[30px] overflow-hidden shadow-xl border-4 border-white w-full max-w-[450px]">
                <img src={water2} alt="Wellness" className="w-full h-auto block" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 order-1 lg:order-2"
            >
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
            </motion.div>
          </div>
        </div>
      </section>


      {/* Technology Section - Industrial/Clean Look */}
      <section ref={addToRefs} className="scroll-section py-8 px-8 md:px-24 bg-white" id="technology">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
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
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="rounded-[30px] overflow-hidden shadow-xl border border-slate-100 max-w-[450px]">
                <img src={water2} alt="Technology" className="w-full h-auto block grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Row-wise on Mobile */}
      <section className="py-12 px-6 md:px-24 bg-[#F8FAFC] border-y border-slate-200" id="priorities">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 space-y-3"
          >
            <h2 className="text-2xl md:text-5xl font-bold tracking-tighter uppercase text-[var(--color-secondary)]">Why Choose <UnixaBrand /></h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
            {[
              { t: "INDIAN BUILT", d: "Tuned for water", img: iconIndian },
              { t: "PLATINUM TECH", d: "Pure Efficiency", img: iconPlatinum },
              { t: "PH MODES", d: "Healthy Options", img: iconPh },
              { t: "PURE+ NANO", d: "11-Stage Filter", img: iconNano },
              { t: "ELITE STYLE", d: "Premium Design", img: iconElite },
              { t: "FAST SHIP", d: "Pan India", img: iconFast },
              { t: "PRO CARE", d: "Expert help", img: iconCare },
              { t: "DIGITAL IQ", d: "Live Monitor", img: iconDigi }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center md:flex-col md:text-center p-4 md:p-8 bg-white border border-slate-200 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="p-2 md:p-4 rounded-lg md:rounded-2xl bg-slate-50 transition-all shrink-0">
                  <img src={item.img} alt={item.t} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>
                <div className="ml-4 md:ml-0 md:mt-4">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-widest leading-none mb-1 md:mb-2">{item.t}</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider hidden md:block">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-6 md:px-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full mx-auto">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600">Customer Reviews</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold tracking-tighter uppercase text-[var(--color-secondary)]">What Our <span className="text-[var(--color-primary)]">Customers Say</span></h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </motion.div>

          {(sliderReviews.length > 0 || reviews.filter(r => r.isApproved).length > 0) ? (
            <div className="relative group">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                speed={800}
                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={{
                  prevEl: '.review-prev',
                  nextEl: '.review-next',
                }}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-4"
              >
                {(sliderReviews.length > 0 ? sliderReviews : reviews.filter(r => r.isApproved)).map((review, i) => (
                  <SwiperSlide key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-full flex flex-col shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500"
                    >
                      <Quote className="text-[var(--color-primary)]/10 mb-4" size={40} />
                      <div className="flex gap-1 mb-4">
                        {[...Array(review.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-600 font-medium italic mb-6 leading-relaxed flex-grow">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg uppercase">
                          {review.user[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--color-secondary)] text-sm">{review.user}</h4>
                          <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">{review.role || "Verified Buyer"}</p>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="review-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-xl text-slate-900 transition-all opacity-0 group-hover:opacity-100 hover:bg-slate-900 hover:text-white hover:border-slate-900">
                <ChevronLeft size={20} />
              </button>
              <button className="review-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-xl text-slate-900 transition-all opacity-0 group-hover:opacity-100 hover:bg-slate-900 hover:text-white hover:border-slate-900">
                <ChevronRight size={20} />
              </button>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <Star size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">No Reviews Yet</h3>
              <p className="text-slate-500">Be the first to share your experience with UNIXA water purifiers!</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Section - Row-wise on Mobile */}
      <section ref={addToRefs} className="py-16 px-8 md:px-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-2xl md:text-6xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase leading-none">OUR <span className="text-[var(--color-primary)]">Services</span></h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-10">
            {[
              { t: "FREE SETUP", icon: <Settings /> },
              { t: "CHECKUP", icon: <Wrench /> },
              { t: "24/7 CARE", icon: <Phone /> },
              { t: "WARRANTY", icon: <Shield /> }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="flex items-center md:flex-col md:text-center p-4 md:p-8 bg-slate-50 rounded-2xl md:rounded-[3rem] border border-slate-200 group hover:bg-white hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-sm border border-slate-100 shrink-0">
                  {React.cloneElement(s.icon, { size: 20 })}
                </div>
                <div className="ml-4 md:ml-0 md:mt-6">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase text-[var(--color-secondary)]">{s.t}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Slider */}
      <section className="py-16 px-8 md:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-2xl md:text-5xl font-bold text-[var(--color-secondary)] tracking-tighter uppercase">Our <span className="text-[var(--color-primary)]">Certifications</span></h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </motion.div>

          {certificates.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={certificates.length > 5}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {certificates.map((cert, i) => (
              <SwiperSlide key={cert._id || i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-200 flex items-center justify-center h-32 hover:shadow-xl transition-all"
                >
                  {cert.imageUrl ? (
                    <img src={cert.imageUrl} alt={cert.title} className="max-h-20 max-w-full object-contain" />
                  ) : (
                    <h3 className="text-xl font-bold text-[var(--color-secondary)]">{cert.title}</h3>
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 text-sm">No certifications available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Blogs Section */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse"></div>}>
        <FeaturedBlogs />
      </Suspense>

      <Suspense fallback={<div className="h-48 bg-white animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
// Updated for dynamic catalog sync
