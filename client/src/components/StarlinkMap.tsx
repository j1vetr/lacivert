import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import { Globe as GlobeIcon, Plus, Minus, Info, Maximize2, Minimize2 } from 'lucide-react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import logoWhite from "@assets/lacivert light logo_1763796346759.png";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Ocean/Sea Labels with Lat/Lng
const oceanLabels = [
    { name: "NORTH ATLANTIC", lat: 35, lng: -40 },
    { name: "SOUTH ATLANTIC", lat: -25, lng: -20 },
    { name: "NORTH PACIFIC", lat: 35, lng: -160 },
    { name: "SOUTH PACIFIC", lat: -25, lng: -130 },
    { name: "INDIAN OCEAN", lat: -15, lng: 80 },
    { name: "SOUTHERN OCEAN", lat: -65, lng: 0 },
    { name: "ARCTIC OCEAN", lat: 85, lng: 0 },
    { name: "MEDITERRANEAN", lat: 35, lng: 18, size: 0.5 },
    { name: "CARIBBEAN", lat: 15, lng: -75, size: 0.5 },
    { name: "GULF OF MEXICO", lat: 25, lng: -90, size: 0.5 },
    { name: "ARABIAN SEA", lat: 15, lng: 65, size: 0.5 },
    { name: "BAY OF BENGAL", lat: 15, lng: 90, size: 0.5 },
    { name: "SOUTH CHINA SEA", lat: 12, lng: 115, size: 0.5 },
    { name: "SEA OF JAPAN", lat: 40, lng: 135, size: 0.5 },
];

// Separate HUD Component to prevent Globe re-renders
const SystemHUD = () => {
  const [downlink, setDownlink] = useState(150);
  const [upload, setUpload] = useState(40);
  const [latency, setLatency] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
        // Downlink: 150 - 200
        setDownlink(prev => {
            const change = (Math.random() - 0.5) * 10;
            const newVal = Math.max(150, Math.min(200, prev + change));
            return Math.round(newVal);
        });

        // Upload: 40 - 50
        setUpload(prev => {
            const change = (Math.random() - 0.5) * 5;
            const newVal = Math.max(40, Math.min(50, prev + change));
            return Math.round(newVal);
        });

        // Latency: 35 - 60
        setLatency(prev => {
            const change = (Math.random() - 0.5) * 8;
            const newVal = Math.max(35, Math.min(60, prev + change));
            return Math.round(newVal);
        });

    }, 800); // Updates every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
             <div className="relative w-full h-full">
                 <div className="flex flex-col gap-1 bg-slate-950/80 p-2 md:p-4 rounded-xl border border-blue-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.2)] w-full md:max-w-[170px]">
                    <div className="flex items-center justify-between gap-4 md:gap-8 mb-1 md:mb-2 pb-1 md:pb-2 border-b border-white/10">
                        <span className="text-blue-400 font-mono text-[10px] md:text-xs tracking-widest font-bold">SYSTEM</span>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 font-mono text-[10px] md:text-xs font-bold">ONLINE</span>
                        </div>
                    </div>
                    
                    {/* Updated Grid for Mobile (Side-by-side Satellites/Latency) */}
                    <div className="grid grid-cols-2 gap-x-2 md:gap-x-8 gap-y-2 md:gap-y-4">
                        <div className="col-span-1 md:col-span-1">
                            <div className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-wider mb-0.5">Satellites</div>
                            <div className="text-white font-mono text-sm md:text-xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">9,200</div>
                        </div>
                        <div className="col-span-1 md:col-span-1">
                            <div className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-wider mb-0.5">Latency</div>
                            <div className="text-emerald-400 font-mono text-sm md:text-xl font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{latency}<span className="text-[8px] md:text-xs text-slate-500 ml-0.5 md:ml-1">ms</span></div>
                        </div>
                        <div>
                            <div className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-wider mb-0.5">Downlink</div>
                            <div className="text-blue-400 font-mono text-sm md:text-xl font-bold drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">{downlink}<span className="text-[8px] md:text-xs text-slate-500 ml-0.5 md:ml-1">Mb</span></div>
                        </div>
                        <div>
                            <div className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-wider mb-0.5">Upload</div>
                            <div className="text-purple-400 font-mono text-sm md:text-xl font-bold drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">{upload}<span className="text-[8px] md:text-xs text-slate-500 ml-0.5 md:ml-1">Mb</span></div>
                        </div>
                    </div>
                 </div>
             </div>
  );
};

// Single Event Item with Live Updating Latency
const EventItem = ({ text }: { text: string }) => {
    // Extract base parts
    const parts = text.split(':');
    const action = parts[0];
    const rest = parts[1].split('-');
    const location = rest[0];
    const initialLatency = parseInt(rest[1].replace('MS', '').trim());

    const [latency, setLatency] = useState(initialLatency);

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
                return Math.max(10, Math.min(150, prev + change));
            });
        }, 1000 + Math.random() * 1000); // Random interval between 1-2s for each item

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="text-[10px] font-mono text-cyan-500/70 flex items-center gap-2 tracking-widest uppercase shrink-0">
            {action}:{location}- <span className="text-cyan-400 font-bold">{latency}MS</span>
        </span>
    );
};

// Event Ticker Component
const EventTicker = () => {
    // Static list of events for smooth infinite scroll
    const events = [
        "CONNECTION ESTABLISHED: LONDON - 24MS", "SATELLITE HANDOVER: NEW YORK - 32MS", "SIGNAL OPTIMIZED: TOKYO - 18MS", 
        "ROUTE UPDATED: BERLIN - 28MS", "BANDWIDTH ALLOCATED: PARIS - 22MS", "LATENCY STABILIZING: ISTANBUL - 35MS", 
        "NETWORK SYNC COMPLETE: DUBAI - 45MS", "DATA PACKET ROUTED: SYDNEY - 55MS", "UPLINK VERIFIED: SINGAPORE - 19MS", 
        "DOWNLINK CONFIRMED: MUMBAI - 62MS", "PACKET LOSS MITIGATED: SAO PAULO - 110MS", "FREQUENCY SHIFTED: TORONTO - 41MS",
        "CONNECTION ESTABLISHED: HONG KONG - 26MS", "SATELLITE HANDOVER: FRANKFURT - 21MS", "SIGNAL OPTIMIZED: AMSTERDAM - 15MS",
        "ROUTE UPDATED: MADRID - 29MS", "BANDWIDTH ALLOCATED: CHICAGO - 38MS", "LATENCY STABILIZING: LOS ANGELES - 30MS",
        "NETWORK SYNC COMPLETE: SEATTLE - 24MS", "DATA PACKET ROUTED: SEOUL - 17MS", "UPLINK VERIFIED: ZURICH - 14MS",
        "DOWNLINK CONFIRMED: STOCKHOLM - 23MS", "PACKET LOSS MITIGATED: OSLO - 25MS", "FREQUENCY SHIFTED: HELSINKI - 27MS"
    ];

    return (
        <div className="absolute bottom-0 w-full bg-slate-950/95 border-t border-white/5 backdrop-blur-md py-2 z-40 overflow-hidden flex">
            <div className="flex gap-16 animate-marquee whitespace-nowrap px-4 w-fit">
                {/* Duplicate the list to ensure seamless loop - using 2 sets for 50% translateX logic */}
                {[...events, ...events].map((evt, i) => (
                    <EventItem key={i} text={evt} />
                ))}
            </div>
        </div>
    );
};

export function StarlinkMap({ fullScreen = false }: { fullScreen?: boolean }) {
  const { t } = useTranslation();
  const [geography, setGeography] = useState<any[]>([]);
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a ref to store country labels to avoid re-calculating on every render
  const [countryLabels, setCountryLabels] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch(geoUrl)
      .then((response) => response.json())
      .then((topology) => {
        const countries = feature(topology, topology.objects.countries);
        setGeography((countries as any).features);
        // Add a small delay to ensure smoother transition
        setTimeout(() => setIsLoading(false), 800);
      });

    // Handle Resize
    const updateDimensions = () => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    // Initial timeout to ensure container is rendered
    setTimeout(updateDimensions, 100);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initial Globe Position & Intro Animation
  useEffect(() => {
    if (globeEl.current) {
        // Start far away
        globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 4.5 });
        
        // Zoom in animation
        setTimeout(() => {
            globeEl.current?.pointOfView({ lat: 39, lng: 35, altitude: 2.0 }, 2500);
        }, 500);
        
        // Auto-rotate settings
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.5;
        globeEl.current.controls().enableZoom = true;
    }
  }, [mounted]);

  const data = useMemo(() => {
     // 1. Satellites
    const N = 3000;
    const sats = Array.from({ length: N }).map(() => ({
      type: 'satellite',
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      alt: 0.1, 
      color: Math.random() > 0.3 ? '#f59e0b' : '#ffffff',
      size: Math.random() * 0.15 + 0.05
    }));

    // 2. Ships... (Keeping existing logic)
    const shipList = [];
    const addShips = (count: number, latMin: number, latMax: number, lngMin: number, lngMax: number) => {
        for(let i=0; i<count; i++) {
            shipList.push({
                type: 'ship',
                lat: latMin + Math.random() * (latMax - latMin),
                lng: lngMin + Math.random() * (lngMax - lngMin),
                alt: 0.002,
                color: '#06b6d4',
                size: 0.08,
                maxR: Math.random() * 1.5 + 0.5, // Reduced ripple size
                propagationSpeed: Math.random() * 2 + 1,
                repeatPeriod: Math.random() * 1000 + 500
            });
        }
    };
    // ... (Call addShips)
    addShips(40, 10, 60, -80, -10);
    addShips(40, -50, 10, -60, 10);
    addShips(50, 0, 60, 120, 180);
    addShips(50, 0, 60, -180, -100);
    addShips(60, -60, 0, 150, -70);
    addShips(30, -60, 0, 150, 180);
    addShips(30, -60, 0, -180, -70);
    addShips(50, -40, 25, 40, 110);
    addShips(60, -70, -50, -180, 180);
    addShips(15, 30, 45, -5, 35);
    addShips(15, 10, 30, -95, -60);
    addShips(10, 10, 25, 50, 75);
    addShips(15, 0, 25, 100, 120);

    // 3. Laser Links (Mesh Network) - Removed as requested
    const links: any[] = [];
    
    return { satellites: sats, ships: shipList, lasers: links };
  }, []);

  const { satellites, ships, lasers } = data;


  // Country ID to Name Mapping (ISO 3166-1 numeric)
  const countryNames: Record<string, string> = {
    "004": "Afghanistan", "008": "Albania", "010": "Antarctica", "012": "Algeria", "016": "American Samoa", "020": "Andorra", "024": "Angola", "028": "Antigua and Barbuda", "031": "Azerbaijan", "032": "Argentina", "036": "Australia", "040": "Austria", "044": "Bahamas", "048": "Bahrain", "050": "Bangladesh", "051": "Armenia", "052": "Barbados", "056": "Belgium", "060": "Bermuda", "064": "Bhutan", "068": "Bolivia", "070": "Bosnia and Herzegovina", "072": "Botswana", "074": "Bouvet Island", "076": "Brazil", "084": "Belize", "086": "British Indian Ocean Territory", "090": "Solomon Islands", "092": "British Virgin Islands", "096": "Brunei", "100": "Bulgaria", "104": "Myanmar", "108": "Burundi", "112": "Belarus", "116": "Cambodia", "120": "Cameroon", "124": "Canada", "132": "Cabo Verde", "136": "Cayman Islands", "140": "Central African Republic", "144": "Sri Lanka", "148": "Chad", "152": "Chile", "156": "China", "158": "Taiwan", "162": "Christmas Island", "166": "Cocos (Keeling) Islands", "170": "Colombia", "174": "Comoros", "175": "Mayotte", "178": "Congo", "180": "DR Congo", "184": "Cook Islands", "188": "Costa Rica", "191": "Croatia", "192": "Cuba", "196": "Cyprus", "203": "Czechia", "204": "Benin", "208": "Denmark", "212": "Dominica", "214": "Dominican Republic", "218": "Ecuador", "222": "El Salvador", "226": "Equatorial Guinea", "231": "Ethiopia", "232": "Eritrea", "233": "Estonia", "234": "Faroe Islands", "238": "Falkland Islands", "239": "South Georgia", "242": "Fiji", "246": "Finland", "248": "Åland Islands", "250": "France", "254": "French Guiana", "258": "French Polynesia", "260": "French Southern Territories", "262": "Djibouti", "266": "Gabon", "268": "Georgia", "270": "Gambia", "275": "Palestine", "276": "Germany", "288": "Ghana", "292": "Gibraltar", "296": "Kiribati", "300": "Greece", "304": "Greenland", "308": "Grenada", "312": "Guadeloupe", "316": "Guam", "320": "Guatemala", "324": "Guinea", "328": "Guyana", "332": "Haiti", "334": "Heard Island and McDonald Islands", "336": "Vatican City", "340": "Honduras", "344": "Hong Kong", "348": "Hungary", "352": "Iceland", "356": "India", "360": "Indonesia", "364": "Iran", "368": "Iraq", "372": "Ireland", "376": "Israel", "380": "Italy", "384": "Côte d'Ivoire", "388": "Jamaica", "392": "Japan", "398": "Kazakhstan", "400": "Jordan", "404": "Kenya", "408": "North Korea", "410": "South Korea", "414": "Kuwait", "417": "Kyrgyzstan", "418": "Laos", "422": "Lebanon", "426": "Lesotho", "428": "Latvia", "430": "Liberia", "434": "Libya", "438": "Liechtenstein", "440": "Lithuania", "442": "Luxembourg", "446": "Macao", "450": "Madagascar", "454": "Malawi", "458": "Malaysia", "462": "Maldives", "466": "Mali", "470": "Malta", "474": "Martinique", "478": "Mauritania", "480": "Mauritius", "484": "Mexico", "492": "Monaco", "496": "Mongolia", "498": "Moldova", "499": "Montenegro", "500": "Montserrat", "504": "Morocco", "508": "Mozambique", "512": "Oman", "516": "Namibia", "520": "Nauru", "524": "Nepal", "528": "Netherlands", "531": "Curaçao", "533": "Aruba", "534": "Sint Maarten", "535": "Bonaire, Sint Eustatius and Saba", "540": "New Caledonia", "548": "Vanuatu", "554": "New Zealand", "558": "Nicaragua", "562": "Niger", "566": "Nigeria", "570": "Niue", "574": "Norfolk Island", "578": "Norway", "580": "Northern Mariana Islands", "581": "United States Minor Outlying Islands", "583": "Micronesia", "584": "Marshall Islands", "585": "Palau", "586": "Pakistan", "591": "Panama", "598": "Papua New Guinea", "600": "Paraguay", "604": "Peru", "608": "Philippines", "612": "Pitcairn", "616": "Poland", "620": "Portugal", "624": "Guinea-Bissau", "626": "Timor-Leste", "630": "Puerto Rico", "634": "Qatar", "638": "Réunion", "642": "Romania", "643": "Russia", "646": "Rwanda", "652": "Saint Barthélemy", "654": "Saint Helena", "659": "Saint Kitts and Nevis", "660": "Anguilla", "662": "Saint Lucia", "663": "Saint Martin", "666": "Saint Pierre and Miquelon", "670": "Saint Vincent and the Grenadines", "674": "San Marino", "678": "Sao Tome and Principe", "682": "Saudi Arabia", "686": "Senegal", "688": "Serbia", "690": "Seychelles", "694": "Sierra Leone", "702": "Singapore", "703": "Slovakia", "704": "Vietnam", "705": "Slovenia", "706": "Somalia", "710": "South Africa", "716": "Zimbabwe", "724": "Spain", "728": "South Sudan", "729": "Sudan", "732": "Western Sahara", "740": "Suriname", "744": "Svalbard and Jan Mayen", "748": "Eswatini", "752": "Sweden", "756": "Switzerland", "760": "Syria", "762": "Tajikistan", "764": "Thailand", "768": "Togo", "772": "Tokelau", "776": "Tonga", "780": "Trinidad and Tobago", "784": "UAE", "788": "Tunisia", "792": "Turkey", "795": "Turkmenistan", "796": "Turks and Caicos Islands", "798": "Tuvalu", "800": "Uganda", "804": "Ukraine", "807": "North Macedonia", "818": "Egypt", "826": "UK", "834": "Tanzania", "840": "USA", "850": "US Virgin Islands", "854": "Burkina Faso", "858": "Uruguay", "860": "Uzbekistan", "862": "Venezuela", "876": "Wallis and Futuna", "882": "Samoa", "887": "Yemen", "894": "Zambia" 
  };

  // Active/Available (Blue)
  const activeIds = [
    // North America & Central America
    "840", "124", "484", "044", "214", "308", "388", "630", "850", "320", "188", // USA, CAN, MEX, BHS, DOM, JAM, PRI, GRD, VIR, GTM, CRI
    // South America
    "076", "032", "152", "170", "604", "218", "600", "858", "328", "254", "740", // BRA, ARG, CHL, COL, PER, ECU, PRY, URY, GUY, GUF, SUR
    // Europe (Nearly all + Cyprus)
    "826", "372", "250", "276", "380", "724", "620", "528", "056", "756", "040", "616", "203", "703", "348", "642", "100", "300", "752", "578", "246", "208", "233", "428", "440", "352", "191", "705", "498", "804", "268", "499", "807", "492", "470", "008", "196", // UK, IRL, FRA, DEU, ITA, ESP, PRT, NLD, BEL, CHE, AUT, POL, CZE, SVK, HUN, ROU, BGR, GRC, SWE, NOR, FIN, DNK, EST, LVA, LTU, ISL, HRV, SVN, MDA, UKR, GEO, MNE, MKD, MCO, MLT, ALB, CYP
    // Asia / Oceania
    "392", "608", "458", "702", "496", "036", "554", "242", "598", "090", "548", "882", "776", "050", // JPN, PHL, MYS, SGP, MNG, AUS, NZL, FJI, PNG, SLB, VUT, WSM, TON, BGD
    // Africa
    "566", "288", "404", "646", "508", "454", "894", "716", "072", "748", "450", "694", "430", "562", "148", "204", "180", // NGA, GHA, KEN, RWA, MOZ, MWI, ZMB, ZWE, BWA, SWZ, MDG, SLE, LBR, NER, TCD, BEN, COD
    // Middle East
    "400", "887", "376", "634", "512", "031", // JOR, YEM, ISR, QAT, OMN, AZE
    // Africa (New Active)
    "706" // SOM
  ];

  // Waitlist / Coming Soon (Orange/Gold - Restricted/Pending)
  const geofencedIds = [
    // Middle East & Asia
    "792", "356", "586", "144", "524", "004", "364", "368", "422", "682", "784", "414", "764", "704", "418", "116", "104", "410", "360", // TUR, IND, PAK, LKA, NPL, AFG, IRN, IRQ, LBN, SAU, UAE, KWT, THA, VNM, LAO, KHM, MMR, KOR, IDN
    // Africa
    "710", "818", "012", "504", "788", "434", "729", "231", "120", "266", "232", "324", "466", "478", "516", "566", "686", "768", "800", "834", "854", // ZAF, EGY, DZA, MAR, TUN, LBY, SDN, ETH, CMR, GAB, ERI, GIN, MLI, MRT, NAM, SEN, TGO, UGA, TZA
    // Others (Inactive/Blocked/Service Unavailable)
    "156", "643", "112", "398", "795", "860", "762", "417", "068", "408", "760", "192", "558", "862" // CHN, RUS, BLR, KAZ, TKM, UZB, TJK, KGZ, BOL, PRK, SYR, CUB, NIC, VEN
  ];

  // Calculate centroids for country labels when geography loads
  useEffect(() => {
    if (geography.length === 0) return;

    const labels: any[] = [];
    // Projection for calculating 2D centroid to map back to lat/lng? 
    // Actually d3.geoCentroid is spherical.
    geography.forEach((geo) => {
        const id = String(geo.id);
        const name = countryNames[id];
        
        // Label all countries that have a name
        if (name) {
            const centroid = d3.geoCentroid(geo);
            // Centroid is [lng, lat]
            labels.push({
                name: name,
                lat: centroid[1],
                lng: centroid[0],
                size: 0.6, // Slightly larger than oceans
                color: 'white'
            });
        }
    });

    setCountryLabels(labels);
  }, [geography]);


  const getPolygonColor = (d: any) => {
    const id = String(d.id);
    if (geofencedIds.includes(id)) return 'rgba(245, 158, 11, 0.3)'; // Amber with transparency
    if (activeIds.includes(id)) return 'rgba(14, 165, 233, 0.3)'; // Cyan with transparency
    return 'rgba(2, 6, 23, 0.8)'; // Dark slate with transparency
  };

  const getPolygonSideColor = () => 'rgba(0,0,0,0)'; 
  const getPolygonStrokeColor = (d: any) => {
    const id = String(d.id);
    if (geofencedIds.includes(id)) return '#fbbf24'; // Bright Amber
    if (activeIds.includes(id)) return '#38bdf8'; // Bright Cyan
    return '#1e293b'; // Slate
  };

  const handleZoom = (factor: number) => {
    if (globeEl.current) {
        const altitude = globeEl.current.pointOfView().altitude;
        globeEl.current.pointOfView({ altitude: altitude * factor }, 300);
    }
  };

  return (
    <div className={`bg-black relative overflow-hidden ${fullScreen ? 'h-[100dvh] pt-0 pb-0 flex flex-col' : 'py-20'}`}>
      
      <div className={`relative z-10 w-full ${fullScreen ? 'h-full' : ''}`}>
        
        {!fullScreen && (
            <div className="text-center mb-12 px-4 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">
                <GlobeIcon className="w-3 h-3" /> Global Coverage
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {t('home.map_section_title')}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                {t('home.map_section_desc')}
            </p>
            </div>
        )}

        <div 
            ref={containerRef}
            className={`relative w-full mx-auto bg-slate-900/0 md:rounded-3xl overflow-hidden ${fullScreen ? 'h-full' : 'max-w-6xl h-[600px] border border-white/5 shadow-2xl'}`}
        >
          {/* Star Background Effect */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-black pointer-events-none">
            {/* Stars */}
            <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}></div>
             <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '120px 120px',
                backgroundPosition: '20px 20px'
            }}></div>
          </div>

          {/* Loading Screen */}
          {isLoading && (
            <div className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
                    <img src={logoWhite} alt="Loading" className="h-16 md:h-20 object-contain relative z-10 animate-pulse" />
                </div>
                <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
                <p className="text-slate-400 text-sm mt-4 font-mono tracking-widest uppercase animate-pulse">Yükleniyor...</p>
            </div>
          )}

          {mounted && (
              <Globe
                ref={globeEl as any}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="#000000" // Pure Black
                
                // Polygons (Countries)
                polygonsData={geography}
                polygonCapColor={getPolygonColor}
                polygonSideColor={getPolygonSideColor}
                polygonStrokeColor={getPolygonStrokeColor}
                polygonAltitude={0.01}
                
                // Labels (Countries + Oceans)
                labelsData={[...oceanLabels, ...countryLabels]}
                labelLat={d => (d as any).lat}
                labelLng={d => (d as any).lng}
                labelText={d => (d as any).name}
                labelSize={d => (d as any).size || 1}
                labelDotRadius={0}
                labelColor={d => (d as any).color || 'rgba(255, 255, 255, 0.4)'}
                labelResolution={2}
                labelAltitude={0.02}

                // Rings (Active Ships pinging)
                ringsData={ships}
                ringColor={() => (t: any) => `rgba(6, 182, 212, ${(1-t) * 0.4})`} // Reduced opacity
                ringMaxRadius={d => (d as any).maxR}
                ringPropagationSpeed={d => (d as any).propagationSpeed}
                ringRepeatPeriod={d => (d as any).repeatPeriod}
                ringAltitude={0.002}

                // Objects (Satellites + Ships)
                objectsData={[...satellites, ...ships]}
                objectLat={d => (d as any).lat}
                objectLng={d => (d as any).lng}
                objectAltitude={d => (d as any).alt}
                objectThreeObject={d => new THREE.Mesh(
                    new THREE.SphereGeometry((d as any).size),
                    new THREE.MeshBasicMaterial({ color: (d as any).color })
                )}
                
                // Atmosphere
                atmosphereColor="#93c5fd" // Lighter Blue (Blue-300) for cinematic bloom
                atmosphereAltitude={0.25} // Increased altitude for "God rays" feel
                
                // Arcs (Space Lasers)
                arcsData={lasers}
                arcColor={'color'}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={1500}
                arcStroke={0.3}
                arcAltitude={0.1} // Same as satellite altitude

                // Interaction
                onPolygonHover={(polygon: any) => {
                    // Optional: tooltip logic could go here
                }}
              />
          )}

             {/* Desktop HUD Position */}
             <div className="hidden md:block absolute z-40 pointer-events-none md:top-1/2 md:-translate-y-1/2 md:left-6">
                 <SystemHUD />
             </div>

             {/* Live Event Ticker */}
             <EventTicker />

             {/* Desktop Legend Overlay */}
             <div className="hidden md:block absolute bottom-12 left-6 z-50 pointer-events-none md:bottom-16">
                <div className="flex flex-col gap-1.5 md:gap-2 bg-slate-950/80 p-3 md:p-4 rounded-xl border border-white/10 backdrop-blur-md text-[10px] md:text-xs shadow-2xl">
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                        <span className="font-bold">Kapsama Alanında</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <span className="font-bold">Yakında Gelecek</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-800 border border-slate-600"></div>
                        <span>Kapsama Dışı</span>
                    </div>
                    
                    <div className="h-px bg-white/10 my-0.5"></div>
                    
                    <div className="flex items-center gap-2 text-cyan-400">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-cyan-400 flex items-center justify-center">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                        </div>
                        <span className="font-bold">Okyanus/Deniz (Aktif)</span>
                    </div>
                </div>
             </div>

             {/* Mobile Bottom Grid Container */}
             <div className="md:hidden absolute bottom-12 left-0 w-full px-4 z-50 grid grid-cols-12 gap-2 items-stretch pointer-events-none pb-4">
                 {/* 1. Legend (Left - col-span-4) */}
                 <div className="col-span-4">
                    <div className="h-full flex flex-col justify-between bg-slate-950/80 p-2 rounded-xl border border-white/10 backdrop-blur-md text-[7.5px] shadow-xl">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_5px_rgba(14,165,233,0.5)] shrink-0"></div>
                                <span className="font-bold leading-tight">Kapsama Alanında</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)] shrink-0"></div>
                                <span className="font-bold leading-tight">Yakında Gelecek</span>
                            </div>
                             <div className="flex items-center gap-1.5 text-slate-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-600 shrink-0"></div>
                                <span className="font-bold leading-tight">Kapsama Dışı</span>
                            </div>
                        </div>

                        <div className="h-px bg-white/10 w-full my-0.5"></div>

                        <div className="flex items-center gap-1.5 text-cyan-400">
                             <div className="w-1.5 h-1.5 rounded-full border border-cyan-400 flex items-center justify-center shrink-0"></div>
                            <span className="font-bold leading-tight">Okyanus/Deniz (Aktif)</span>
                        </div>
                    </div>
                 </div>

                 {/* 2. System HUD (Center - col-span-6) */}
                 <div className="col-span-6 flex justify-center">
                     <SystemHUD />
                 </div>

                 {/* 3. Zoom Controls (Right - col-span-2) */}
                 <div className="col-span-2 flex flex-col justify-end gap-2 items-end pointer-events-auto pb-0">
                    <button 
                        onClick={() => handleZoom(0.7)}
                        className="w-8 h-8 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 shadow-lg active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => handleZoom(1.4)}
                        className="w-8 h-8 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 shadow-lg active:scale-95"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                 </div>
             </div>


             {/* Desktop Zoom Controls */}
             <div className="hidden md:flex absolute bottom-12 right-6 flex-col gap-3 z-50 md:bottom-16 right-6 pointer-events-auto">
                <button 
                    onClick={() => handleZoom(0.7)}
                    className="w-10 h-10 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-all active:scale-95"
                    aria-label="Zoom In"
                >
                    <Plus className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => handleZoom(1.4)}
                    className="w-10 h-10 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-all active:scale-95"
                    aria-label="Zoom Out"
                >
                    <Minus className="w-5 h-5" />
                </button>
             </div>
        </div>
      </div>
    </div>
  );
}

