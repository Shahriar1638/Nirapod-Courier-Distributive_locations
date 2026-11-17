/**
 * NIRAPOD COURIER - LOGISTICS CATALOG & CLIENT PRESET SCENARIOS
 */

export const COURIER_CITY_CATALOG = {
  'Dhaka': {
    'Mirpur': [
      'Mirpur 1', 'Mirpur 2', 'Mirpur 6', 'Mirpur 10', 'Mirpur 11', 'Mirpur 12', 'Mirpur 14',
      'Pallabi', 'Shewrapara', 'West Kazipara', 'East Kazipara', 'Senpara Parbata', 'Pirerbag'
    ],
    'Dhanmondi': [
      'Dhanmondi 27 (Old)', 'Dhanmondi 32', 'Dhanmondi 15', 'Dhanmondi 8/A', 'Dhanmondi 2',
      'Kalabagan', 'Sukrabad', 'Panthapath', 'Sobhanbagh', 'Jigatola', 'Shankar'
    ],
    'Badda': [
      'Merul Badda', 'North Badda', 'South Badda', 'Middle Badda', 'Aftabnagar',
      'East Rampura', 'West Rampura', 'Banasree', 'Shahjadpur'
    ],
    'Uttara': [
      'Sector 1', 'Sector 3', 'Sector 4', 'Sector 6', 'Sector 7', 'Sector 9',
      'Sector 10', 'Sector 11', 'Sector 12', 'Sector 13', 'Sector 14', 'Abdullahpur'
    ],
    'Gulshan': [
      'Gulshan 1', 'Gulshan 2', 'Niketan', 'Police Plaza Area', 'Gulshan Avenue'
    ],
    'Banani': [
      'Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F', 'Banani DOHS'
    ],
    'Mohammadpur': [
      'Ring Road', 'Taj Mahal Road', 'Salimullah Road', 'Noorjahan Road',
      'Adabor', 'Shyamoli', 'Japan Garden City', 'Bosila'
    ],
    'Savar': [
      'Savar Sadar', 'Kaundia', 'Aminbazar', 'Hemayetpur', 'Ashulia', 'Baipail', 'EPZ Area'
    ],
    'Motijheel': [
      'Dilkusha', 'Arambagh', 'Fakirapool', 'Toyenbee Circular Road'
    ],
    'Keraniganj': [
      'Zinjira', 'Aganagar', 'Konda', 'Rohitpur', 'Hasnabad'
    ]
  },
  'Chattogram': {
    'Agrabad': ['Commercial Area', 'Access Road', 'Chowdhury Para'],
    'GEC': ['GEC Circle', 'Nasirabad', 'Dampara'],
    'Halishahar': ['Block A', 'Block B', 'Block G', 'Block H'],
    'Panchlaish': ['Prabartak Circle', 'Sugandha R/A', 'Muradpur']
  },
  'Sylhet': {
    'Zindabazar': ['Barutkhana', 'Jollarpar', 'Shubidbazar'],
    'Ambarkhana': ['Dargah Gate', 'Housing Estate', 'Chowhatta'],
    'Upashahar': ['Block A', 'Block B', 'Block C', 'Block D']
  }
};

export const PRESET_SCENARIOS = [
  {
    title: "1. Core Metro Delivery (In-Zone -> In-Zone)",
    badge: "Same-Day Express",
    desc: "Mirpur Stadium / Hope School [MIR-10 Hub] to Dhanmondi 27 [DHA-27 Hub]",
    pickup: {
      lat: 23.8060, lon: 90.3630,
      area: "Mirpur", subArea: "Mirpur 6", thana: "Mirpur", wardUnion: "Ward 10",
      road: "Mirpur Stadium Gate 4, Section 6"
    },
    delivery: {
      lat: 23.7538, lon: 90.3768,
      area: "Dhanmondi", subArea: "Dhanmondi 27 (Old)", thana: "Dhanmondi", wardUnion: "Ward 15",
      road: "House 34, Road 27, near Rapa Plaza"
    }
  },
  {
    title: "2. Out-of-Zone First-Mile Fallback (Rural Pickup)",
    badge: "Feeder Transit (+৳30)",
    desc: "Kaundia Village / Savar [Auto Fallback to SAV-01 Hub] to Uttara Sector 3 [UTT-03 Hub]",
    pickup: {
      lat: 23.80556, lon: 90.33889,
      area: "Savar", subArea: "Kaundia", upazila: "Savar", wardUnion: "Kaundia",
      road: "Beside Kaundia Union Parishad Complex"
    },
    delivery: {
      lat: 23.8693, lon: 90.3927,
      area: "Uttara", subArea: "Sector 3", thana: "Uttara", wardUnion: "Ward 1",
      road: "Plot 12, Road 4, Sector 3"
    }
  },
  {
    title: "3. Out-of-Zone Last-Mile Fallback (Remote Drop)",
    badge: "Sub-Urban Delivery (+৳30)",
    desc: "Merul Badda [BAD-01 Hub] to Singair / Hemayetpur Outskirt [Auto Fallback to SAV-01 Hub]",
    pickup: {
      lat: 23.7690, lon: 90.4260,
      area: "Badda", subArea: "Merul Badda", thana: "Badda", wardUnion: "Ward 21",
      road: "DIT Project, Road 3, Merul Badda"
    },
    delivery: {
      lat: 23.8180, lon: 90.2350,
      area: "Savar", subArea: "Hemayetpur", upazila: "Savar", wardUnion: "Tetuljhora",
      road: "Singair Road, near New Bus Stand"
    }
  }
];
