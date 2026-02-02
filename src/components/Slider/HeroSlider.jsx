import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
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
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const res = await axios.get(`${apiUrl}/sliders`);
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
                
                {/* Dynamic Background Image Layer */}
                {!loading && sliders.length > 0 ? (
                     <div className="absolute inset-0 w-full h-full">
                         <Slider {...settings} className="w-full h-full">
                            {sliders.map(slide => (
                                <div key={slide._id} className="w-full h-full outline-none">
                                    <img 
                                        src={slide.image.url} 
                                        alt="UNIXA Banner" 
                                        className="w-full h-[50vh] md:h-auto lg:h-[550px] object-cover object-center block"
                                    />
                                </div>
                            ))}
                         </Slider>
                     </div>
                ) : (
                    /* Fallback Static Image */
                    <img
                        src={unixaHero}
                        alt="Welcome to UNIXA"
                        className="w-full h-[50vh] md:h-auto lg:h-[550px] object-cover object-center block"
                        loading="eager"
                    />
                )}

                {/* Static Content Overlay (Exact Original Design) */}
                <div className="absolute inset-0 flex items-end md:items-center bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent pointer-events-none">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-8 md:pb-0 text-center md:text-left">
                        <div className="max-w-xl animate-fade-in-slider pointer-events-auto">
                            <h1
                                className="text-xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-none drop-shadow-2xl mb-1 text-white"
                                style={{ color: 'white' }}
                            >
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

            <style>{`
                @keyframes fade-in-up-slider {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-slider {
                    animation: fade-in-up-slider 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                /* Ensure slider takes full height */
                .slick-slider, .slick-list, .slick-track, .slick-slide > div {
                    height: 100%;
                }
            `}</style>
        </section>
    );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
