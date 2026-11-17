import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 font-black text-xl text-white">
            N
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg tracking-tight">Nirapod Courier</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Smart Hub & Zone Routing Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              City Area [L4] Dropdowns & Sub-Area [L5] Dual Input Engine (Manual + Dropdown)
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('router')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition ${
              activeTab === 'router' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            📦 Courier Router & Manifest
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition ${
              activeTab === 'inspector' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            🔍 Single Coordinate Inspector
          </button>
        </div>
      </div>
    </header>
  );
}
