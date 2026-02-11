
import React from 'react';

interface CountdownCardProps {
  value: number;
  label: string;
  icon: string;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ value, label, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 glass rounded-3xl shadow-2xl transition-all hover:scale-105 duration-300 group border-t border-white/5">
      <div className={`mb-2 md:mb-4 text-xl md:text-2xl group-hover:animate-pulse ${icon.includes('text-') ? icon : 'text-orange-400'}`}>
        <i className={icon.split(' text-')[0]}></i>
      </div>
      <div className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mt-2">
        {label}
      </div>
    </div>
  );
};
