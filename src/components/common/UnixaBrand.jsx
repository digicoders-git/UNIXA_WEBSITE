import React from 'react';

// Exclusive Stylish Brand Word Component
const UnixaBrand = ({ className = "", color = "var(--color-secondary)", size = "1em" }) => (
    <span className={`inline-flex items-center font-black ${className}`} style={{ fontSize: size }}>
        <span className="relative flex items-center justify-center">
            <span className="text-[var(--color-primary)] drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] transform -rotate-6 italic text-[1.2em]">U</span>
            <span className="absolute -bottom-1 w-full h-0.5 bg-[var(--color-primary)]/30 rounded-full scale-x-125"></span>
        </span>
        <span style={{ color }} className="tracking-[0.25em] ml-2 opacity-90 font-extrabold uppercase leading-none">nixa</span>
    </span>
);

export default UnixaBrand;
