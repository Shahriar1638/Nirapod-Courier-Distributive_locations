import React, { useState } from 'react';

export default function SingleCoordinateInspector({
  inspLat,
  setInspLat,
  inspLon,
  setInspLon,
  inspHierarchy,
  setInspHierarchy,
  inspResult,
  divisionList,
  getDistrictsForDivision,
  getUpazilasForDistrict,
  getThanasForDistrict,
  getWardsAndUnions,
  getAvailableAreas,
  getAvailableSubAreas,
  updateInspectorHierarchy,
  inspectorNearbyLandmarks
}) {
  const [copiedCoords, setCopiedCoords] = useState(false);

  const presets = [
    { label: 'Mirpur-10 (Hope School)', lat: '23.80811', lon: '90.37306', area: 'Mirpur', subArea: 'Mirpur 10' },
    { label: 'Dhanmondi-27 (Rapa Plaza)', lat: '23.75380', lon: '90.37680', area: 'Dhanmondi', subArea: 'Dhanmondi 27 (Old)' },
    { label: 'Kaundia (Savar Rural)', lat: '23.80556', lon: '90.33889', area: 'Savar', subArea: 'Kaundia' },
    { label: 'Merul Badda (Dhaka)', lat: '23.76900', lon: '90.42600', area: 'Badda', subArea: 'Merul Badda' },
    { label: 'Uttara Sector 3', lat: '23.86930', lon: '90.39270', area: 'Uttara', subArea: 'Sector 3' },
    { label: 'Debidwar (Cumilla)', lat: '23.57970', lon: '90.99800', area: 'Debidwar', subArea: 'Debidwar Sadar' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Control Bar: Coordinates & Presets */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-extrabold text-slate-900 text-base tracking-tight">
              Single Coordinate & Locality Inspector
            </h2>
            <p className="text-xs text-slate-500">
              Input any GPS coordinates across Bangladesh, or pick dropdowns below to inspect reverse geocoding, operational hub fallback, and doorstep POI landmarks.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`${inspLat}, ${inspLon}`);
                setCopiedCoords(true);
                setTimeout(() => setCopiedCoords(false), 2000);
              }}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              {copiedCoords ? '✓ Coords Copied!' : '📋 Copy Coords'}
            </button>
          </div>
        </div>

        {/* Lat/Lon Inputs & Quick Test Presets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="text-xs font-bold text-slate-700 block mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={inspLat}
              onChange={(e) => setInspLat(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="md:col-span-3">
            <label className="text-xs font-bold text-slate-700 block mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={inspLon}
              onChange={(e) => setInspLon(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Presets Chips */}
          <div className="md:col-span-6 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Quick Test Inspection Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInspLat(p.lat);
                    setInspLon(p.lon);
                    setInspHierarchy(prev => ({ ...prev, area: p.area, subArea: p.subArea }));
                  }}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 transition"
                >
                  📍 {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: [L1-L5] on Left, [L6-L7] on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDE: Level 1 to Level 5 Dropdowns */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Administrative & Locality Flow
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm mt-1">
                [L1] to [L5] Hierarchy Dropdowns
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Cascading Auto-Sync</span>
          </div>

          {/* [L1] Division & [L2] District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                <span className="text-emerald-700 font-extrabold mr-1">[L1]</span> Division:
              </label>
              <select
                value={inspHierarchy.division}
                onChange={(e) => updateInspectorHierarchy('division', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {divisionList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                <span className="text-emerald-700 font-extrabold mr-1">[L2]</span> District:
              </label>
              <select
                value={inspHierarchy.district}
                onChange={(e) => updateInspectorHierarchy('district', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {getDistrictsForDivision(inspHierarchy.division).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* [L3-A] Upazila & [L3-B] Thana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                <span className="text-emerald-700 font-extrabold mr-1">[L3-A]</span> Upazila (Rural):
              </label>
              <select
                value={inspHierarchy.upazila}
                onChange={(e) => updateInspectorHierarchy('upazila', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Optional / None --</option>
                {getUpazilasForDistrict(inspHierarchy.district).map(u => (
                  <option key={u} value={u}>{u} Upazila</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                <span className="text-emerald-700 font-extrabold mr-1">[L3-B]</span> Thana (Metro):
              </label>
              <select
                value={inspHierarchy.thana}
                onChange={(e) => updateInspectorHierarchy('thana', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Optional / None --</option>
                {getThanasForDistrict(inspHierarchy.district).map(t => (
                  <option key={t} value={t}>{t} Thana</option>
                ))}
              </select>
            </div>
          </div>

          {/* [L3-C] Ward / Union */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              <span className="text-emerald-700 font-extrabold mr-1">[L3-C]</span> Ward / Union (4,540 Unions / 54 Wards):
            </label>
            <select
              value={inspHierarchy.wardUnion}
              onChange={(e) => updateInspectorHierarchy('wardUnion', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Select Ward or Union --</option>
              {getWardsAndUnions(inspHierarchy.district, inspHierarchy.upazila, inspHierarchy.thana).map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* [L4] Area / Locality */}
          <div className="pt-1 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              <span className="text-emerald-700 font-extrabold mr-1">[L4]</span> Area / Locality:
            </label>
            <select
              value={inspHierarchy.area}
              onChange={(e) => updateInspectorHierarchy('area', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              {getAvailableAreas(inspHierarchy.district).map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* [L5] Sub-Area & Section (Dual Input) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              <span className="text-emerald-700 font-extrabold mr-1">[L5]</span> Sub-Area & Sections (Dual Input):
            </label>
            
            <div className="space-y-2">
              {/* Companion Dropdown */}
              <select
                value={inspHierarchy.subArea}
                onChange={(e) => updateInspectorHierarchy('subArea', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-emerald-50/60 border border-emerald-300 rounded-xl font-semibold text-emerald-950 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Quick Pick Known Sub-Area --</option>
                {getAvailableSubAreas(inspHierarchy.area, inspHierarchy.district).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {/* Free Text Input with Datalist */}
              <div className="relative">
                <input
                  type="text"
                  list="insp-subarea-list"
                  placeholder="Or type custom sub-area name..."
                  value={inspHierarchy.subArea}
                  onChange={(e) => updateInspectorHierarchy('subArea', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
                <datalist id="insp-subarea-list">
                  {getAvailableSubAreas(inspHierarchy.area, inspHierarchy.district).map(s => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>💡 <strong>Live Coordinate Sync:</strong> Dropdown picks auto-calculate representative centroids.</span>
            <span className="font-mono text-emerald-700 font-bold">{inspLat}, {inspLon}</span>
          </div>
        </div>

        {/* RIGHT SIDE: Level 6 & Level 7 Under Selected Level 5 */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Level 6 & Level 7 Doorstep Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  Doorstep Last-Mile Specifics
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm mt-1">
                  [L6] & [L7] Under Selected [L5]: <span className="text-emerald-700">{inspHierarchy.subArea || inspHierarchy.area}</span>
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Precision Layer</span>
            </div>

            {/* [L6] Block / Sector / Section */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                <span className="text-teal-700 font-extrabold mr-1">[L6]</span> Block / Sector / Section:
              </label>
              
              {/* Quick Block Pills */}
              <div className="flex flex-wrap gap-1 mb-2">
                {['Block A', 'Block B', 'Block C', 'Block D', 'Section 1', 'Section 6', 'Section 10', 'Sector 3', 'Sector 4', 'Road 27'].map(blk => (
                  <button
                    key={blk}
                    type="button"
                    onClick={() => setInspHierarchy(prev => ({ ...prev, block: blk }))}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition ${
                      inspHierarchy.block === blk
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {blk}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="e.g. Block C, Section 10, or Sector 4"
                value={inspHierarchy.block}
                onChange={(e) => setInspHierarchy(prev => ({ ...prev, block: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* [L7] Road / House / Landmark / Delivery Instruction */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                <span className="text-teal-700 font-extrabold mr-1">[L7]</span> Road, House & POI Landmark (Delivery Instruction):
              </label>
              
              <input
                type="text"
                placeholder="e.g. Hope International School Road, House 12, Road 4"
                value={inspHierarchy.road}
                onChange={(e) => setInspHierarchy(prev => ({ ...prev, road: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500"
              />

              {/* Live Filtered Nearby Landmarks Chips for [L7] */}
              {inspectorNearbyLandmarks.length > 0 && (
                <div className="mt-3 bg-teal-50/50 border border-teal-200/80 rounded-2xl p-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-teal-800 uppercase block">
                    📍 Instant POI Landmarks in {inspHierarchy.subArea || inspHierarchy.area} (Click to Pin):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {inspectorNearbyLandmarks.map((lm, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setInspHierarchy(prev => ({ ...prev, road: lm.nameEn || lm.name }));
                          setInspLat(lm.lat.toFixed(5));
                          setInspLon(lm.lon.toFixed(5));
                        }}
                        className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white hover:bg-teal-600 hover:text-white border border-teal-200 text-teal-900 transition flex items-center gap-1 shadow-2xs"
                      >
                        <span>{lm.type === 'school' ? '🏫' : (lm.type === 'hospital' ? '🏥' : (lm.type === 'bank' ? '🏦' : '📍'))}</span>
                        <span className="truncate max-w-[170px]">{lm.nameEn || lm.name}</span>
                        <span className="text-[9px] opacity-75 font-mono">({lm.dist.toFixed(1)}km)</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Operational Hub Assignment & Reverse Geocoded Card */}
          {inspResult && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Operational Hub & Reverse Geocode Result
                </h4>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                  inspResult.hubAssign.isOutOfZone ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {inspResult.hubAssign.isOutOfZone ? '⚠️ Out-of-Zone Fallback Hub' : '🟢 Primary Coverage Hub'}
                </span>
              </div>

              {/* Hub Details Box */}
              <div className={`p-4 rounded-2xl border-2 space-y-1.5 ${
                inspResult.hubAssign.isOutOfZone
                  ? 'bg-amber-50/90 border-amber-400 text-amber-950'
                  : 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black">
                    {inspResult.hubAssign.hub.name} [{inspResult.hubAssign.hub.code}]
                  </span>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {inspResult.hubAssign.distanceKm} km away
                  </span>
                </div>
                <p className="text-xs font-medium opacity-90">📍 Hub Address: {inspResult.hubAssign.hub.address}</p>
                <p className="text-[11px] font-mono opacity-80">Assignment Rule: {inspResult.hubAssign.rule}</p>
              </div>

              {/* Full Address */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Resolved Complete Address:</span>
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {inspResult.loc.humanReadableAddressEn}
                </div>
                <div className="text-xs font-semibold text-emerald-700 bangla-text">
                  {inspResult.loc.humanReadableAddressBn}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
