import React, { useState } from 'react';
import { translations } from '../utils/translations';

const FESTIVALS = [
    { id: 'diwali', name_en: 'Diwali', name_ta: 'தீபாவளி', icon: 'celebration', color: 'orange-500' },
    { id: 'holi', name_en: 'Holi', name_ta: 'ஹோலி', icon: 'format_paint', color: 'primary' },
    { id: 'eid', name_en: 'Eid', name_ta: 'ஈத்', icon: 'nightlight', color: 'emerald-600' },
    { id: 'navratri', name_en: 'Navratri', name_ta: 'நவராத்திரி', icon: 'music_note', color: 'blue-600' },
    { id: 'republic', name_en: 'Republic Day', name_ta: 'குடியரசு தினம்', icon: 'trip_origin', color: 'orange-600' },
    { id: 'onam', name_en: 'Onam', name_ta: 'ஓணம்', icon: 'local_florist', color: 'green-600' },
    { id: 'raksha', name_en: 'Raksha Bandhan', name_ta: 'ரக்ஷா பந்தன்', icon: 'family_restroom', color: 'pink-600' },
    { id: 'christmas', name_en: 'Christmas', name_ta: 'கிறிஸ்துமஸ்', icon: 'cake', color: 'red-600' }
];

const STYLES = [
    { id: 'traditional', name_en: 'Traditional', name_ta: 'பாரம்பரியம்', icon: 'temple_hindu', desc: 'Classic Indian' },
    { id: 'modern', name_en: 'Modern', name_ta: 'நவீனமானது', icon: 'bolt', desc: 'Sleek' },
    { id: 'cartoon', name_en: 'Cartoon', name_ta: 'கார்ட்டூன்', icon: 'smart_toy', desc: 'Playful' },
    { id: 'luxury', name_en: 'Luxury', name_ta: 'ஆடம்பரம்', icon: 'diamond', desc: 'Premium' }
];

export default function IntentBuilder({ isTamil, jobType, intent, setIntent, step, setStep, onGenerate, onBack }) {
    const t = translations[isTamil ? 'ta' : 'en'];

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-xl font-bold">{t.select_occasion}</h2>
                            <div className="mt-4 flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder={t.custom_occasion}
                                    className="w-full p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800"
                                    value={intent.customOccasion || ''}
                                    onChange={(e) => setIntent({ ...intent, customOccasion: e.target.value })}
                                />
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {FESTIVALS.map((f) => (
                                        <div
                                            key={f.id}
                                            onClick={() => setIntent({ ...intent, occasion: f.id, customOccasion: '' })}
                                            className={`cursor-pointer flex flex-col items-center p-4 rounded-lg border-2 transition-all ${(!intent.customOccasion && intent.occasion === f.id) ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-100 dark:bg-white/5'}`}
                                        >
                                            <span className={`material-symbols-outlined text-3xl text-${f.color}`}>{f.icon}</span>
                                            <p className="text-xs font-bold mt-2">{isTamil ? f.name_ta : f.name_en}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold">{t.choose_style}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {STYLES.map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => setIntent({ ...intent, style: s.id })}
                                    className={`cursor-pointer flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${intent.style === s.id ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-50 dark:bg-white/5'}`}
                                >
                                    <span className="material-symbols-outlined text-primary">{s.icon}</span>
                                    <span className="font-bold">{isTamil ? s.name_ta : s.name_en}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                const categoryKey = jobType?.id;
                const categoryQuestion = t.questions[categoryKey];
                const categoryChoices = t.choices[categoryKey];

                return (
                    <div className="flex flex-col gap-8">
                        <h2 className="text-xl font-bold">{t.mood_layout}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Specific Line of Text */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.specific_line}</label>
                                <input
                                    type="text"
                                    placeholder={t.line_desc}
                                    className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800"
                                    value={intent.specificText || ''}
                                    onChange={(e) => setIntent({ ...intent, specificText: e.target.value })}
                                />
                            </div>

                            {/* Theme Color */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.theme_color}</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Royal Gold, Deep Red"
                                    className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800"
                                    value={intent.themeColor || ''}
                                    onChange={(e) => setIntent({ ...intent, themeColor: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Category Specific Questions */}
                        {categoryQuestion && (
                            <div className="flex flex-col gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <label className="text-sm font-bold text-primary">{categoryQuestion}</label>
                                <div className="flex gap-2 flex-wrap">
                                    {categoryChoices.map((choice) => (
                                        <button
                                            key={choice}
                                            onClick={() => setIntent({ ...intent, categoryAnswer: choice })}
                                            className={`px-4 py-2 rounded-full border-2 text-xs font-bold transition-all ${intent.categoryAnswer === choice ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 border-slate-200 hover:border-primary/50'}`}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* People Toggle */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.include_people}</label>
                                <div className="flex gap-4">
                                    {[true, false].map((v) => (
                                        <button
                                            key={v.toString()}
                                            onClick={() => setIntent({ ...intent, includePeople: v })}
                                            className={`flex-1 py-3 rounded-lg border-2 font-bold ${intent.includePeople === v ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 dark:bg-white/5'}`}
                                        >
                                            {v ? t.yes : t.no}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Words */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.tech_words}</label>
                                <input
                                    type="text"
                                    placeholder={t.tech_desc}
                                    className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800"
                                    value={intent.techWords || ''}
                                    onChange={(e) => setIntent({ ...intent, techWords: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8 py-8">
            <div className="flex flex-col gap-2 text-center">
                <p className="text-sm uppercase font-bold text-primary tracking-widest">{t.step} {step} {t.of} 3</p>
                <h2 className="text-3xl font-black">{isTamil ? jobType?.title_ta : jobType?.title_en}</h2>
            </div>

            <div className="bg-white dark:bg-card-dark p-6 sm:p-8 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800">
                {renderStep()}
            </div>

            <div className="flex justify-between gap-4">
                <button onClick={onBack} className="flex-1 max-w-[150px] py-4 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold transition-all hover:bg-slate-200">{t.back}</button>
                <button
                    onClick={step === 3 ? onGenerate : () => setStep(step + 1)}
                    className="flex-1 max-w-[200px] py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 transition-all hover:translate-y-[-2px]"
                >
                    {step === 3 ? t.generate : t.continue}
                </button>
            </div>
        </div>
    );
}
