import React from 'react';

export default function HierarchyForm({
  type,
  title,
  subtitle,
  lat,
  lon,
  setLat,
  setLon,
  hierarchy,
  setHierarchy,
  result,
  divisionList,
  getDistrictsForDivision,
  getUpazilasForDistrict,
  getThanasForDistrict,
  getWardsAndUnions,
  getAvailableAreas,
  getAvailableSubAreas,
  onSyncFromCoords,
  onFindNearestHub
}) {
  const isPickup = type === 'pickup';
  const isOut = result?.hubAssign?.isOutOfZone;
  const hasUpzOrThana = Boolean(hierarchy.upazila || hierarchy.thana);

  const updateField = (field, value) => {
    setHierarchy(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'division') {
        const dists = getDistrictsForDivision(value);
        next.district = dists[0] || 'Dhaka';
        next.upazila = '';
        next.thana = '';
        next.wardUnion = '';
      } else if (field === 'district') {
        next.upazila = '';
        next.thana = '';
        next.wardUnion = '';
      } else if (field === 'upazila' && value) {
        next.thana = '';
        next.wardUnion = '';
      } else if (field === 'thana' && value) {
        next.upazila = '';
        next.wardUnion = '';
      } else if (field === 'area') {
        const subList = getAvailableSubAreas(value, next.district);
        next.subArea = subList[0] || '';
      }
      return next;
    });
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border-2 space-y-5 transition ${
      isOut ? 'border-amber-400 ring-2 ring-amber-400/20' : (isPickup ? 'border-emerald-300' : 'border-sky-300')
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-sm ${
            isOut ? 'bg-amber-600' : (isPickup ? 'bg-emerald-600' : 'bg-sky-600')
          }`}>
            {isPickup ? 'P' : 'D'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-slate-900 text-base">{title}</h3>
            </div>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>

        {isOut ? (
          <span className="text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg animate-pulse">
            ⚠️ OUT OF ZONE (Feeder Fallback)
          </span>
        ) : (
          <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
            🟢 IN-ZONE DIRECT
          </span>
        )}
      </div>

      {/* GPS Coordinates */}
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            🌐 GPS Coordinates (Lat & Lon)
          </span>
          <button
            type="button"
            onClick={onSyncFromCoords}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 underline"
          >
            Auto-populate hierarchy from GPS
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">Latitude</label>
            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">Longitude</label>
            <input
              type="number"
              step="any"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>
        </div>
      </div>

      {/* 7-Level Geographic Dispatch Hierarchy Inputs */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Administrative & Locality Hierarchy:
          </span>
          <span className="text-[10px] text-slate-400">Cascading Dropdowns</span>
        </div>

        {/* Level 1 & Level 2 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              <span className="text-emerald-700 font-black mr-1">[L1]</span> Division:
            </label>
            <select
              value={hierarchy.division}
              onChange={(e) => updateField('division', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              {divisionList.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              <span className="text-emerald-700 font-black mr-1">[L2]</span> District:
            </label>
            <select
              value={hierarchy.district}
              onChange={(e) => updateField('district', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              {getDistrictsForDivision(hierarchy.division).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Level 3-A & Level 3-B */}
        <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700">
              Sub-District Entity Selection:
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              hasUpzOrThana ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800 animate-pulse'
            }`}>
              {hasUpzOrThana ? '✓ Validated' : '⚠️ One is Must'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                <span className="text-emerald-700 font-black mr-1">[L3-A]</span> Upazila (Rural):
              </label>
              <select
                value={hierarchy.upazila}
                onChange={(e) => updateField('upazila', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- None / Metro City --</option>
                {getUpazilasForDistrict(hierarchy.district).map(u => (
                  <option key={u} value={u}>{u} Upazila</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                <span className="text-emerald-700 font-black mr-1">[L3-B]</span> Thana (Metro):
              </label>
              <select
                value={hierarchy.thana}
                onChange={(e) => updateField('thana', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- None / Rural Upazila --</option>
                {getThanasForDistrict(hierarchy.district).map(t => (
                  <option key={t} value={t}>{t} Thana</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Level 3-C: Ward / Union */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span><span className="text-emerald-700 font-black mr-1">[L3-C]</span> Ward / Union (Grassroots):</span>
            <span className="text-[10px] text-slate-400 font-normal">Optional</span>
          </label>
          <select
            value={hierarchy.wardUnion}
            onChange={(e) => updateField('wardUnion', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select Ward or Union (Optional) --</option>
            {getWardsAndUnions(hierarchy.district, hierarchy.upazila, hierarchy.thana).map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Level 4: Area / Locality */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span><span className="text-emerald-700 font-black mr-1">[L4]</span> Area / Locality:</span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Fixed Dropdown</span>
          </label>
          <select
            value={hierarchy.area}
            onChange={(e) => updateField('area', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-emerald-50/40 border border-emerald-300 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            {getAvailableAreas(hierarchy.district).map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Level 5: Sub-Area & Sections */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span><span className="text-emerald-700 font-black mr-1">[L5]</span> Sub-Area & Sections:</span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Dropdown + Typing</span>
          </label>

          <div className="space-y-2">
            <select
              value={hierarchy.subArea}
              onChange={(e) => updateField('subArea', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Quick Pick Known Sub-Area --</option>
              {getAvailableSubAreas(hierarchy.area, hierarchy.district).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <div className="relative">
              <input
                type="text"
                list={`${type}-subarea-list`}
                placeholder="Or type custom sub-area / section name..."
                value={hierarchy.subArea}
                onChange={(e) => updateField('subArea', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id={`${type}-subarea-list`}>
                {getAvailableSubAreas(hierarchy.area, hierarchy.district).map(s => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* Level 6 & Level 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
              <span><span className="text-emerald-700 font-black mr-1">[L6]</span> Block / Sector:</span>
              <span className="text-[10px] text-slate-400">Nullable</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Block C, Sector 4"
              value={hierarchy.block}
              onChange={(e) => updateField('block', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              <span className="text-emerald-700 font-black mr-1">[L7]</span> Road / Instruction:
            </label>
            <input
              type="text"
              placeholder="e.g. Near Hope School, Road 4"
              value={hierarchy.road}
              onChange={(e) => updateField('road', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Action Button: Find Nearest Hub with Glow Effect */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onFindNearestHub}
          className={`w-full py-2.5 px-4 rounded-2xl font-black text-xs text-white shadow-lg border flex items-center justify-center space-x-2 transition-all transform active:scale-95 uppercase tracking-wider cursor-pointer ${
            isPickup
              ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 border-emerald-400/70 glow-btn'
              : 'bg-gradient-to-r from-sky-600 via-teal-500 to-sky-600 hover:from-sky-500 hover:to-teal-400 border-sky-400/70 glow-btn-sky'
          }`}
        >
          <span className="text-sm">🎯</span>
          <span>Find Nearest Hub</span>
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping ml-1"></span>
        </button>
      </div>

      {/* Assigned Hub Live Box */}
      {result?.hubAssign && (
        <div className={`p-4 rounded-2xl border-2 space-y-1.5 transition ${
          isOut ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-emerald-50 border-emerald-400 text-emerald-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider">
              {isOut ? '⚠️ Nearest Operational Hub (Fallback):' : '🟢 Assigned Primary Hub:'}
            </span>
            <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              {result.hubAssign.distanceKm} km
            </span>
          </div>
          <div className="font-extrabold text-base">
            {result.hubAssign.hub.name} [{result.hubAssign.hub.code}]
          </div>
          <p className="text-xs opacity-90 leading-tight">📍 {result.hubAssign.hub.address}</p>
          <div className="text-[11px] font-mono opacity-80 pt-1 border-t border-black/10">
            Rule: {result.hubAssign.rule}
          </div>
        </div>
      )}
    </div>
  );
}
