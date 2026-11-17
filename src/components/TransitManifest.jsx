import React from 'react';

export default function TransitManifest({
  pickupResult,
  deliveryResult,
  pickupHierarchy,
  deliveryHierarchy,
  totalDist,
  pickupIsOut,
  deliveryIsOut,
  pkgWeight,
  setPkgWeight,
  deliverySpeed,
  setDeliverySpeed,
  codAmount,
  setCodAmount,
  baseCharge,
  weightSurcharge,
  pickupSurcharge,
  deliverySurcharge,
  codFee,
  totalConsignmentFee,
  netMerchantPayout,
  onCopyWaybill,
  copiedWaybill
}) {
  if (!pickupResult || !deliveryResult) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-black text-slate-900 text-lg">
              Courier Logistics Transit Chain & Pricing Manifest
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Consignment: <strong className="text-slate-800 font-mono">NC-2026-{pickupResult.hubAssign?.hub.code}-{deliveryResult.hubAssign?.hub.code}</strong> | Distance: <strong className="text-emerald-600 font-mono">{totalDist} km</strong>
          </p>
        </div>

        {/* SLA and Billing Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`px-3 py-1.5 rounded-xl font-bold border ${
            (pickupIsOut || deliveryIsOut)
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
          }`}>
            SLA: {(pickupIsOut || deliveryIsOut) ? 'Extended Feeder (+24h)' : (deliverySpeed === 'express' ? '⚡ Flash Same-Day (<6h)' : 'Standard Next-Day (24h)')}
          </span>

          <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl font-black text-sm shadow-sm">
            Total Fee: ৳{totalConsignmentFee}
          </span>
        </div>
      </div>

      {/* DYNAMIC DISPATCH SIMULATOR CONTROLS */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
            <span>📦 Consignment Weight:</span>
            <span className="font-mono text-emerald-700 font-black">{pkgWeight} kg</span>
          </label>
          <div className="flex items-center space-x-1.5">
            {[0.5, 1, 2, 5, 10].map(w => (
              <button
                key={w}
                type="button"
                onClick={() => setPkgWeight(w)}
                className={`px-2.5 py-1 rounded-lg font-bold transition border ${
                  pkgWeight === w ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {w}kg
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1.5">
            ⚡ Delivery Service Tier:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setDeliverySpeed('standard')}
              className={`py-1 px-2 rounded-lg font-bold border transition text-center ${
                deliverySpeed === 'standard' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              🚚 Standard (৳60)
            </button>
            <button
              type="button"
              onClick={() => setDeliverySpeed('express')}
              className={`py-1 px-2 rounded-lg font-bold border transition text-center ${
                deliverySpeed === 'express' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              ⚡ Express (৳100)
            </button>
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
            <span>💵 Cash on Delivery (COD):</span>
            <span className="font-mono text-slate-500 font-semibold">1% Fee: ৳{codFee}</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 font-bold">৳</span>
            <input
              type="number"
              min="0"
              step="100"
              value={codAmount}
              onChange={(e) => setCodAmount(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Surcharge Note if Out of Zone */}
      {(pickupIsOut || deliveryIsOut) ? (
        <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <strong className="font-black uppercase text-[11px] text-amber-900 flex items-center gap-1.5">
              <span>⚠️ Out-of-Zone Dispatch Surcharges Applied:</span>
            </strong>
            <p className="text-amber-800">
              Points outside primary metro hub zones are automatically linked to the nearest operational first-mile / last-mile hubs with feeder routing.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-xs bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
            <span>Base: ৳{baseCharge}</span>
            {pickupIsOut && <span className="text-amber-700">+ Feeder Pick: ৳30</span>}
            {deliveryIsOut && <span className="text-amber-700">+ Feeder Drop: ৳30</span>}
            {weightSurcharge > 0 && <span className="text-slate-600">+ Weight: ৳{weightSurcharge}</span>}
            {codFee > 0 && <span className="text-slate-600">+ COD: ৳{codFee}</span>}
            <span className="text-emerald-700 font-black">= ৳{totalConsignmentFee}</span>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-center justify-between">
          <span className="font-semibold flex items-center gap-1.5">
            <span>🟢 Core Metropolitan Coverage:</span> Both origin and destination are inside primary hub dispatch zones.
          </span>
          <span className="font-mono font-bold text-emerald-800">0 km Feeder Penalty</span>
        </div>
      )}

      {/* 5-Step Visual Logistics Transit Chain */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {/* Step 1: Origin */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1 relative">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">1. Origin Collection</span>
          <div className="font-black text-xs text-slate-800 truncate" title={pickupHierarchy.area}>
            {pickupHierarchy.subArea ? `${pickupHierarchy.area} (${pickupHierarchy.subArea})` : pickupHierarchy.area}
          </div>
          <p className="text-[10px] text-slate-500 truncate">{pickupHierarchy.road || 'Doorstep Pickup'}</p>
          <span className={`text-[10px] font-bold block mt-1 py-0.5 px-2 rounded-full ${
            pickupIsOut ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {pickupIsOut ? '🛵 Feeder Rider Leg' : '🛵 Direct Hub Rider'}
          </span>
        </div>

        {/* Step 2: First-Mile Hub */}
        <div className={`p-4 rounded-2xl border-2 text-center space-y-1 shadow-sm ${
          pickupIsOut ? 'bg-amber-50 border-amber-400' : 'bg-emerald-50 border-emerald-400'
        }`}>
          <span className="text-[10px] font-bold uppercase block text-slate-600">
            {pickupIsOut ? '2. Nearest First-Mile Hub' : '2. Origin Primary Hub'}
          </span>
          <div className="font-black text-sm text-slate-900 font-mono">
            [{pickupResult.hubAssign?.hub.code}]
          </div>
          <span className="text-[11px] font-bold text-slate-700 block truncate">
            {pickupResult.hubAssign?.hub.name}
          </span>
          <div className="text-[10px] text-slate-500 font-mono">Inward & Barcode Audit</div>
        </div>

        {/* Step 3: Central Sorting / Linehaul */}
        <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-300 text-center space-y-1 shadow-sm">
          <span className="text-[10px] font-bold text-purple-700 uppercase block">3. Linehaul Trunk Route</span>
          <div className="font-black text-sm text-purple-950 font-mono">[TEJ-SORT-01]</div>
          <span className="text-[11px] text-purple-900 font-bold block truncate">
            Tejgaon Central Consolidation
          </span>
          <div className="text-[10px] text-purple-700 font-semibold font-mono">
            {totalDist} km • Covered Van
          </div>
        </div>

        {/* Step 4: Last-Mile Hub */}
        <div className={`p-4 rounded-2xl border-2 text-center space-y-1 shadow-sm ${
          deliveryIsOut ? 'bg-amber-50 border-amber-400' : 'bg-sky-50 border-sky-400'
        }`}>
          <span className="text-[10px] font-bold uppercase block text-slate-600">
            {deliveryIsOut ? '4. Nearest Last-Mile Hub' : '4. Destination Hub'}
          </span>
          <div className="font-black text-sm text-slate-900 font-mono">
            [{deliveryResult.hubAssign?.hub.code}]
          </div>
          <span className="text-[11px] font-bold text-slate-700 block truncate">
            {deliveryResult.hubAssign?.hub.name}
          </span>
          <div className="text-[10px] text-slate-500 font-mono">De-bag & Route Sort</div>
        </div>

        {/* Step 5: Final Delivery */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">5. Final Handover</span>
          <div className="font-black text-xs text-slate-800 truncate" title={deliveryHierarchy.area}>
            {deliveryHierarchy.subArea ? `${deliveryHierarchy.area} (${deliveryHierarchy.subArea})` : deliveryHierarchy.area}
          </div>
          <p className="text-[10px] text-slate-500 truncate">{deliveryHierarchy.road || 'Doorstep Delivery'}</p>
          <span className={`text-[10px] font-bold block mt-1 py-0.5 px-2 rounded-full ${
            deliveryIsOut ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
          }`}>
            {deliveryIsOut ? '📦 Feeder Drop-off' : '📦 Doorstep Delivery'}
          </span>
        </div>
      </div>

      {/* Financial Manifest Breakdown Table */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
            Consignment Airway Bill (AWB) Financial Breakdown:
          </span>
          <span className="font-mono text-slate-400 text-[11px]">
            Booking Ref: NC-{Date.now().toString().slice(-6)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Base Transit</span>
            <strong className="text-sm font-mono font-bold text-white">৳{baseCharge}</strong>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Weight Surcharge</span>
            <strong className="text-sm font-mono font-bold text-white">৳{weightSurcharge}</strong>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">1st-Mile Feeder</span>
            <strong className={`text-sm font-mono font-bold ${pickupSurcharge > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              ৳{pickupSurcharge}
            </strong>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Last-Mile Feeder</span>
            <strong className={`text-sm font-mono font-bold ${deliverySurcharge > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              ৳{deliverySurcharge}
            </strong>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">1% COD Fee</span>
            <strong className="text-sm font-mono font-bold text-white">৳{codFee}</strong>
          </div>
          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-500/60">
            <span className="text-emerald-400 block text-[10px] font-bold">Total Billable Fee</span>
            <strong className="text-base font-mono font-black text-emerald-300">৳{totalConsignmentFee}</strong>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-slate-300 font-mono text-[11px]">
          <div>
            <span>COD to Collect: </span>
            <strong className="text-white">৳{codAmount}</strong>
            <span className="mx-2">|</span>
            <span>Net Merchant Settlement: </span>
            <strong className="text-emerald-400 font-bold">৳{netMerchantPayout}</strong>
          </div>
          <div className="text-slate-400">
            Pipeline: [{pickupResult.hubAssign?.hub.code}] ➔ TEJ-SORT-01 ➔ [{deliveryResult.hubAssign?.hub.code}]
          </div>
        </div>
      </div>
    </div>
  );
}
