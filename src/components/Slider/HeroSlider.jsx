import React, { useEffect, useState, memo, useCallback } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { getActiveSlidersApi } from '../../api/slider';

// Import Slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import waterslider1 from '../../assets/images/waterslider1.jpg';
import waterslider2 from '../../assets/images/waterslider2.jpg';


const HeroSlider = memo(() => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSliders = useCallback(async () => {
        try {
            const data = await getActiveSlidersApi();
            setSliders(data.sliders || []);
        } catch (error) {
            console.error("Failed to fetch sliders:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSliders();
    }, [fetchSliders]);

    // custom slider 
    let customSlider = [waterslider1, waterslider2]

    if (loading) {
        return (
            <section className="relative w-full aspect-[3/1] bg-gray-200 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (sliders.length === 0) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dotsClass: "slick-dots custom-dots-container",
    };

    return (
        <section className="relative w-full slider-container overflow-hidden">
            <Slider {...settings}>
                {customSlider.map((slider) => (
                    <div key={slider._id} className="relative w-full outline-none">
                        {/* Fluid Ratio Container - Matches shuddhswad.shop logic */}
                        <div className="relative w-full aspect-[3/1] lg:aspect-[21/7] overflow-hidden">
                            <img
                                src={slider}
                                alt={'Unixa'}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[4%] md:pb-[5%]">
                                <div className="px-4 flex flex-row justify-center items-center gap-3 md:gap-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                                    <Link
                                        to="/shop"
                                        className="inline-flex items-center justify-center px-4 py-2 md:px-10 md:py-4 bg-[var(--color-primary)] text-white rounded-full text-[10px] md:text-xl font-bold shadow-xl hover:scale-105 transition-all hover:bg-[var(--color-secondary)]"
                                    >
                                        Explore Products
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center px-4 py-2 md:px-10 md:py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[10px] md:text-xl font-bold shadow-lg hover:scale-105 transition-all hover:bg-white/40"
                                    >
                                        Book Free Demo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <style>{`
                .custom-dots-container {
                    bottom: 10px !important;
                }
                .custom-dots-container li {
                    margin: 0 4px;
                    display: inline-block;
                }
                .slick-dots li button {
                    width: 6px;
                    height: 6px;
                    padding: 0;
                    background: rgba(255,255,255,0.4);
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .slick-dots li.slick-active button {
                    background: var(--color-secondary);
                    width: 18px;
                    border-radius: 4px;
                }
                .slick-dots li button:before {
                    content: '' !important;
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            `}</style>
        </section>
    );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
