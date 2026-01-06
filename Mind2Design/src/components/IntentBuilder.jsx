import React, { useState } from 'react';
import { translations } from '../utils/translations';

const CATEGORY_OPTIONS = {
    festival: [
        { id: 'diwali', name_en: 'Diwali', name_ta: 'தீபாவளி', icon: 'celebration', color: 'orange-500' },
        { id: 'holi', name_en: 'Holi', name_ta: 'ஹோலி', icon: 'format_paint', color: 'primary' },
        { id: 'eid', name_en: 'Eid', name_ta: 'ஈத்', icon: 'nightlight', color: 'emerald-600' },
        { id: 'navratri', name_en: 'Navratri', name_ta: 'நவராத்திரி', icon: 'music_note', color: 'blue-600' },
        { id: 'republic', name_en: 'Republic Day', name_ta: 'குடியரசு தினம்', icon: 'trip_origin', color: 'orange-600' },
        { id: 'onam', name_en: 'Onam', name_ta: 'ஓணம்', icon: 'local_florist', color: 'green-600' },
        { id: 'raksha', name_en: 'Raksha Bandhan', name_ta: 'ரக்ஷா பந்தன்', icon: 'family_restroom', color: 'pink-600' },
        { id: 'christmas', name_en: 'Christmas', name_ta: 'கிறிஸ்துமஸ்', icon: 'cake', color: 'red-600' }
    ],
    crackers: [
        { id: 'red_wrapper', name_en: 'Red Wrapper', name_ta: 'சிவப்பு உறை', icon: 'label', color: 'red-600' },
        { id: 'green_wrapper', name_en: 'Green Wrapper', name_ta: 'பச்சை உறை', icon: 'label', color: 'green-600' },
        { id: 'box_design', name_en: 'Box Design', name_ta: 'பெட்டி வடிவமைப்பு', icon: 'inventory_2', color: 'orange-500' },
        { id: 'sparklers', name_en: 'Sparklers', name_ta: 'கம்பி மத்தாப்பு', icon: 'auto_awesome', color: 'yellow-500' },
        { id: 'chakra', name_en: 'Ground Spinner', name_ta: 'தரைச்சக்கரம்', icon: 'motion_photos_on', color: 'blue-500' },
        { id: 'flowerpot', name_en: 'Flower Pot', name_ta: 'பூச்சட்டி', icon: 'local_fire_department', color: 'orange-600' }
    ],
    funeral: [
        { id: 'condolence', name_en: 'Condolence', name_ta: 'இரங்கல்', icon: 'cloud_done', color: 'slate-500' },
        { id: 'memorial', name_en: 'Memorial', name_ta: 'நினைவஞ்சலி', icon: 'church', color: 'slate-600' },
        { id: 'sympathy', name_en: 'Sympathy', name_ta: 'ஆறுதல்', icon: 'favorite', color: 'slate-400' },
        { id: 'tribute', name_en: 'Tribute', name_ta: 'புகழஞ்சலி', icon: 'stars', color: 'slate-700' }
    ],
    business: [
        { id: 'opening', name_en: 'Shop Opening', name_ta: 'கடை திறப்பு விழா', icon: 'storefront', color: 'blue-600' },
        { id: 'offer', name_en: 'Discount Offer', name_ta: 'தள்ளுபடி சலுகை', icon: 'sell', color: 'red-500' },
        { id: 'new_arrival', name_en: 'New Arrival', name_ta: 'புதிய வரவு', icon: 'new_releases', color: 'emerald-600' },
        { id: 'menu', name_en: 'Service Menu', name_ta: 'சேவை விவரம்', icon: 'list_alt', color: 'slate-800' }
    ],
    event: [
        { id: 'political', name_en: 'Political Meeting', name_ta: 'அரசியல் கூட்டம்', icon: 'groups', color: 'orange-700' },
        { id: 'concert', name_en: 'Music Concert', name_ta: 'இசை நிகழ்ச்சி', icon: 'theater_comedy', color: 'purple-600' },
        { id: 'school', name_en: 'School/College', name_ta: 'பள்ளி/கல்லூரி', icon: 'school', color: 'blue-500' },
        { id: 'feast', name_en: 'Temple Feast', name_ta: 'கோவில் திருவிழா', icon: 'temple_hindu', color: 'red-600' }
    ]
};

const STYLES = [
    { id: 'traditional', name_en: 'Traditional', name_ta: 'பாரம்பரியம்', icon: 'temple_hindu', desc: 'Classic Indian' },
    { id: 'modern', name_en: 'Modern', name_ta: 'நவீனமானது', icon: 'bolt', desc: 'Sleek' },
    { id: 'cartoon', name_en: 'Cartoon', name_ta: 'கார்ட்டூன்', icon: 'smart_toy', desc: 'Playful' },
    { id: 'luxury', name_en: 'Luxury', name_ta: 'ஆடம்பரம்', icon: 'diamond', desc: 'Premium' }
];

export default function IntentBuilder({ isTamil, jobType, intent, setIntent, step, setStep, onGenerate, onBack }) {
    const t = translations[isTamil ? 'ta' : 'en'];
    const jobId = jobType?.id || 'festival';
    const options = CATEGORY_OPTIONS[jobId] || CATEGORY_OPTIONS.festival;
    const step1Label = t[`select_${jobId}`] || t.select_occasion;

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-xl font-bold">{step1Label}</h2>
                            <div className="mt-4 flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder={t.custom_occasion}
                                    className="w-full p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800"
                                    value={intent.customOccasion || ''}
                                    onChange={(e) => setIntent({ ...intent, customOccasion: e.target.value })}
                                />
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {options.map((f) => (
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
                            {/* Design Mode: AI vs Real */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.design_mode}</label>
                                <div className="flex gap-4">
                                    {[
                                        { id: 'ai', label: t.mode_ai },
                                        { id: 'real', label: t.mode_real }
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setIntent({ ...intent, designMode: m.id })}
                                            className={`flex-1 py-3 px-2 rounded-lg border-2 font-bold text-[10px] uppercase transition-all ${intent.designMode === m.id ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 dark:bg-white/5'}`}
                                        >
                                            {m.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Symbol Selection */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.symbol_select}</label>
                                <select
                                    className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-sm font-bold outline-none"
                                    value={intent.symbol}
                                    onChange={(e) => setIntent({ ...intent, symbol: e.target.value })}
                                >
                                    <option value="none">{t.symbol_none}</option>
                                    <option value="hindu">{t.symbol_hindu}</option>
                                    <option value="muslim">{t.symbol_muslim}</option>
                                    <option value="christian">{t.symbol_christian}</option>
                                </select>
                            </div>
                        </div>

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

                        {/* Extra Refinement Note */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold">{t.extra_refinement}</label>
                            <textarea
                                rows="2"
                                placeholder={t.refine_placeholder}
                                className="p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 resize-none italic text-sm"
                                value={intent.extraNote || ''}
                                onChange={(e) => setIntent({ ...intent, extraNote: e.target.value })}
                            />
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
