import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.jsx';
import HierarchyMetadata from './components/HierarchyMetadata.jsx';
import ScenarioBar from './components/ScenarioBar.jsx';
import HierarchyForm from './components/HierarchyForm.jsx';
import TransitManifest from './components/TransitManifest.jsx';
import HubDirectory from './components/HubDirectory.jsx';
import SingleCoordinateInspector from './components/SingleCoordinateInspector.jsx';

import {
  COURIER_HUBS,
  getDistanceKm,
  assignCourierHub,
  resolveCoordinatesToHierarchy
} from './utils/hubRouting.js';
import { COURIER_CITY_CATALOG } from './constants/courierCatalog.js';

export default function App() {
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active Tab: 'router' | 'inspector'
  const [activeTab, setActiveTab] = useState('router');

  // Dynamic Consignment Parameters
  const [pkgWeight, setPkgWeight] = useState(1);
  const [deliverySpeed, setDeliverySpeed] = useState('standard');
  const [codAmount, setCodAmount] = useState(1500);

  // PICKUP STATE: 7-Level Hierarchy
  const [pickupLat, setPickupLat] = useState("23.8060");
  const [pickupLon, setPickupLon] = useState("90.3630");
  const [pickupHierarchy, setPickupHierarchy] = useState({
    division: "Dhaka",
    district: "Dhaka",
    upazila: "",
    thana: "Mirpur",
    wardUnion: "Ward 10",
    area: "Mirpur",
    subArea: "Mirpur 6",
    block: "",
    road: "Mirpur Stadium, Section 6"
  });
  const [pickupResult, setPickupResult] = useState(null);

  // DELIVERY STATE: 7-Level Hierarchy
  const [deliveryLat, setDeliveryLat] = useState("23.7538");
  const [deliveryLon, setDeliveryLon] = useState("90.3768");
  const [deliveryHierarchy, setDeliveryHierarchy] = useState({
    division: "Dhaka",
    district: "Dhaka",
    upazila: "",
    thana: "Dhanmondi",
    wardUnion: "Ward 15",
    area: "Dhanmondi",
    subArea: "Dhanmondi 27 (Old)",
    block: "",
    road: "House 34, Road 27, Rapa Plaza"
  });
  const [deliveryResult, setDeliveryResult] = useState(null);

  // INSPECTOR (TAB 2) STATE
  const [inspLat, setInspLat] = useState("23.80811");
  const [inspLon, setInspLon] = useState("90.37306");
  const [inspHierarchy, setInspHierarchy] = useState({
    division: "Dhaka",
    district: "Dhaka",
    upazila: "",
    thana: "Mirpur",
    wardUnion: "Ward 10",
    area: "Mirpur",
    subArea: "Mirpur 10",
    block: "Block C",
    road: "Hope International School Road, Section 10"
  });
  const [inspResult, setInspResult] = useState(null);

  const [copiedWaybill, setCopiedWaybill] = useState(false);

  // Load dataset
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.LOCATION_DATA) {
        setDataset(window.LOCATION_DATA);
        setLoading(false);
      } else {
        fetch('./location_data.json')
          .then(res => res.json())
          .then(data => {
            setDataset(data);
            setLoading(false);
          })
          .catch(err => {
            // Fallback to absolute or bundled data if in Vite
            import('./data/location_data.json')
              .then(mod => {
                setDataset(mod.default);
                setLoading(false);
              })
              .catch(e => {
                setError("Could not load location_data.json. Ensure file exists.");
                setLoading(false);
              });
          });
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, []);

  // Division list
  const divisionList = useMemo(() => {
    if (!dataset || !dataset.divisions) return ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'];
    return dataset.divisions.map(d => d.name);
  }, [dataset]);

  // Cascading helpers
  const getDistrictsForDivision = (divName) => {
    if (!dataset || !dataset.districts) return ['Dhaka'];
    const matched = dataset.districts.filter(d => d.division_name === divName);
    return matched.length > 0 ? matched.map(d => d.name) : ['Dhaka'];
  };

  const getUpazilasForDistrict = (distName) => {
    if (!dataset || !dataset.upazilas) return [];
    return dataset.upazilas.filter(u => u.district_name === distName).map(u => u.name);
  };

  const getThanasForDistrict = (distName) => {
    if (!dataset || !dataset.postcodes) return [];
    const thanas = new Set();
    dataset.postcodes
      .filter(p => p.district_name === distName && p.thana)
      .forEach(p => thanas.add(p.thana));
    return Array.from(thanas).sort();
  };

  const getWardsAndUnions = (distName, upzName, thanaName) => {
    if (!dataset) return [];
    if (upzName && dataset.unions) {
      const unions = dataset.unions
        .filter(u => u.district_name === distName && u.upazila_name === upzName)
        .map(u => `${u.name} Union`);
      if (unions.length > 0) return unions;
    }
    return Array.from({ length: 54 }, (_, i) => `Ward ${i + 1}`);
  };

  const getAvailableAreas = (distName) => {
    const catalog = COURIER_CITY_CATALOG[distName] || COURIER_CITY_CATALOG['Dhaka'];
    return Object.keys(catalog);
  };

  const getAvailableSubAreas = (areaName, distName) => {
    if (!areaName) return [];
    const catalog = COURIER_CITY_CATALOG[distName] || COURIER_CITY_CATALOG['Dhaka'];
    return catalog[areaName] || [];
  };

  // Sync Hierarchy from GPS coordinates
  const syncHierarchyFromCoords = (isPickup) => {
    const lat = parseFloat(isPickup ? pickupLat : deliveryLat);
    const lon = parseFloat(isPickup ? pickupLon : deliveryLon);
    if (!isNaN(lat) && !isNaN(lon) && dataset) {
      const loc = resolveCoordinatesToHierarchy(dataset, lat, lon);
      if (isPickup) {
        setPickupHierarchy(prev => ({
          ...prev,
          division: loc.extractedHierarchy.division,
          district: loc.extractedHierarchy.district,
          upazila: loc.extractedHierarchy.upazila,
          thana: loc.extractedHierarchy.thana,
          wardUnion: loc.extractedHierarchy.wardUnion,
          area: loc.extractedHierarchy.area,
          subArea: loc.extractedHierarchy.subArea || prev.subArea,
          road: loc.extractedHierarchy.road || prev.road
        }));
      } else {
        setDeliveryHierarchy(prev => ({
          ...prev,
          division: loc.extractedHierarchy.division,
          district: loc.extractedHierarchy.district,
          upazila: loc.extractedHierarchy.upazila,
          thana: loc.extractedHierarchy.thana,
          wardUnion: loc.extractedHierarchy.wardUnion,
          area: loc.extractedHierarchy.area,
          subArea: loc.extractedHierarchy.subArea || prev.subArea,
          road: loc.extractedHierarchy.road || prev.road
        }));
      }
    }
  };

  // Update Pickup Routing
  useEffect(() => {
    if (!dataset) return;
    const pLat = parseFloat(pickupLat);
    const pLon = parseFloat(pickupLon);
    if (!isNaN(pLat) && !isNaN(pLon)) {
      const loc = resolveCoordinatesToHierarchy(dataset, pLat, pLon);
      const hubAssign = assignCourierHub(loc, pickupHierarchy, true);
      setPickupResult({ loc, hubAssign });
    }
  }, [dataset, pickupLat, pickupLon, pickupHierarchy]);

  // Update Delivery Routing
  useEffect(() => {
    if (!dataset) return;
    const dLat = parseFloat(deliveryLat);
    const dLon = parseFloat(deliveryLon);
    if (!isNaN(dLat) && !isNaN(dLon)) {
      const loc = resolveCoordinatesToHierarchy(dataset, dLat, dLon);
      const hubAssign = assignCourierHub(loc, deliveryHierarchy, false);
      setDeliveryResult({ loc, hubAssign });
    }
  }, [dataset, deliveryLat, deliveryLon, deliveryHierarchy]);

  // Update Single Inspector (Tab 2)
  useEffect(() => {
    if (!dataset) return;
    const lat = parseFloat(inspLat);
    const lon = parseFloat(inspLon);
    if (!isNaN(lat) && !isNaN(lon)) {
      const loc = resolveCoordinatesToHierarchy(dataset, lat, lon);
      const hubAssign = assignCourierHub(loc, inspHierarchy, true);
      setInspResult({ loc, hubAssign });
    }
  }, [dataset, inspLat, inspLon, inspHierarchy]);

  // Inspector Hierarchy Handler
  const updateInspectorHierarchy = (field, val) => {
    setInspHierarchy(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'division') {
        const dists = getDistrictsForDivision(val);
        next.district = dists[0] || 'Dhaka';
        next.upazila = '';
        next.thana = '';
        next.wardUnion = '';
      } else if (field === 'district') {
        next.upazila = '';
        next.thana = '';
        next.wardUnion = '';
      } else if (field === 'upazila' && val) {
        next.thana = '';
        next.wardUnion = '';
      } else if (field === 'thana' && val) {
        next.upazila = '';
        next.wardUnion = '';
      } else if (field === 'area') {
        const subList = getAvailableSubAreas(val, next.district);
        next.subArea = subList[0] || '';
      }
      return next;
    });

    if (!dataset) return;
    if (field === 'area' || field === 'subArea') {
      const searchName = (val || '').toLowerCase();
      const match = dataset.osm_places?.find(p => 
        p.nameEn?.toLowerCase() === searchName || 
        p.name?.toLowerCase() === searchName ||
        p.nameEn?.toLowerCase().includes(searchName)
      );
      if (match && match.lat && match.lon) {
        setInspLat(match.lat.toFixed(5));
        setInspLon(match.lon.toFixed(5));
      }
    } else if (field === 'upazila') {
      const upz = dataset.upazilas?.find(u => u.name.toLowerCase() === (val || '').toLowerCase());
      if (upz && upz.lat && upz.lon) {
        setInspLat(upz.lat.toFixed(5));
        setInspLon(upz.lon.toFixed(5));
      }
    } else if (field === 'district') {
      const dist = dataset.districts?.find(d => d.name.toLowerCase() === (val || '').toLowerCase());
      if (dist && dist.lat && dist.lon) {
        setInspLat(dist.lat.toFixed(5));
        setInspLon(dist.lon.toFixed(5));
      }
    }
  };

  // Filtered Nearby Landmarks for [L7] in Single Coordinate Inspector
  const inspectorNearbyLandmarks = useMemo(() => {
    if (!dataset || !dataset.osm_landmarks) return [];
    const lat = parseFloat(inspLat);
    const lon = parseFloat(inspLon);
    const areaName = (inspHierarchy.area || '').toLowerCase();
    const subAreaName = (inspHierarchy.subArea || '').toLowerCase();

    const results = [];
    for (const lm of dataset.osm_landmarks) {
      const dist = (!isNaN(lat) && !isNaN(lon)) ? getDistanceKm(lat, lon, lm.lat, lm.lon) : 999;
      const matchArea = (lm.nameEn && (lm.nameEn.toLowerCase().includes(subAreaName) || lm.nameEn.toLowerCase().includes(areaName)));
      if (dist <= 3.5 || (matchArea && dist <= 12.0)) {
        results.push({ ...lm, dist });
      }
      if (results.length >= 24) break;
    }
    return results.sort((a, b) => a.dist - b.dist);
  }, [dataset, inspLat, inspLon, inspHierarchy.area, inspHierarchy.subArea]);

  // Apply Demonstration Scenario
  const applyScenario = (sc) => {
    setPickupLat(sc.pickup.lat.toString());
    setPickupLon(sc.pickup.lon.toString());
    setDeliveryLat(sc.delivery.lat.toString());
    setDeliveryLon(sc.delivery.lon.toString());

    setPickupHierarchy(prev => ({
      ...prev,
      upazila: sc.pickup.upazila || "",
      thana: sc.pickup.thana || "",
      wardUnion: sc.pickup.wardUnion || "",
      area: sc.pickup.area || "Mirpur",
      subArea: sc.pickup.subArea || "",
      road: sc.pickup.road || ""
    }));

    setDeliveryHierarchy(prev => ({
      ...prev,
      upazila: sc.delivery.upazila || "",
      thana: sc.delivery.thana || "",
      wardUnion: sc.delivery.wardUnion || "",
      area: sc.delivery.area || "Dhanmondi",
      subArea: sc.delivery.subArea || "",
      road: sc.delivery.road || ""
    }));
  };

  // Pricing calculations
  const totalDist = (pickupResult && deliveryResult)
    ? getDistanceKm(pickupResult.loc.coords.lat, pickupResult.loc.coords.lon, deliveryResult.loc.coords.lat, deliveryResult.loc.coords.lon).toFixed(1)
    : '0.0';

  const pickupIsOut = pickupResult?.hubAssign?.isOutOfZone;
  const deliveryIsOut = deliveryResult?.hubAssign?.isOutOfZone;

  const isInterDistrict = pickupHierarchy.district && deliveryHierarchy.district && (pickupHierarchy.district !== deliveryHierarchy.district);

  let baseCharge = 60;
  if (isInterDistrict) {
    baseCharge = 130;
  } else if (deliverySpeed === 'express') {
    baseCharge = 100;
  } else {
    baseCharge = 60;
  }

  const weightSurcharge = Math.max(0, Math.ceil(pkgWeight - 1)) * 20;
  const pickupSurcharge = pickupIsOut ? 30 : 0;
  const deliverySurcharge = deliveryIsOut ? 30 : 0;
  const codFee = (codAmount && codAmount > 0) ? Math.round(codAmount * 0.01) : 0;

  const totalConsignmentFee = baseCharge + weightSurcharge + pickupSurcharge + deliverySurcharge + codFee;
  const netMerchantPayout = Math.max(0, (codAmount || 0) - totalConsignmentFee);

  // Copy Airway Bill Manifest text
  const copyWaybillText = () => {
    const pHub = pickupResult?.hubAssign?.hub;
    const dHub = deliveryResult?.hubAssign?.hub;
    const text = `================================================================
NIRAPOD COURIER - DIGITAL CONSIGNMENT AIRWAY BILL (AWB)
Booking ID: NC-AWB-${Date.now().toString().slice(-8)}
Consignment Code: NC-2026-${pHub?.code || 'ORIG'}-${dHub?.code || 'DEST'}
Distance: ${totalDist} km | Weight: ${pkgWeight} kg | COD: ৳${codAmount}
----------------------------------------------------------------
[1] FIRST-MILE PICKUP:
  - Location: ${pickupHierarchy.area} (${pickupHierarchy.subArea || 'N/A'})
  - Hub Assigned: ${pHub?.name} [${pHub?.code}] (${pickupIsOut ? 'OUT OF ZONE FEEDER' : 'IN-ZONE DIRECT'})
  - Address: ${pickupHierarchy.road || 'N/A'}, ${pickupHierarchy.district}
  - Coordinates: ${pickupLat}, ${pickupLon}

[2] LAST-MILE DELIVERY:
  - Location: ${deliveryHierarchy.area} (${deliveryHierarchy.subArea || 'N/A'})
  - Hub Assigned: ${dHub?.name} [${dHub?.code}] (${deliveryIsOut ? 'OUT OF ZONE FEEDER' : 'IN-ZONE DIRECT'})
  - Address: ${deliveryHierarchy.road || 'N/A'}, ${deliveryHierarchy.district}
  - Coordinates: ${deliveryLat}, ${deliveryLon}

[3] FINANCIAL BILLING:
  - Base Fee: ৳${baseCharge} | Weight Fee: ৳${weightSurcharge}
  - Feeder Surcharges: ৳${pickupSurcharge + deliverySurcharge} | 1% COD Fee: ৳${codFee}
  - TOTAL LOGISTICS CHARGE: ৳${totalConsignmentFee}
  - NET MERCHANT SETTLEMENT: ৳${netMerchantPayout}
================================================================`;
    navigator.clipboard.writeText(text);
    setCopiedWaybill(true);
    setTimeout(() => setCopiedWaybill(false), 2200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-sm text-slate-300">Loading Nirapod Geographic Dataset (33,894 Records)...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <div className="bg-rose-950 border border-rose-500 p-6 rounded-3xl max-w-lg text-center space-y-3">
          <h2 className="text-xl font-black text-rose-400">Dataset Load Error</h2>
          <p className="text-xs text-rose-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 space-y-6 flex-1">
        {activeTab === 'router' ? (
          <div className="space-y-6">
            <HierarchyMetadata onCopyWaybill={copyWaybillText} copiedWaybill={copiedWaybill} />
            <ScenarioBar onSelectScenario={applyScenario} />

            {/* TWO-COLUMN CARDS: PICKUP vs DELIVERY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HierarchyForm
                type="pickup"
                title="1. Pickup Location (First Mile)"
                subtitle="Consignor Origin Point"
                lat={pickupLat}
                lon={pickupLon}
                setLat={setPickupLat}
                setLon={setPickupLon}
                hierarchy={pickupHierarchy}
                setHierarchy={setPickupHierarchy}
                result={pickupResult}
                divisionList={divisionList}
                getDistrictsForDivision={getDistrictsForDivision}
                getUpazilasForDistrict={getUpazilasForDistrict}
                getThanasForDistrict={getThanasForDistrict}
                getWardsAndUnions={getWardsAndUnions}
                getAvailableAreas={getAvailableAreas}
                getAvailableSubAreas={getAvailableSubAreas}
                onSyncFromCoords={() => syncHierarchyFromCoords(true)}
              />

              <HierarchyForm
                type="delivery"
                title="2. Delivery Destination (Last Mile)"
                subtitle="Consignee Dropoff Point"
                lat={deliveryLat}
                lon={deliveryLon}
                setLat={setDeliveryLat}
                setLon={setDeliveryLon}
                hierarchy={deliveryHierarchy}
                setHierarchy={setDeliveryHierarchy}
                result={deliveryResult}
                divisionList={divisionList}
                getDistrictsForDivision={getDistrictsForDivision}
                getUpazilasForDistrict={getUpazilasForDistrict}
                getThanasForDistrict={getThanasForDistrict}
                getWardsAndUnions={getWardsAndUnions}
                getAvailableAreas={getAvailableAreas}
                getAvailableSubAreas={getAvailableSubAreas}
                onSyncFromCoords={() => syncHierarchyFromCoords(false)}
              />
            </div>

            <TransitManifest
              pickupResult={pickupResult}
              deliveryResult={deliveryResult}
              pickupHierarchy={pickupHierarchy}
              deliveryHierarchy={deliveryHierarchy}
              totalDist={totalDist}
              pickupIsOut={pickupIsOut}
              deliveryIsOut={deliveryIsOut}
              pkgWeight={pkgWeight}
              setPkgWeight={setPkgWeight}
              deliverySpeed={deliverySpeed}
              setDeliverySpeed={setDeliverySpeed}
              codAmount={codAmount}
              setCodAmount={setCodAmount}
              baseCharge={baseCharge}
              weightSurcharge={weightSurcharge}
              pickupSurcharge={pickupSurcharge}
              deliverySurcharge={deliverySurcharge}
              codFee={codFee}
              totalConsignmentFee={totalConsignmentFee}
              netMerchantPayout={netMerchantPayout}
              onCopyWaybill={copyWaybillText}
              copiedWaybill={copiedWaybill}
            />

            <HubDirectory />
          </div>
        ) : (
          <SingleCoordinateInspector
            inspLat={inspLat}
            setInspLat={setInspLat}
            inspLon={inspLon}
            setInspLon={setInspLon}
            inspHierarchy={inspHierarchy}
            setInspHierarchy={setInspHierarchy}
            inspResult={inspResult}
            divisionList={divisionList}
            getDistrictsForDivision={getDistrictsForDivision}
            getUpazilasForDistrict={getUpazilasForDistrict}
            getThanasForDistrict={getThanasForDistrict}
            getWardsAndUnions={getWardsAndUnions}
            getAvailableAreas={getAvailableAreas}
            getAvailableSubAreas={getAvailableSubAreas}
            updateInspectorHierarchy={updateInspectorHierarchy}
            inspectorNearbyLandmarks={inspectorNearbyLandmarks}
          />
        )}
      </main>
    </div>
  );
}
