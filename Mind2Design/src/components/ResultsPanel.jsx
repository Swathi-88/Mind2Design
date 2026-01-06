import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { describePromptInTamil, compilePrompt } from '../services/promptCompiler';

export default function ResultsPanel({ isTamil, jobType, intent, compiledPrompt, onBack }) {
    const t = translations[isTamil ? 'ta' : 'en'];
    const [editingPrompt, setEditingPrompt] = useState(compiledPrompt);
    const [copied, setCopied] = useState(false);
    const [modifiers, setModifiers] = useState([]);
    const [userChange, setUserChange] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(editingPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRefine = (mod) => {
        const newMods = modifiers.includes(mod)
            ? modifiers.filter(m => m !== mod)
            : [...modifiers, mod];

        setModifiers(newMods);
        const newPrompt = compilePrompt(jobType, intent, newMods);
        setEditingPrompt(newPrompt);
    };

    const handleManualRegen = () => {
        // Create a temporary intent with the userChange injected into extraNote
        const tempIntent = { ...intent, extraNote: userChange || intent.extraNote };
        const newPrompt = compilePrompt(jobType, tempIntent, modifiers);
        setEditingPrompt(newPrompt);
    };

    const tamilMeaning = describePromptInTamil(jobType, intent);

    const REFINE_BUTTONS = [
        { id: 'more_traditional', icon: 'temple_hindu', label: t.more_traditional },
        { id: 'change_colors', icon: 'palette', label: t.change_colors },
        { id: 'lock_layout', icon: 'lock', label: t.lock_layout },
        { id: 'more_festive', icon: 'celebration', label: t.more_festive }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-10 py-8">

            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-4xl font-black">{t.results_title}</h2>
                <p className="text-slate-500">{t.results_desc}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Left: Prompt & Editor */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">terminal</span> Prompt Engine
                            </h3>
                            <button
                                onClick={handleCopy}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
                            >
                                <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                                {copied ? t.copied : t.copy_prompt}
                            </button>
                        </div>

                        <textarea
                            className="w-full h-64 p-5 text-sm bg-slate-50 dark:bg-white/5 rounded-xl border-2 border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all resize-none italic leading-relaxed font-mono"
                            value={editingPrompt}
                            onChange={(e) => setEditingPrompt(e.target.value)}
                        />
                    </div>

                    {/* Extra Feedback Prompt */}
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                        <label className="text-sm font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">edit_note</span>
                            {t.extra_refinement}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t.refine_placeholder}
                                className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-primary"
                                value={userChange}
                                onChange={(e) => setUserChange(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleManualRegen()}
                            />
                            <button
                                onClick={handleManualRegen}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-primary/90 transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">refresh</span>
                                Regenerate
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={onBack} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold hover:bg-slate-200 transition-all">
                            <span className="material-symbols-outlined">arrow_back</span> {t.back}
                        </button>
                    </div>
                </div>

                {/* Right: Info & Refinements */}
                <div className="w-full lg:w-[380px] flex flex-col gap-6">

                    {/* Tamil Meaning Card */}
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-primary font-black text-sm uppercase tracking-tight">{t.prompt_tamil}</h4>
                            <span className="material-symbols-outlined text-primary text-lg">translate</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                            {tamilMeaning}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold uppercase text-slate-400 px-1">Designer Quick Controls</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {REFINE_BUTTONS.map((btn) => {
                                const isActive = modifiers.includes(btn.id);
                                return (
                                    <button
                                        key={btn.id}
                                        onClick={() => handleRefine(btn.id)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${isActive ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/50'}`}
                                    >
                                        <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-slate-400'}`}>{btn.icon}</span>
                                        <span className={`text-[10px] font-black uppercase text-center ${isActive ? 'text-primary' : 'text-slate-500'}`}>{btn.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-[11px] text-slate-500 italic">
                            Note: Copy the English prompt above. AI models perform best with English instructions, but we have provided the Tamil meaning to help you confirm the logic.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
