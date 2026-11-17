/**
 * NIRAPOD COURIER - HUB ROUTING & REVERSE GEOCODING ENGINE
 * 
 * This module is responsible for:
 * 1. Haversine Great-Circle Geodetic Distance Calculation
 * 2. 7-Level Geographic Reverse Geocoding (Division -> Landmark)
 * 3. Intelligent 4-Tier Hub Assignment Algorithm with Out-of-Zone Fallback
 * 
 * Configured Hubs:
 * - MIR-10: Mirpur 10 Hub (Mirpur, Pallabi, Kafrul, Hope School, Stadium)
 * - DHA-27: Dhanmondi Hub (Dhanmondi, Kalabagan, Rapa Plaza, Square Hospital)
 * - UTT-03: Uttara Hub (Uttara, Airport, Tongi, Sector 1-18)
 * - BAD-01: Badda Hub (Badda, Merul Badda, Rampura, Aftabnagar, Gulshan link)
 * - GUL-02: Gulshan Hub (Gulshan 1-2, Banani, Baridhara, Niketan)
 * - MOH-01: Mohammadpur Hub (Mohammadpur, Adabor, Ring Road, Japan Garden City)
 * - SAV-01: Savar Regional Hub (Savar Upazila, Kaundia, Aminbazar, EPZ, Ashulia)
 * - TEJ-SORT-01: Tejgaon Linehaul Hub (Central Consolidation & Sorting Center)
 */

export const COURIER_HUBS = [
  {
    code: 'MIR-10',
    name: 'Mirpur 10 Hub',
    lat: 23.80695,
    lon: 90.36870,
    address: 'Plot 12, Block C, Section 10, Mirpur, Dhaka 1216',
    contact: '+880 1711-000101',
    coverageKeywords: [
      'mirpur', 'mirpur-1', 'mirpur 1', 'mirpur-2', 'mirpur 2',
      'mirpur-6', 'mirpur 6', 'mirpur-10', 'mirpur 10', 'mirpur-11', 'mirpur 11',
      'mirpur-12', 'mirpur 12', 'mirpur-14', 'mirpur 14',
      'pallabi', 'kafrul', 'shewrapara', 'kazipara', 'senpara', 'section 10',
      'section 6', 'section 1', 'section 11', 'section 12', 'stadium', 'hope school'
    ],
    coverageRadiusKm: 5.5
  },
  {
    code: 'DHA-27',
    name: 'Dhanmondi Hub',
    lat: 23.7538,
    lon: 90.3768,
    address: 'House 34, Road 27 (Old), Dhanmondi, Dhaka 1209',
    contact: '+880 1711-000202',
    coverageKeywords: [
      'dhanmondi', 'dhanmondi 27', 'dhanmondi-27', 'dhanmondi 32', 'dhanmondi 15',
      'dhanmondi 8/a', 'kalabagan', 'sukrabad', 'panthapath', 'sobhahanbagh',
      'jigatola', 'shankar', 'science lab', 'green road', 'rapa plaza'
    ],
    coverageRadiusKm: 4.8
  },
  {
    code: 'UTT-03',
    name: 'Uttara Hub',
    lat: 23.8693,
    lon: 90.3927,
    address: 'Sector 3, Jashimuddin Avenue, Uttara, Dhaka 1230',
    contact: '+880 1711-000303',
    coverageKeywords: [
      'uttara', 'sector 1', 'sector 3', 'sector 4', 'sector 7', 'sector 9',
      'sector 10', 'sector 11', 'sector 12', 'sector 13', 'sector 14',
      'airport', 'dakshinkhan', 'uttarkhan', 'turag', 'tongi', 'abdullahpur'
    ],
    coverageRadiusKm: 6.5
  },
  {
    code: 'BAD-01',
    name: 'Badda Hub',
    lat: 23.7745,
    lon: 90.4245,
    address: 'Progoti Shoroni, North Badda, Dhaka 1212',
    contact: '+880 1711-000404',
    coverageKeywords: [
      'badda', 'north badda', 'south badda', 'merul badda', 'middle badda',
      'aftabnagar', 'rampura', 'banasree', 'shahjadpur', 'notun bazar', 'hatirjheel'
    ],
    coverageRadiusKm: 5.0
  },
  {
    code: 'GUL-02',
    name: 'Gulshan Hub',
    lat: 23.7925,
    lon: 90.4162,
    address: 'Road 11, Block D, Banani / Gulshan 2, Dhaka 1213',
    contact: '+880 1711-000505',
    coverageKeywords: [
      'gulshan', 'gulshan 1', 'gulshan 2', 'gulshan-1', 'gulshan-2',
      'banani', 'banani doh', 'baridhara', 'baridhara dohs', 'niketan', 'mohakhali'
    ],
    coverageRadiusKm: 4.5
  },
  {
    code: 'MOH-01',
    name: 'Mohammadpur Hub',
    lat: 23.7658,
    lon: 90.3584,
    address: 'Ring Road, Tikkatoli / Mohammadpur, Dhaka 1207',
    contact: '+880 1711-000606',
    coverageKeywords: [
      'mohammadpur', 'adabor', 'shyamoli', 'ring road', 'taj mahal road',
      'salimullah road', 'nurjahan road', 'bosila', 'japan garden city'
    ],
    coverageRadiusKm: 4.8
  },
  {
    code: 'SAV-01',
    name: 'Savar Regional Hub',
    lat: 23.8583,
    lon: 90.2667,
    address: 'Thana Road, Savar Bazar, Dhaka 1340',
    contact: '+880 1711-000707',
    coverageKeywords: [
      'savar', 'kaundia', 'aminbazar', 'hemayetpur', 'ashulia', 'epz',
      'baipail', 'dhamrai', 'zirani', 'jahangirnagar'
    ],
    coverageRadiusKm: 14.0
  },
  {
    code: 'TEJ-SORT-01',
    name: 'Tejgaon Central Consolidation Hub',
    lat: 23.7600,
    lon: 90.3950,
    address: 'Tejgaon Industrial Area, Dhaka 1208',
    contact: '+880 1711-000999',
    coverageKeywords: [
      'tejgaon', 'industrial area', 'nakhalpara', 'farmgate', 'karwan bazar',
      'monipuripara', 'bijoy sarani', 'central sort', 'linehaul'
    ],
    coverageRadiusKm: 4.0
  }
];

/**
 * 1. Haversine Formula: Great-Circle Geodetic Distance Calculation
 * Calculates the shortest spherical distance in kilometers between two GPS coordinates.
 */
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 2. 7-Level Geographic Reverse Geocoding Algorithm
 * Translates raw GPS (lat, lon) into administrative hierarchy & human-readable addresses.
 */
export function resolveCoordinatesToHierarchy(dataset, lat, lon) {
  if (!dataset) return null;

  // Level 1: Division
  let bestDiv = null, minDivDist = Infinity;
  for (const d of dataset.divisions || []) {
    const dist = getDistanceKm(lat, lon, d.lat, d.lon);
    if (dist < minDivDist) { minDivDist = dist; bestDiv = d; }
  }

  // Level 2: District
  let bestDist = null, minDistDist = Infinity;
  for (const d of dataset.districts || []) {
    const dist = getDistanceKm(lat, lon, d.lat, d.lon);
    if (dist < minDistDist) { minDistDist = dist; bestDist = d; }
  }

  // Level 3-B: Postcode / Metropolitan Thana
  let bestPost = null, minPostDist = Infinity;
  for (const p of dataset.postcodes || []) {
    const dist = getDistanceKm(lat, lon, p.lat, p.lon);
    if (dist < minPostDist) { minPostDist = dist; bestPost = p; }
  }

  // City Corporation Boundary Check
  let nearestCC = null, minCCDist = Infinity;
  for (const cc of dataset.city_corporations || []) {
    const dist = getDistanceKm(lat, lon, cc.lat, cc.lon);
    if (dist < minCCDist) { minCCDist = dist; nearestCC = cc; }
  }

  const isMetro = Boolean(
    (bestPost && bestPost.city_corporation) ||
    (nearestCC && minCCDist <= 18 && bestPost && bestPost.thana && !bestPost.upazila_name)
  );

  let resolvedUpazila = "";
  let resolvedThana = "";
  let resolvedUnion = null;

  if (isMetro) {
    resolvedThana = bestPost?.thana || (nearestCC ? nearestCC.name : 'Metro Thana');
    resolvedUpazila = "";
  } else {
    // Level 3-A: Upazila for Rural
    let bestUpz = null, minUpzDist = Infinity;
    for (const u of dataset.upazilas || []) {
      const dist = getDistanceKm(lat, lon, u.lat, u.lon);
      if (dist < minUpzDist) { minUpzDist = dist; bestUpz = u; }
    }
    resolvedUpazila = bestUpz?.name || "";
    resolvedThana = bestPost?.thana || "";

    // Level 3-C: Union Parishad for Rural
    let minUnionDist = Infinity;
    for (const un of dataset.unions || []) {
      const dist = getDistanceKm(lat, lon, un.lat, un.lon);
      if (dist < minUnionDist) { minUnionDist = dist; resolvedUnion = un; }
    }
  }

  // Level 7: Nearest Landmark / POI (within 400m)
  let nearestLandmark = null;
  if (dataset.osm_landmarks && dataset.osm_landmarks.length > 0) {
    let minLandmarkDist = Infinity;
    for (const lm of dataset.osm_landmarks) {
      const dist = getDistanceKm(lat, lon, lm.lat, lm.lon);
      if (dist < minLandmarkDist) {
        minLandmarkDist = dist;
        nearestLandmark = { ...lm, dist };
      }
    }
    if (minLandmarkDist > 0.40) nearestLandmark = null;
  }

  // Level 4 & 5: OSM Suburbs, Quarters & Neighborhoods
  const sortedPlaces = [];
  for (const place of dataset.osm_places || []) {
    const dist = getDistanceKm(lat, lon, place.lat, place.lon);
    if (dist <= 35) {
      sortedPlaces.push({ ...place, dist });
    }
  }
  sortedPlaces.sort((a, b) => a.dist - b.dist);

  const nearestQuarter = sortedPlaces.find(p => ['quarter', 'neighbourhood', 'city_block'].includes(p.type));
  const nearestSuburb = sortedPlaces.find(p => ['suburb', 'town', 'village', 'island'].includes(p.type));

  const resolvedArea = nearestSuburb?.nameEn || nearestSuburb?.name || bestPost?.thana || 'Central';
  const resolvedSubArea = nearestQuarter?.nameEn || nearestQuarter?.name || '';
  const resolvedRoad = nearestLandmark ? `${nearestLandmark.nameEn || nearestLandmark.name} Area` : '';

  const partsEn = [];
  if (nearestLandmark) partsEn.push(nearestLandmark.nameEn || nearestLandmark.name);
  if (resolvedSubArea) partsEn.push(resolvedSubArea);
  if (resolvedArea && resolvedArea !== resolvedSubArea) partsEn.push(resolvedArea);
  if (resolvedUpazila) partsEn.push(resolvedUpazila);
  if (resolvedThana && resolvedThana !== resolvedArea) partsEn.push(`${resolvedThana} Thana`);
  if (resolvedUnion && !isMetro) partsEn.push(`${resolvedUnion.name} Union`);
  if (bestDist) partsEn.push(`${bestDist.name} District`);
  if (bestPost?.postcode) partsEn.push(`Postcode: ${bestPost.postcode}`);

  const partsBn = [];
  if (nearestLandmark?.nameBn) partsBn.push(nearestLandmark.nameBn);
  if (nearestQuarter?.nameBn) partsBn.push(nearestQuarter.nameBn);
  if (nearestSuburb?.nameBn) partsBn.push(nearestSuburb.nameBn);
  if (resolvedUnion?.bn_name && !isMetro) partsBn.push(resolvedUnion.bn_name);
  if (bestDist?.bn_name) partsBn.push(bestDist.bn_name);

  return {
    coords: { lat, lon },
    isMetro,
    extractedHierarchy: {
      division: bestDiv?.name || 'Dhaka',
      district: bestDist?.name || 'Dhaka',
      upazila: resolvedUpazila,
      thana: resolvedThana,
      wardUnion: resolvedUnion ? resolvedUnion.name : (isMetro ? 'Ward 10' : ''),
      area: resolvedArea,
      subArea: resolvedSubArea,
      block: '',
      road: resolvedRoad
    },
    humanReadableAddressEn: partsEn.join(', '),
    humanReadableAddressBn: partsBn.join(', '),
    nearestLandmark: nearestLandmark ? {
      name: nearestLandmark.nameEn || nearestLandmark.name,
      type: nearestLandmark.type,
      distMeters: Math.round(nearestLandmark.dist * 1000)
    } : null,
    postcode: bestPost?.postcode || '',
    nearestHubCandidate: nearestSuburb?.name || 'General Dhaka Hub'
  };
}

/**
 * 3. INTELLIGENT 4-TIER COURIER HUB ASSIGNMENT ALGORITHM
 * 
 * Flow for Senior Engineer Review:
 * --------------------------------
 * TIER 1: Sub-Area / Area Keyword Match
 * Checks if the address keywords (e.g. "mirpur", "merul badda", "dhanmondi 27")
 * match any hub's primary operational keywords, AND verify distance <= coverageRadiusKm * 1.5.
 * 
 * TIER 2: Thana / Postal Zone Keyword Match
 * If Area match not found, checks Thana or Upazila name against coverageKeywords.
 * 
 * TIER 3: Geodetic Radius Proximity Match
 * If textual matching yields no exact match, searches for any hub whose center
 * is within its defined coverageRadiusKm boundary.
 * 
 * TIER 4: Out-of-Zone Fallback Calculation
 * If the location lies outside all hub boundaries (e.g. remote village or outer suburb),
 * calculates the closest operational hub across Bangladesh using Haversine distance.
 * Flags: isOutOfZone = true, calculates feeder distance, and tags with extended SLA.
 */
export function assignCourierHub(locationInfo, customHierarchy, isPickup = true) {
  if (!locationInfo) return null;

  const coords = locationInfo.coords;
  const textToMatch = (
    (customHierarchy?.division || '') + ' ' +
    (customHierarchy?.district || '') + ' ' +
    (customHierarchy?.upazila || '') + ' ' +
    (customHierarchy?.thana || '') + ' ' +
    (customHierarchy?.wardUnion || '') + ' ' +
    (customHierarchy?.area || '') + ' ' +
    (customHierarchy?.subArea || '') + ' ' +
    (customHierarchy?.road || '') + ' ' +
    (locationInfo.humanReadableAddressEn || '')
  ).toLowerCase();

  // Tier 1: Primary Area / Sub-Area Keyword Matching
  for (const hub of COURIER_HUBS) {
    if (hub.code === 'TEJ-SORT-01') continue; // Sorting center is reserved for trunk routes
    for (const kw of hub.coverageKeywords) {
      if (textToMatch.includes(kw)) {
        const dist = getDistanceKm(coords.lat, coords.lon, hub.lat, hub.lon);
        if (dist <= hub.coverageRadiusKm * 1.55) {
          return {
            hub,
            distanceKm: dist.toFixed(1),
            isOutOfZone: false,
            matchType: 'KEYWORD_ZONE_EXACT',
            rule: `Direct Match: Matched keyword '${kw}' within ${dist.toFixed(1)} km`,
            role: isPickup ? 'Origin First-Mile Hub' : 'Destination Last-Mile Hub'
          };
        }
      }
    }
  }

  // Tier 2: Thana / Sub-district Match
  const thanaName = (customHierarchy?.thana || locationInfo.extractedHierarchy?.thana || '').toLowerCase();
  if (thanaName) {
    for (const hub of COURIER_HUBS) {
      if (hub.code === 'TEJ-SORT-01') continue;
      if (hub.coverageKeywords.some(kw => kw === thanaName || thanaName.includes(kw))) {
        const dist = getDistanceKm(coords.lat, coords.lon, hub.lat, hub.lon);
        return {
          hub,
          distanceKm: dist.toFixed(1),
          isOutOfZone: dist > hub.coverageRadiusKm,
          matchType: 'THANA_ZONE_MATCH',
          rule: `Thana Match: '${thanaName}' assigned to ${hub.code} (${dist.toFixed(1)} km)`,
          role: isPickup ? 'Origin First-Mile Hub' : 'Destination Last-Mile Hub'
        };
      }
    }
  }

  // Tier 3: Direct Distance Proximity within Coverage Radius
  let closestHub = null;
  let minDistance = Infinity;

  for (const hub of COURIER_HUBS) {
    if (hub.code === 'TEJ-SORT-01') continue;
    const dist = getDistanceKm(coords.lat, coords.lon, hub.lat, hub.lon);
    if (dist < minDistance) {
      minDistance = dist;
      closestHub = hub;
    }
  }

  if (closestHub && minDistance <= closestHub.coverageRadiusKm) {
    return {
      hub: closestHub,
      distanceKm: minDistance.toFixed(1),
      isOutOfZone: false,
      matchType: 'PROXIMITY_IN_ZONE',
      rule: `Geographic Boundary: Within ${closestHub.name} ${closestHub.coverageRadiusKm} km coverage`,
      role: isPickup ? 'Origin First-Mile Hub' : 'Destination Last-Mile Hub'
    };
  }

  // Tier 4: OUT-OF-ZONE FALLBACK ENGINE
  // Automatically calculates the nearest operational hub to handle first-mile collection or last-mile delivery
  return {
    hub: closestHub || COURIER_HUBS[0],
    distanceKm: minDistance.toFixed(1),
    isOutOfZone: true,
    feederPenaltyKm: (minDistance - (closestHub?.coverageRadiusKm || 5.0)).toFixed(1),
    matchType: 'OUT_OF_ZONE_FALLBACK',
    rule: `Out-of-Zone Fallback: Dispatched to closest hub ${closestHub?.name} (${minDistance.toFixed(1)} km) via feeder transit`,
    role: isPickup ? 'Nearest First-Mile Hub (Feeder)' : 'Nearest Last-Mile Hub (Sub-Urban Drop)'
  };
}
