import React from 'react';
import { translations } from '../utils/translations';

export default function Header({ view, setView, isTamil, setIsTamil }) {
    const t = translations[isTamil ? 'ta' : 'en'];

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200/80 dark:border-slate-800/80 px-4 md:px-10 py-3 backdrop-blur-md bg-white/70 dark:bg-background-dark/70 sticky top-0 z-50">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white cursor-pointer" onClick={() => setView('home')}>
                <div className="text-primary size-8 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(234,42,51,0.5)]">
                        {/* 3D Isometric Cube */}
                        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" className="opacity-20" />
                        <path d="M12 2L4 7L12 12V22L20 17V7L12 2Z" fill="currentColor" fillOpacity="0.8" />
                        <path d="M12 12L20 7L12 2L4 7L12 12Z" fill="currentColor" fillOpacity="0.4" />
                        <path d="M12 12V22L4 17V7L12 12Z" fill="currentColor" fillOpacity="0.6" />
                        {/* Wireframe edges for extra detail */}
                        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
                        <path d="M12 12L4 7M12 12L20 7M12 12V22" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
                    </svg>
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full -z-10 group-hover:bg-primary/20 transition-colors"></div>
                </div>
                <h2 className="text-lg font-bold tracking-tight">{t.title}</h2>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsTamil(!isTamil)}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md active:scale-95"
                    >
                        {isTamil ? 'English' : 'தமிழ்'}
                    </button>
                    <button className="flex items-center justify-center rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 gap-2 text-sm font-bold min-w-0 px-2.5 hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-xl">help</span>
                    </button>
                </div>
            </div>


        </header>
    );
}
