import React from 'react';
import Hyperspeed from './Hyperspeed';
import { hyperspeedPresets } from './HyperspeedPresets';

export default function LandingPage({ onEnter, isTamil }) {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Hyperspeed Background */}
            <div className="absolute inset-0 z-0">
                <Hyperspeed effectOptions={hyperspeedPresets.one} />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
                <div className="animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        Mind2Design
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-xl mx-auto font-medium">
                        {isTamil
                            ? "உங்கள் டிசைன் எண்ணங்களை அப்படியே ப்ராம்ப்டாக மாற்றவும்."
                            : "Transform your design intent from mind to prompt instantly."}
                    </p>

                    <button
                        onClick={onEnter}
                        className="group relative px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10">
                            {isTamil ? "தொடங்கவும்" : "Get Started"}
                        </span>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    </button>
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-10 left-0 right-0 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">
                        Built for South Indian Creative Excellence
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
