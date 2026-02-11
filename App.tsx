
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TimeRemaining, MotivationalResponse } from './types';
import { getMotivationalContent } from './services/geminiService';
import { CountdownCard } from './components/CountdownCard';
import { TipCard } from './components/TipCard';

const TARGET_DATE = new Date('2026-05-14T08:00:00');

// Component for background fire embers
const FireEmbers = () => {
  const embers = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: `${Math.random() * 4 + 2}px`,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 5 + 5}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.2,
      drift: `${(Math.random() - 0.5) * 200}px`,
    }));
  }, []);

  return (
    <>
      {embers.map((e) => (
        <div
          key={e.id}
          className="ember"
          style={{
            '--size': e.size,
            '--left': e.left,
            '--duration': e.duration,
            '--opacity': e.opacity,
            '--drift': e.drift,
            animationDelay: e.delay,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [content, setContent] = useState<MotivationalResponse | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);

  const calculateTimeLeft = useCallback(() => {
    const difference = TARGET_DATE.getTime() - new Date().getTime();
    
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, []);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    const loadContent = async () => {
      try {
        const data = await getMotivationalContent();
        setContent(data);
      } catch (err) {
        console.error("Failed to load AI content");
      } finally {
        setLoadingContent(false);
      }
    };

    loadContent();
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="relative min-h-screen pb-20 px-4 md:px-8">
      {/* Background Elements */}
      <div className="fire-bg"></div>
      <FireEmbers />
      
      {/* Cool blue overlay to maintain depth */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none bg-[#020617]">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      </div>

      <main className="max-w-6xl mx-auto pt-12 md:pt-24 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-orange-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-4 shadow-lg shadow-orange-900/20">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,1)]"></span>
            Le Feu Sacré de la Réussite
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tight leading-none mb-4">
            CNC <span className="gradient-text">2026</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto px-4">
            Brûlez d'ambition. Le Concours National Commun commence le <span className="text-white font-bold border-b-2 border-orange-500/50">14 Mai 2026</span>.
          </p>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-2">
          <CountdownCard value={timeLeft.days} label="Jours" icon="fa-fire-alt text-orange-500" />
          <CountdownCard value={timeLeft.hours} label="Heures" icon="fa-bolt text-yellow-500" />
          <CountdownCard value={timeLeft.minutes} label="Minutes" icon="fa-hourglass-half text-red-500" />
          <CountdownCard value={timeLeft.seconds} label="Secondes" icon="fa-wind text-orange-400" />
        </div>

        {/* AI Motivational Section */}
        <div className="space-y-10">
          {loadingContent ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 animate-pulse text-sm">Gemini AI alimente votre détermination...</p>
            </div>
          ) : content && (
            <div className="space-y-12">
              {/* Quote Card */}
              <div className="relative glass p-10 md:p-16 rounded-[2.5rem] text-center overflow-hidden border-t border-orange-500/10">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/10 blur-[60px] rounded-full"></div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <i className="fas fa-fire text-9xl text-orange-600"></i>
                </div>
                <p className="text-2xl md:text-4xl font-display text-white italic leading-relaxed relative z-10">
                  "{content.quote}"
                </p>
                <p className="mt-6 text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">
                  — {content.author}
                </p>
              </div>

              {/* Tips Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                  <h3 className="text-2xl font-bold text-white">Stratégies de Feu</h3>
                  <div className="h-px flex-grow bg-slate-800"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {content.tips.map((tip, idx) => (
                    <TipCard key={idx} tip={tip} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-8">
           <a 
            href="https://www.cpge.ac.ma" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all flex items-center gap-3 uppercase tracking-wider"
          >
            <i className="fas fa-burn"></i>
            Entrer dans l'arène (CPGE)
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© 2026 CNC Countdown. Que votre préparation soit ardente.</p>
        <div className="flex justify-center gap-6 mt-4 opacity-30">
          <i className="fas fa-fire"></i>
          <i className="fas fa-brain"></i>
          <i className="fas fa-rocket"></i>
        </div>
      </footer>
    </div>
  );
}

export default App;
