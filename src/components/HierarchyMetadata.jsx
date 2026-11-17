import React from 'react';

export default function HierarchyMetadata({ onCopyWaybill, copiedWaybill, onDownloadData }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-5 md:p-6 shadow-xl border border-emerald-500/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="w-full lg:w-auto">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 uppercase tracking-wider">
              Enterprise Logistics Core
            </span>
            <span className="text-xs text-slate-400">Standard 7-Level Geographic Dispatch Architecture</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black mt-1 tracking-tight text-white">
            Courier Hub Routing & Dispatch Operations Center
          </h2>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Download location_data Button */}
          <a
            href="./location_data.json"
            download="location_data.json"
            onClick={onDownloadData}
            className="shrink-0 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-emerald-400"
            title="Download full location_data.json (33,894 indexed entities)"
          >
            <span>📥 Download location_data</span>
          </a>

          {/* Copy Manifest Button */}
          <button
            onClick={onCopyWaybill}
            className={`shrink-0 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md flex items-center space-x-2 ${
              copiedWaybill ? 'bg-emerald-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <span>{copiedWaybill ? '✓ Manifest Copied!' : '📄 Copy Airway Bill'}</span>
          </button>
        </div>
      </div>

      {/* Administrative & Geographic Hierarchy Metadata Bar */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 mb-4 space-y-3 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-black uppercase tracking-wider text-[11px]">Metadata of Administrative & Courier Hierarchy:</span>
            <span className="text-slate-300 font-medium hidden sm:inline">National Geo-Relational Schema (BBS + OSM Indexed)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-bold">33,894 Indexed Entities</span>
            <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50 font-bold">100% Nationwide Coverage</span>
          </div>
        </div>

        {/* Level Flow Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L1] Division</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">8 Divisions</div>
            <div className="text-[10px] text-slate-400">BBS Geocodes</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L2] District</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">64 Zilas</div>
            <div className="text-[10px] text-slate-400">Metro & Rural</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L3-A/B] Sub-Dist</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">495 Upz / 1,349 Thana</div>
            <div className="text-[10px] text-slate-400">One is Must</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L3-C] Ward/Union</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">4,540 Unions / 54 Wards</div>
            <div className="text-[10px] text-slate-400">Grassroots Boundary</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L4] Area</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">6,335 Localities</div>
            <div className="text-[10px] text-slate-400">Fixed City Zones</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L5] Sub-Area</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">Dual Input</div>
            <div className="text-[10px] text-slate-400">Dropdown + Custom</div>
          </div>
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
            <div className="text-[10px] font-black text-emerald-400 uppercase">[L6-7] Doorstep</div>
            <div className="font-extrabold text-slate-100 text-sm mt-0.5">21,091 POIs</div>
            <div className="text-[10px] text-slate-400">Block, Road & Landmark</div>
          </div>
        </div>
      </div>
    </div>
  );
}
