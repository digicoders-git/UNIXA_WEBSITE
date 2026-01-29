import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import unixaHero from '../../assets/images/unixaHero.jpg';

const HeroSlider = memo(() => {
    return (
        <section className="relative w-full bg-white">
            {/* 
                Responsive Image Container
                - Mobile: Natural height (h-auto) to avoid any cropping.
                - Desktop (lg): Fixed height (max-h) with object-cover to prevent it from taking too much vertical space.
            */}
            <div className="relative w-full lg:h-[550px] overflow-hidden">
                <img
                    src={unixaHero}
                    alt="Welcome to UNIXA"
                    className="w-full h-auto lg:h-full lg:object-cover lg:object-center block"
                    loading="eager"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center bg-black/30">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                        <div className="max-w-xl animate-fade-in drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
                                Welcome to <br />
                                <span className="text-[var(--color-primary)]">UNIXA</span>
                            </h1>
                            <p className="text-white font-black text-[10px] md:text-lg uppercase tracking-[0.3em] mt-3 md:mt-4 bg-black/20 inline-block px-2 py-1 rounded backdrop-blur-sm">
                                Pure Water. Crafted for Life.
                            </p>

                            <div className="mt-8 hidden md:block">
                                <Link
                                    to="/purifiers"
                                    className="px-10 py-4 bg-[var(--color-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all"
                                >
                                    Explore Models
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View Bottom Action */}
            <div className="md:hidden p-6 text-center bg-white border-b border-slate-100 flex flex-col gap-4">
                <h1 className="text-2xl font-black text-[var(--color-secondary)] tracking-tight">
                    Welcome to <span className="text-[var(--color-primary)]">UNIXA</span>
                </h1>
                <Link
                    to="/purifiers"
                    className="inline-block w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
                >
                    Start Shopping
                </Link>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
            `}</style>
        </section>
    );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
