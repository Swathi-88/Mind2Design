import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import JobSelector from './components/JobSelector';
import IntentBuilder from './components/IntentBuilder';
import ResultsPanel from './components/ResultsPanel';
import { compilePrompt } from './services/promptCompiler';
import { synthesizePrompt } from './services/promptSynthesizer';
import { translations } from './utils/translations';
import LandingPage from './components/LandingPage';

export default function App() {
    // view state is removed in favor of routing
    const [jobType, setJobType] = useState(null);
    const [isTamil, setIsTamil] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Router hooks
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Derived view for Header (optional, or Header can check location)
    // We can map paths to views if needed for Header props
    const getViewName = () => {
        const path = location.pathname;
        if (path === '/') return 'landing';
        if (path === '/home') return 'home';
        if (path === '/builder') return 'builder';
        if (path === '/results') return 'results';
        return 'landing';
    };

    const currentView = getViewName();

    // Step is now derived from URL for builder
    const step = parseInt(searchParams.get('step')) || 1;

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
        religion: 'secular',
        aspectRatio: '1:1',
        customSize: ''
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
            religion: 'secular',
            aspectRatio: '1:1',
            customSize: ''
        });

        // Inject localized titles into the job object for sub-components
        const localizedJob = {
            ...type,
            title_en: type.title || translations.en[type.id],
            title_ta: translations.ta[type.id]
        };
        setJobType(localizedJob);
        // Navigate to builder step 1
        navigate('/builder?step=1');
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            // Use the local Expert System Algorithm
            const prompt = await synthesizePrompt(jobType, intent);
            setCompiledPrompt(prompt);
            navigate('/results');
        } catch (error) {
            console.error("Synthesis failed:", error);
            // Fallback on error
            setCompiledPrompt(compilePrompt(jobType, intent));
            navigate('/results');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleBack = () => {
        // Simple back navigation using history
        navigate(-1);
    };

    // Wrapper to update step via URL
    const setStep = (newStep) => {
        navigate(`/builder?step=${newStep}`);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light text-slate-800 dark:bg-background-dark dark:text-slate-200 overflow-x-hidden transition-colors duration-300">

            {currentView !== 'landing' && (
                <Header
                    view={currentView}
                    setView={(v) => {
                        // Handle manual navigation from header if needed
                        if (v === 'landing') navigate('/');
                        else if (v === 'home') navigate('/home');
                        // Other transitions usually handled by flow
                    }}
                    isTamil={isTamil}
                    setIsTamil={setIsTamil}
                />
            )}

            <main className={`flex-1 flex justify-center ${currentView === 'landing' ? '' : 'py-5'}`}>
                <div className={`${currentView === 'landing' ? 'w-full max-w-none px-0' : 'w-full max-w-[960px] px-4'} flex flex-col`}>

                    <Routes>
                        <Route path="/" element={
                            <LandingPage
                                onEnter={() => navigate('/home')}
                                isTamil={isTamil}
                            />
                        } />

                        <Route path="/home" element={
                            <JobSelector
                                onSelect={handleJobSelect}
                                isTamil={isTamil}
                            />
                        } />

                        <Route path="/builder" element={
                            jobType ? (
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
                            ) : (
                                <Navigate to="/home" replace />
                            )
                        } />

                        <Route path="/results" element={
                            <ResultsPanel
                                isTamil={isTamil}
                                jobType={jobType}
                                intent={intent}
                                compiledPrompt={compiledPrompt}
                                onBack={handleBack}
                            />
                        } />

                        {/* Fallback route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>

                    {isGenerating && (
                        <div className="fixed inset-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4">
                            <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <div className="flex flex-col items-center gap-1">
                                <h3 className="text-xl font-bold animate-pulse text-primary">{isTamil ? 'வடிவமைப்பை உருவாக்குகிறது...' : 'Optimizing Prompt...'}</h3>
                                <p className="text-sm text-slate-500">{isTamil ? 'தயவுசெய்து காத்திருக்கவும்' : 'AI is thinking about your South Indian design'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-200/30">
                <p>© 2026 {t.title}. {t.built_for}</p>
            </footer>
        </div>
    );
}
