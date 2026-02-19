import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import api from '../../services/api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import unixaHero from '../../assets/images/unixaHero.jpg';
import UnixaBrand from '../common/UnixaBrand';

const HeroSlider = memo(() => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const res = await api.get('/sliders');
                if (res.data && res.data.sliders && res.data.sliders.length > 0) {
                    setSliders(res.data.sliders);
                }
            } catch (error) {
                console.error("Failed to fetch sliders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: false,
        pauseOnHover: false
    };

    return (
        <section className="relative w-full bg-white">
            <div className="relative w-full overflow-hidden h-[50vh] md:h-auto lg:h-[550px]">
                
                {/* Animated Water Wave Video Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        style={{ pointerEvents: 'none' }}
                    >
                        <source src="https://videos.pexels.com/video-files/6985295/6985295-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-blue-700/30"></div>
                </div>
                
                {!loading && sliders.length > 0 ? (
                    <Slider {...settings} className="w-full h-full">
                        {sliders.map(slide => (
                            <div key={slide._id} className="relative w-full h-full outline-none">
                                {/* Background Media */}
                                <div className="absolute inset-0 w-full h-full z-10">
                                    {slide.video?.url ? (
                                        <video
                                            src={slide.video.url}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-[50vh] md:h-auto lg:h-[550px] object-cover object-center block"
                                        />
                                    ) : slide.image?.url ? (
                                        <img 
                                            src={slide.image.url} 
                                            alt={slide.title} 
                                            className="w-full h-[50vh] md:h-auto lg:h-[550px] object-cover object-center block"
                                        />
                                    ) : null}
                                </div>
                                
                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex items-end md:items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/80 md:to-transparent z-20">
                                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-8 md:pb-0 text-center md:text-left">
                                        <div className="max-w-xl animate-fade-in-slider">
                                            <h1 
                                                className="text-2xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight md:leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
                                                style={{ color: slide.titleColor || '#ffffff' }}
                                            >
                                                {slide.title}
                                            </h1>
                                            {slide.subtitle && (
                                                <p 
                                                    className="text-base md:text-2xl lg:text-3xl font-bold mt-3 md:mt-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                                                    style={{ color: slide.subtitleColor || '#ffffff' }}
                                                >
                                                    {slide.subtitle}
                                                </p>
                                            )}
                                            {slide.buttonText && (
                                                <div className="mt-6 md:mt-10">
                                                    <Link
                                                        to={slide.linkUrl || '/purifiers'}
                                                        className="px-8 md:px-12 py-3 md:py-5 bg-white text-blue-600 rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block"
                                                    >
                                                        {slide.buttonText}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="relative w-full h-full">
                        {/* Fallback Static Image */}
                        <img
                            src={unixaHero}
                            alt="Welcome to UNIXA"
                            className="absolute inset-0 w-full h-[50vh] md:h-auto lg:h-[550px] object-cover object-center block z-10"
                            loading="eager"
                        />
                        
                        {/* Fallback Content */}
                        <div className="absolute inset-0 flex items-end md:items-center bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent z-20">
                            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-8 md:pb-0 text-center md:text-left">
                                <div className="max-w-xl animate-fade-in-slider">
                                    <h1 className="text-xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-none drop-shadow-2xl mb-1 text-white">
                                        <span className="opacity-90 text-[10px] md:text-4xl uppercase tracking-[0.2em] font-medium">Welcome to</span> <br />
                                        <UnixaBrand color="white" className="text-3xl md:text-6xl lg:text-8xl mt-1 md:mt-2" />
                                    </h1>
                                    <div className="mt-4 md:mt-8">
                                        <Link
                                            to="/purifiers"
                                            className="px-6 md:px-10 py-2.5 md:py-4 bg-[var(--color-primary)] text-white rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all inline-block"
                                        >
                                            Explore Models
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fade-in-up-slider {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-slider {
                    animation: fade-in-up-slider 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .slick-slider, .slick-list, .slick-track, .slick-slide > div {
                    height: 100%;
                }
            `}</style>
        </section>
    );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
