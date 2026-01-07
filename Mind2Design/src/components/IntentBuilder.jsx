import React, { useState } from 'react';
import { translations } from '../utils/translations';

const CATEGORY_OPTIONS = {
    festival: [
        { id: 'diwali', name_en: 'Diwali', name_ta: 'தீபாவளி', icon: 'celebration', color: 'orange-500' },
        { id: 'pongal', name_en: 'Pongal', name_ta: 'பொங்கல்', icon: 'local_florist', color: 'yellow-500' },
        { id: 'onam', name_en: 'Onam', name_ta: 'ஓணம்', icon: 'filter_vintage', color: 'green-600' },
        { id: 'ugadi', name_en: 'Ugadi', name_ta: 'உகாதி', icon: 'yard', color: 'emerald-500' },
        { id: 'vishu', name_en: 'Vishu', name_ta: 'விஷு', icon: 'spa', color: 'yellow-600' },
        { id: 'republic', name_en: 'Republic Day', name_ta: 'குடியரசு தினம்', icon: 'trip_origin', color: 'orange-600' },
        { id: 'navratri', name_en: 'Navratri', name_ta: 'நவராத்திரி', icon: 'music_note', color: 'blue-600' },
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
        { id: 'juice', name_en: 'Juice Shop', name_ta: 'ஜூஸ் கடை', icon: 'local_bar', color: 'orange-400' },
        { id: 'printing', name_en: 'Printing Shop', name_ta: 'பிரிண்டிங் கடை', icon: 'print', color: 'emerald-600' },
        { id: 'fireworks', name_en: 'Fireworks Shop', name_ta: 'பட்டாசு கடை', icon: 'flare', color: 'red-600' },
        { id: 'hotel', name_en: 'Hotel/Food', name_ta: 'ஹோட்டல்', icon: 'restaurant', color: 'orange-500' }
    ],
    event: [
        { id: 'political', name_en: 'Political Meeting', name_ta: 'அரசியல் கூட்டம்', icon: 'groups', color: 'orange-700' },
        { id: 'concert', name_en: 'Music Concert', name_ta: 'இசை நிகழ்ச்சி', icon: 'theater_comedy', color: 'purple-600' },
        { id: 'school', name_en: 'School/College', name_ta: 'பள்ளி/கல்லூரி', icon: 'school', color: 'blue-500' },
        { id: 'feast', name_en: 'Temple Feast', name_ta: 'கோவில் திருவிழா', icon: 'temple_hindu', color: 'red-600' }
    ]
};


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
                // Category-specific styles from translations
                const categoryStyles = t.styles[jobId] || t.styles.festival;

                return (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold">{t.choose_style}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {categoryStyles.map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => setIntent({ ...intent, style: s.id })}
                                    className={`cursor-pointer flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${intent.style === s.id ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-50 dark:bg-white/5'}`}
                                >
                                    <span className="material-symbols-outlined text-primary">{s.icon}</span>
                                    <span className="font-bold">{s.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                const categoryKey = jobType?.id;

                // Dynamic Questions based on Category and Search
                let activeQuestionKey = categoryKey;

                // 1. Business Specific Search
                if (categoryKey === 'business' && (intent.businessType || intent.customOccasion || intent.occasion)) {
                    const type = (intent.businessType || intent.customOccasion || intent.occasion || '').toLowerCase();
                    if (type.includes('hotel') || type.includes('restaurant')) activeQuestionKey = 'business_hotel';
                    else if (type.includes('juice') || type.includes('shake')) activeQuestionKey = 'business_juice';
                    else if (type.includes('print') || type.includes('banner') || type.includes('vcard')) activeQuestionKey = 'business_printing';
                    else if (type.includes('retail') || type.includes('shop')) activeQuestionKey = 'business_retail';
                    else if (type.includes('studio') || type.includes('photo')) activeQuestionKey = 'business_studio';
                }

                // 2. Festival Specific Search
                if (categoryKey === 'festival') {
                    const fest = (intent.customOccasion || intent.occasion || '').toLowerCase();
                    if (fest.includes('pongal')) activeQuestionKey = 'festival_pongal';
                    else if (fest.includes('diwali')) activeQuestionKey = 'festival_diwali';
                }

                // 3. Funeral Specific Search
                if (categoryKey === 'funeral') {
                    activeQuestionKey = 'funeral_memorial';
                }


                const categoryQuestion = t.questions[activeQuestionKey];
                const categoryChoices = t.choices[activeQuestionKey];

                return (
                    <div className="flex flex-col gap-8">
                        <h2 className="text-xl font-bold">{t.mood_layout}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Specific Line of Text / Business Name */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">
                                    {categoryKey === 'business' ? t.business_type_label : t.specific_line}
                                </label>
                                <input
                                    type="text"
                                    placeholder={categoryKey === 'business' ? t.business_type_placeholder : t.line_desc}
                                    className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800"
                                    value={categoryKey === 'business' ? intent.businessType : intent.specificText}
                                    onChange={(e) => {
                                        if (categoryKey === 'business') setIntent({ ...intent, businessType: e.target.value });
                                        else setIntent({ ...intent, specificText: e.target.value });
                                    }}
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
                            <div className="flex flex-col gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10 animate-in fade-in zoom-in-95 duration-300">
                                <label className="text-sm font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">quiz</span>
                                    {categoryQuestion}
                                </label>
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
                            {/* Layout Logic Toggle */}
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

                            {/* Reference Image Option */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold">{t.reference_image}</label>
                                <button
                                    onClick={() => setIntent({ ...intent, useReferenceImage: !intent.useReferenceImage })}
                                    className={`flex items-center gap-4 p-3 rounded-lg border-2 transition-all ${intent.useReferenceImage ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 dark:bg-white/5 text-slate-400'}`}
                                >
                                    <span className="material-symbols-outlined">{intent.useReferenceImage ? 'image_search' : 'add_photo_alternate'}</span>
                                    <span className="text-xs font-bold uppercase">{intent.useReferenceImage ? 'Reference Logic ON' : 'Click to enable ref'}</span>
                                </button>
                                <p className="text-[10px] text-slate-400 italic leading-tight">{t.ref_img_desc}</p>
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-4 py-8">
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
