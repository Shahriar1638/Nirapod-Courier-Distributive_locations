import React from 'react';
import { PRESET_SCENARIOS } from '../constants/courierCatalog.js';

export default function ScenarioBar({ onSelectScenario }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 space-y-2">
      <span className="font-bold text-slate-400 uppercase text-[11px] block tracking-wide">
        Client Demonstration Scenarios (Click to test routing logic):
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {PRESET_SCENARIOS.map((sc, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectScenario(sc)}
            className="text-left p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 hover:border-emerald-500/50 transition flex flex-col justify-between space-y-1.5 group"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition">
                {sc.title}
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {sc.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {sc.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
