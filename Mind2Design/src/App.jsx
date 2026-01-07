import React, { useState } from 'react';
import Header from './components/Header';
import JobSelector from './components/JobSelector';
import IntentBuilder from './components/IntentBuilder';
import ResultsPanel from './components/ResultsPanel';
import { compilePrompt } from './services/promptCompiler';
import { synthesizePrompt } from './services/promptSynthesizer';
import { translations } from './utils/translations';
import LandingPage from './components/LandingPage';

export default function App() {
    const [view, setView] = useState('landing'); // landing, home, builder, results
    const [jobType, setJobType] = useState(null);
    const [step, setStep] = useState(1);
    const [isTamil, setIsTamil] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);


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
        businessType: '',
        useReferenceImage: false,
        layout: 'center',
        religion: 'secular'
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
            businessType: '',
            useReferenceImage: false,
            layout: 'center',
            religion: 'secular'
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

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            // Use the local Expert System Algorithm
            const prompt = await synthesizePrompt(jobType, intent);
            setCompiledPrompt(prompt);
            setView('results');
        } catch (error) {
            console.error("Synthesis failed:", error);
            // Fallback on error
            setCompiledPrompt(compilePrompt(jobType, intent));
            setView('results');
        } finally {
            setIsGenerating(false);
        }
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

            {view !== 'landing' && (
                <Header
                    view={view}
                    setView={setView}
                    isTamil={isTamil}
                    setIsTamil={setIsTamil}
                />
            )}

            <main className={`flex-1 flex justify-center ${view === 'landing' ? '' : 'py-5'}`}>
                <div className={`${view === 'landing' ? 'w-full max-w-none px-0' : 'w-full max-w-[960px] px-4'} flex flex-col`}>

                    {view === 'landing' && (
                        <LandingPage
                            onEnter={() => setView('home')}
                            isTamil={isTamil}
                        />
                    )}

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
                            isGenerating={isGenerating}
                        />
                    )}

                    {isGenerating && (
                        <div className="fixed inset-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4">
                            <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <div className="flex flex-col items-center gap-1">
                                <h3 className="text-xl font-bold animate-pulse text-primary">{isTamil ? 'வடிவமைப்பை உருவாக்குகிறது...' : 'Optimizing Prompt...'}</h3>
                                <p className="text-sm text-slate-500">{isTamil ? 'தயவுசெய்து காத்திருக்கவும்' : 'AI is thinking about your South Indian design'}</p>
                            </div>
                        </div>
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
