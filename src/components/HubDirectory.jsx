import React from 'react';
import { COURIER_HUBS } from '../utils/hubRouting.js';

export default function HubDirectory() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <h4 className="font-bold text-slate-900 text-sm">
          Nirapod Courier Operational Hub Directory ({COURIER_HUBS.length} Hubs Configured)
        </h4>
        <span className="text-xs text-slate-400">Primary Coverage & Fallback Network</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {COURIER_HUBS.map((h, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 font-bold">{h.name}</strong>
              <span className="font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                {h.code}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">📍 {h.address}</p>
            <div className="text-[10px] text-slate-600 bg-white p-1.5 rounded-lg border border-slate-100">
              Primary Zone: <strong>{h.coverageKeywords.slice(0, 4).join(', ')}...</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
