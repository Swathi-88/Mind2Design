import React, { useState } from 'react';
import Header from './components/Header';
import JobSelector from './components/JobSelector';
import IntentBuilder from './components/IntentBuilder';
import ResultsPanel from './components/ResultsPanel';
import { compilePrompt } from './services/promptCompiler';
import { translations } from './utils/translations';

export default function App() {
    const [view, setView] = useState('home'); // home, builder, results
    const [jobType, setJobType] = useState(null);
    const [step, setStep] = useState(1);
    const [isTamil, setIsTamil] = useState(false);

    const [intent, setIntent] = useState({
        occasion: '',
        customOccasion: '',
        style: 'traditional',
        includePeople: false,
        themeColor: '',
        techWords: '',
        specificText: '',
        categoryAnswer: '',
        symbol: 'none',
        designMode: 'real',
        extraNote: '',
        layout: 'center'
    });

    const [compiledPrompt, setCompiledPrompt] = useState('');
    const t = translations[isTamil ? 'ta' : 'en'];

    // Transitions
    const handleJobSelect = (type) => {
        // Reset intent when changing categories
        setIntent({
            occasion: '',
            customOccasion: '',
            style: 'traditional',
            includePeople: false,
            themeColor: '',
            techWords: '',
            specificText: '',
            categoryAnswer: '',
            symbol: 'none',
            designMode: 'real',
            extraNote: '',
            layout: 'center'
        });

        // Inject localized titles into the job object for sub-components
        const localizedJob = {
            ...type,
            title_en: type.title || translations.en[type.id],
            title_ta: translations.ta[type.id]
        };
        setJobType(localizedJob);
        setStep(1);
        setView('builder');
    };

    const handleGenerate = () => {
        const prompt = compilePrompt(jobType, intent);
        setCompiledPrompt(prompt);
        setView('results');
    };

    const handleBack = () => {
        if (view === 'results') setView('builder');
        else if (view === 'builder') {
            if (step > 1) setStep(step - 1);
            else setView('home');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light text-slate-800 dark:bg-background-dark dark:text-slate-200 overflow-x-hidden transition-colors duration-300">

            <Header
                view={view}
                setView={setView}
                isTamil={isTamil}
                setIsTamil={setIsTamil}
            />

            <main className="flex-1 flex justify-center py-5">
                <div className="w-full max-w-[960px] flex flex-col px-4">

                    {view === 'home' && (
                        <JobSelector
                            onSelect={handleJobSelect}
                            isTamil={isTamil}
                        />
                    )}

                    {view === 'builder' && (
                        <IntentBuilder
                            isTamil={isTamil}
                            jobType={jobType}
                            intent={intent}
                            setIntent={setIntent}
                            step={step}
                            setStep={setStep}
                            onGenerate={handleGenerate}
                            onBack={handleBack}
                        />
                    )}

                    {view === 'results' && (
                        <ResultsPanel
                            isTamil={isTamil}
                            jobType={jobType}
                            intent={intent}
                            compiledPrompt={compiledPrompt}
                            onBack={handleBack}
                        />
                    )}

                </div>
            </main>

            <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-200/30">
                <p>© 2026 {t.title}. {t.built_for}</p>
            </footer>
        </div>
    );
}
