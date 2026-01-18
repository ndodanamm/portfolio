
import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import PortfolioPreview from './components/PortfolioPreview';
import { UserInput, RefinedPortfolio } from './types';
import { generatePortfolioContent } from './services/gemini';

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'form' | 'loading' | 'portfolio'>('intro');
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [portfolio, setPortfolio] = useState<RefinedPortfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: UserInput) => {
    setUserInput(data);
    setView('loading');
    setError(null);
    try {
      const refined = await generatePortfolioContent(data);
      setPortfolio(refined);
      setView('portfolio');
    } catch (err: any) {
      console.error(err);
      setError("Strategic alignment failed. Please try again in a moment.");
      setView('form');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header - Fixed and Only visible when not printing */}
      <nav className="no-print bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('intro')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic">P</div>
          <span className="font-bold text-slate-800 tracking-tight text-lg">Portfolio<span className="text-blue-600">Pro</span></span>
        </div>
        <div className="flex gap-4">
          {view === 'portfolio' && (
            <button 
              onClick={handlePrint}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
          )}
          {view !== 'intro' && view !== 'loading' && (
            <button 
              onClick={() => setView('intro')}
              className="text-slate-500 hover:text-slate-800 font-medium text-sm"
            >
              Exit
            </button>
          )}
        </div>
      </nav>

      <main>
        {view === 'intro' && (
          <div className="max-w-6xl mx-auto px-8 py-20 text-center">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
              Generate Your <span className="text-blue-600 underline decoration-blue-200">Corporate</span> Identity.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your business vision into a high-stakes professional portfolio. Powered by AI, designed for results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView('form')}
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-2xl shadow-slate-200"
              >
                Start Business Profile
              </button>
              <div className="flex items-center justify-center gap-6 px-8 text-slate-400 font-medium italic">
                <span>✓ PDF-Ready</span>
                <span>✓ 20 CI Sets</span>
                <span>✓ AI-Optimized</span>
              </div>
            </div>
            
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Intelligent Copywriting', desc: 'Our AI acts as your senior brand strategist, refining your mission and vision for maximum impact.' },
                { title: 'Industry-Specific CI', desc: '20 pre-configured Corporate Identity sets mapped to various industries and visual styles.' },
                { title: 'Investor Ready', desc: 'Optimized layouts designed to capture attention and deliver information with clarity.' }
              ].map((f, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 text-left shadow-sm">
                  <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'form' && (
          <div className="py-12 px-4">
            <Questionnaire onSubmit={handleSubmit} />
            {error && <p className="text-red-500 text-center mt-4 font-bold">{error}</p>}
          </div>
        )}

        {view === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
            <div className="w-20 h-20 border-8 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
            <h2 className="text-3xl font-bold mb-4">Crafting Your Legacy...</h2>
            <div className="max-w-lg space-y-4 text-slate-400">
              <p className="animate-pulse">Optimizing value propositions...</p>
              <p className="animate-pulse delay-75">Aligning corporate identity...</p>
              <p className="animate-pulse delay-150">Polishing mission statements...</p>
            </div>
          </div>
        )}

        {view === 'portfolio' && userInput && portfolio && (
          <div className="portfolio-container">
            <PortfolioPreview data={userInput} refined={portfolio} />
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      {view !== 'portfolio' && (
        <footer className="no-print py-12 px-8 text-center text-slate-400 text-sm border-t border-slate-100 mt-20">
          <p>Built for growth. PortfolioPro AI &copy; {new Date().getFullYear()}</p>
        </footer>
      )}
    </div>
  );
};

export default App;
