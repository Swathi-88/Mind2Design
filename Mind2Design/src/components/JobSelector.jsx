import React from 'react';
import { translations } from '../utils/translations';

const JOB_TYPES = [
    { id: 'festival', icon: 'celebration' },
    { id: 'crackers', icon: 'package_2' },
    { id: 'funeral', icon: 'person_remove' },
    { id: 'business', icon: 'storefront' },
    { id: 'event', icon: 'event' },
    { id: 'custom', icon: 'add_circle' }
];

export default function JobSelector({ onSelect, isTamil }) {
    const t = translations[isTamil ? 'ta' : 'en'];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-4xl md:text-5xl font-bold leading-tight text-center pb-6 pt-12 md:pt-20">
                {t.home_headline}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {JOB_TYPES.map((job) => (
                    <div
                        key={job.id}
                        onClick={() => onSelect({ ...job, title: t[job.id] })}
                        className="group relative flex cursor-pointer flex-col gap-4 p-6 bg-white dark:bg-background-dark/50 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                <span className="material-symbols-outlined">{job.icon}</span>
                            </div>
                            <h3 className="text-slate-800 dark:text-slate-100 text-lg font-semibold leading-normal">{t[job.id]}</h3>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">{t[`desc_${job.id}`]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
