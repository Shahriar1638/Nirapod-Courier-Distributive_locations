# Nirapod Courier - Intelligent Hub & Zone Routing System

A production-grade logistics routing and parcel dispatch engine for **Nirapod Courier**, powered by OpenStreetMap (`bangladesh-261116.osm.pbf`) and Bangladesh Bureau of Statistics (BBS) geocoding data.

---

## 🔍 Core Routing Algorithm for Senior Engineer Review

As requested by the engineering team, the entire hub assignment, geodetic distance calculation, and reverse geocoding engine is isolated into a **single, standalone file**:

📁 **[`src/utils/hubRouting.js`](./src/utils/hubRouting.js)**

### Key Algorithms Implemented:
1. **Haversine Great-Circle Geodetic Formula (`getDistanceKm`)**: Computes exact spherical distance in kilometers between arbitrary GPS coordinates across Bangladesh.
2. **7-Level Geographic Reverse Geocoder (`resolveCoordinatesToHierarchy`)**: Resolves GPS points into `Division ➔ District ➔ Upazila/Thana ➔ Union/Ward ➔ Area ➔ Sub-Area ➔ Doorstep Landmark`.
3. **Intelligent 4-Tier Hub Assignment Engine (`assignCourierHub`)**:
   * **Tier 1 (Sub-Area / Area Match):** Matches operational keywords against active hub coverage boundaries.
   * **Tier 2 (Thana / Postal Zone Match):** Resolves metropolitan thana or rural upazila administrative boundaries.
   * **Tier 3 (Geographic Proximity):** Auto-associates within hub radius (e.g. 4.5 km to 14.0 km).
   * **Tier 4 (Out-of-Zone Fallback Engine):** If a parcel origin or destination lies outside all primary metro hub boundaries (e.g. a rural village or distant upazila), it dynamically calculates the nearest operational first-mile or last-mile hub, assigns feeder dispatch, calculates feeder penalty mileage, and applies extended SLA handling.

---

## 🏗️ Clean Modular Component Architecture

The codebase is organized into clean, reusable React components:

```text
location-finder/
├── src/
│   ├── utils/
│   │   └── hubRouting.js              <-- 🎯 Single file with core routing & fallback algorithms
│   ├── constants/
│   │   └── courierCatalog.js          <-- L4/L5 City Catalog & Demonstration Scenarios
│   ├── components/
│   │   ├── Header.jsx                 <-- Top navigation & tab switcher
│   │   ├── HierarchyMetadata.jsx      <-- 7-Level metadata overview bar (33,894 entities)
│   │   ├── ScenarioBar.jsx            <-- 1-click test scenarios for client demos
│   │   ├── HierarchyForm.jsx          <-- Reusable [L1-L7] form for Pickup & Delivery
│   │   ├── TransitManifest.jsx        <-- Dynamic 5-stage transit visualizer & pricing bill
│   │   ├── HubDirectory.jsx           <-- Configured operational hubs directory
│   │   └── SingleCoordinateInspector.jsx <-- Tab 2: [L1-L5] on Left, [L6-L7] POIs on Right
│   ├── App.jsx                        <-- Main orchestrated application
│   ├── main.jsx                       <-- React 18 bootstrap
│   └── data/
│       └── location_data.json         <-- 33,894 indexed BBS + OSM geocoded records
├── index.html                         <-- Clean Vite entry point
├── demo_standalone.html               <-- Standalone zero-server browser demo
├── location_data.json                 <-- Primary root dataset
├── location_data.js                   <-- Window global fallback data
├── package.json
└── vite.config.js
```

---

## 🚀 How to Run

### Option 1: Modern Vite Dev Server (Recommended for Development)
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Lightweight Node.js Server
```bash
node serve.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Standalone Zero-Server Direct Launch
Double-click **`demo_standalone.html`** in Windows Explorer. It runs completely offline without any node or web server.

---

## 📊 Administrative & Geographic Hierarchy Coverage

| Level | Entity Type | Dataset Count | Logistics Role |
| :--- | :--- | :--- | :--- |
| **[L1]** | Division | 8 | Regional State Hub Routing |
| **[L2]** | District | 64 | Revenue Zila & Trunk Linehaul |
| **[L3-A]** | Upazila | 495 | Rural Sub-District Administration |
| **[L3-B]** | Thana | 1,349 | Metropolitan City Police/Postal Zone |
| **[L3-C]** | Union / Ward | 4,540 Unions & 54 Wards | Grassroots Parishad Boundaries |
| **[L4]** | Area / Locality | 6,335 | Fixed City Operational Pockets |
| **[L5]** | Sub-Area & Sections | Thousands | Dispatch Run-Sheet Sorting |
| **[L6]** | Block / Sector | Free / Presets | Local Neighborhood Clusters |
| **[L7]** | Road & Landmark | 21,091 POIs | Exact Doorstep Rider Instruction |
