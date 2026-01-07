import React from 'react';
import { translations } from '../utils/translations';

export default function Header({ view, setView, isTamil, setIsTamil }) {
    const t = translations[isTamil ? 'ta' : 'en'];

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200/80 dark:border-slate-800/80 px-4 md:px-10 py-3 backdrop-blur-md bg-white/70 dark:bg-background-dark/70 sticky top-0 z-50">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white cursor-pointer" onClick={() => setView('home')}>
                <div className="text-primary size-8 relative flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" className="fill-primary/20" />
                        <path d="M12 4C10.5 4 9.1 4.5 8 5.4C8 6.5 8.5 7.5 9.5 8C10.5 8.5 12 8.5 13 8C14 7.5 14.5 6.5 14.5 5.4C13.4 4.5 12 4 12 4Z" fill="currentColor" />
                        <path d="M12 20C13.5 20 14.9 19.5 16 18.6C16 17.5 15.5 16.5 14.5 16C13.5 15.5 12 15.5 11 16C10 16.5 9.5 17.5 9.5 18.6C10.6 19.5 12 20 12 20Z" fill="currentColor" />
                        <path d="M4 12C4 13.5 4.5 14.9 5.4 16C6.5 16C7.5 15.5 8 14.5 8.5 13.5C9 12.5 9 11 8.5 10C8 9 7.5 8.5 6.5 8.5C5.4 9.6 4 11 4 12Z" fill="currentColor" />
                        <path d="M20 12C20 10.5 19.5 9.1 18.6 8C17.5 8 16.5 8.5 16 9.5C15.5 10.5 15.5 12 16 13C16.5 14 17.5 14.5 18.6 14.5C19.5 13.4 20 12 20 12Z" fill="currentColor" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
                    </svg>
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse -z-10"></div>
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
