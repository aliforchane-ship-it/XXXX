
import React from 'react';
import { StudyTip } from '../types';

interface TipCardProps {
  tip: StudyTip;
}

export const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Math': return 'fa-square-root-variable';
      case 'Physique': return 'fa-atom';
      case 'SI': return 'fa-gears';
      case 'Motivation': return 'fa-fire';
      default: return 'fa-lightbulb';
    }
  };

  const getColor = (cat: string) => {
    switch (cat) {
      case 'Math': return 'border-sky-500/30 text-sky-400';
      case 'Physique': return 'border-emerald-500/30 text-emerald-400';
      case 'SI': return 'border-orange-500/30 text-orange-400';
      case 'Motivation': return 'border-rose-500/30 text-rose-400';
      default: return 'border-indigo-500/30 text-indigo-400';
    }
  };

  return (
    <div className={`p-6 glass rounded-2xl border-l-4 ${getColor(tip.category)} transition-all hover:bg-slate-800/50`}>
      <div className="flex items-center gap-3 mb-3">
        <i className={`fas ${getIcon(tip.category)} text-xl opacity-80`}></i>
        <h4 className="font-bold text-lg text-white">{tip.title}</h4>
      </div>
      <p className="text-slate-300 leading-relaxed text-sm">
        {tip.content}
      </p>
    </div>
  );
};
