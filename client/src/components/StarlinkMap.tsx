import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import { Globe as GlobeIcon, Plus, Minus, Info, Maximize2, Minimize2 } from 'lucide-react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

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

export function StarlinkMap({ fullScreen = false }: { fullScreen?: boolean }) {
  const { t } = useTranslation();
  const [geography, setGeography] = useState<any[]>([]);
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [mounted, setMounted] = useState(false);
  
  // Use a ref to store country labels to avoid re-calculating on every render
  const [countryLabels, setCountryLabels] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch(geoUrl)
      .then((response) => response.json())
      .then((topology) => {
        const countries = feature(topology, topology.objects.countries);
        setGeography((countries as any).features);
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

  // Initial Globe Position
  useEffect(() => {
    if (globeEl.current) {
        // Center roughly on Turkey/Europe
        globeEl.current.pointOfView({ lat: 39, lng: 35, altitude: 2.0 }, 1000);
        
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.5;
        globeEl.current.controls().enableZoom = true;
    }
  }, [mounted]);

  // Generate Satellites (Random Points)
  // Instead of pointsData, we'll use customLayer for better control (spheres)
  const satellites = useMemo(() => {
    const N = 3000;
    return Array.from({ length: N }).map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      alt: 0.1, // Fixed Altitude for all satellites (Low Earth Orbit)
      color: Math.random() > 0.3 ? '#f59e0b' : '#ffffff', // Orange/Gold hue mixed with white
      size: Math.random() * 0.15 + 0.05 // Smaller, uniform dots
    }));
  }, []);


  // Country ID to Name Mapping
  const countryNames: Record<string, string> = {
    // North America
    "840": "USA", "124": "Canada", "484": "Mexico",
    // South America
    "076": "Brazil", "032": "Argentina", "152": "Chile", "170": "Colombia", "604": "Peru", "218": "Ecuador", "600": "Paraguay", "858": "Uruguay", "068": "Bolivia",
    // Europe
    "826": "UK", "372": "Ireland", "250": "France", "276": "Germany", "380": "Italy", "724": "Spain", "620": "Portugal", "528": "Netherlands", "056": "Belgium", "756": "Switzerland", "040": "Austria", "616": "Poland", "203": "Czechia", "703": "Slovakia", "348": "Hungary", "642": "Romania", "100": "Bulgaria", "300": "Greece", "752": "Sweden", "578": "Norway", "246": "Finland", "208": "Denmark", "233": "Estonia", "428": "Latvia", "440": "Lithuania", "352": "Iceland",
    // Asia / Oceania
    "392": "Japan", "608": "Philippines", "360": "Indonesia", "036": "Australia", "554": "New Zealand",
    // Africa
    "566": "Nigeria", "288": "Ghana", "404": "Kenya", "646": "Rwanda", "508": "Mozambique", "454": "Malawi", "894": "Zambia", "716": "Zimbabwe", "072": "Botswana", "748": "Eswatini", "450": "Madagascar", "694": "Sierra Leone", "430": "Liberia", "562": "Niger", "180": "DR Congo", "710": "South Africa",
    // Waitlist / Coming Soon (Geofenced/Inactive)
    "792": "Turkey", "356": "India", "586": "Pakistan", "050": "Bangladesh", "144": "Sri Lanka", "524": "Nepal", "004": "Afghanistan", "364": "Iran", "368": "Iraq", "760": "Syria", "422": "Lebanon", "400": "Jordan", "682": "Saudi Arabia", "784": "UAE", "634": "Qatar", "414": "Kuwait", "512": "Oman", "887": "Yemen",
    "156": "China", "643": "Russia", "112": "Belarus", "804": "Ukraine", "398": "Kazakhstan", "795": "Turkmenistan", "860": "Uzbekistan", "762": "Tajikistan", "417": "Kyrgyzstan",
    "764": "Thailand", "704": "Vietnam", "418": "Laos", "116": "Cambodia", "104": "Myanmar", "458": "Malaysia", "702": "Singapore", "410": "South Korea", "408": "North Korea",
    "818": "Egypt", "012": "Algeria", "504": "Morocco", "788": "Tunisia", "434": "Libya", "729": "Sudan", "231": "Ethiopia", "706": "Somalia"
  };

  // Active/Available (Blue)
  const activeIds = [
    // North America
    "840", "124", "484", "044", "214", "308", "388", "630", "850", // USA, CAN, MEX, BHS, DOM, JAM, PRI, GRD, VIR
    // South America
    "076", "032", "152", "170", "604", "218", "600", "858", "328", "254", "740", // BRA, ARG, CHL, COL, PER, ECU, PRY, URY, GUY, GUF, SUR
    // Europe (Nearly all)
    "826", "372", "250", "276", "380", "724", "620", "528", "056", "756", "040", "616", "203", "703", "348", "642", "100", "300", "752", "578", "246", "208", "233", "428", "440", "352", "191", "705", "498", "804", "268", "499", "807", "492", "470", "008", // UK, IRL, FRA, DEU, ITA, ESP, PRT, NLD, BEL, CHE, AUT, POL, CZE, SVK, HUN, ROU, BGR, GRC, SWE, NOR, FIN, DNK, EST, LVA, LTU, ISL, HRV, SVN, MDA, UKR, GEO, MNE, MKD, MCO, MLT, ALB
    // Asia / Oceania
    "392", "608", "458", "702", "496", "036", "554", "242", "598", "090", "548", "882", "776", "050", // JPN, PHL, MYS, SGP, MNG, AUS, NZL, FJI, PNG, SLB, VUT, WSM, TON, BGD
    // Africa
    "566", "288", "404", "646", "508", "454", "894", "716", "072", "748", "450", "694", "430", "562", "148", "204", "180", // NGA, GHA, KEN, RWA, MOZ, MWI, ZMB, ZWE, BWA, SWZ, MDG, SLE, LBR, NER, TCD, BEN, COD
    // Middle East
    "400", "887" // JOR, YEM
  ];

  // Waitlist / Coming Soon (Orange/Gold - Restricted/Pending)
  const geofencedIds = [
    // Middle East & Asia
    "792", "356", "586", "144", "524", "004", "364", "368", "760", "422", "682", "784", "634", "414", "512", "764", "704", "418", "116", "104", "410", "360", // TUR, IND, PAK, LKA, NPL, AFG, IRN, IRQ, SYR, LBN, SAU, UAE, QAT, KWT, OMN, THA, VNM, LAO, KHM, MMR, KOR, IDN
    // Africa
    "710", "818", "012", "504", "788", "434", "729", "231", "706", "120", "266", "232", "324", "466", "478", "516", "566", "686", "768", "800", "834", "854", // ZAF, EGY, DZA, MAR, TUN, LBY, SDN, ETH, SOM, CMR, GAB, ERI, GIN, MLI, MRT, NAM, SEN, TGO, UGA, TZA
    // Others
    "156", "643", "112", "398", "795", "860", "762", "417", "068", "408", "192", "862" // CHN, RUS, BLR, KAZ, TKM, UZB, TJK, KGZ, BOL, PRK, CUB, VEN
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
        
        // Only label relevant countries
        if ((activeIds.includes(id) || geofencedIds.includes(id)) && name) {
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
    if (geofencedIds.includes(id)) return '#f59e0b'; // Amber-500 (Waitlist/Coming Soon)
    if (activeIds.includes(id)) return '#0ea5e9'; // Blue
    return '#1e293b'; // Default Dark
  };

  const getPolygonSideColor = () => 'rgba(0,0,0,0)'; // Transparent sides
  const getPolygonStrokeColor = () => '#334155'; // Slate borders

  const handleZoom = (factor: number) => {
    if (globeEl.current) {
        const altitude = globeEl.current.pointOfView().altitude;
        globeEl.current.pointOfView({ altitude: altitude * factor }, 300);
    }
  };

  return (
    <div className={`bg-slate-950 relative overflow-hidden ${fullScreen ? 'h-[100dvh] pt-0 pb-0 flex flex-col' : 'py-20'}`}>
      {!fullScreen && (
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0"></div>
      )}
      
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
          {mounted && (
              <Globe
                ref={globeEl as any}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                
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

                // Objects (Satellites as Spheres instead of Points to avoid "Bars")
                objectsData={satellites}
                objectLat={d => (d as any).lat}
                objectLng={d => (d as any).lng}
                objectAltitude={d => (d as any).alt}
                objectThreeObject={d => new THREE.Mesh(
                    new THREE.SphereGeometry((d as any).size),
                    new THREE.MeshBasicMaterial({ color: (d as any).color })
                )}
                
                // Atmosphere
                atmosphereColor="#0ea5e9"
                atmosphereAltitude={0.15}
                
                // Interaction
                onPolygonHover={(polygon: any) => {
                    // Optional: tooltip logic could go here
                }}
              />
          )}

             {/* Legend Overlay */}
             <div className="absolute bottom-6 left-6 z-50 pointer-events-none">
                <div className="flex flex-col gap-2 bg-slate-950/80 p-4 rounded-xl border border-white/10 backdrop-blur-md text-xs shadow-2xl">
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                        <span className="font-bold">{t('home.map_legend_active')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <span className="font-bold">Waitlist / Coming Soon</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-600"></div>
                        {t('home.map_legend_inactive')}
                    </div>
                </div>
             </div>

             {/* Maritime Note */}
             <div className={`absolute ${fullScreen ? 'top-32 right-6 max-w-sm' : 'top-6 right-6 max-w-xs'} z-40`}>
                 <div className="flex items-start gap-3 p-4 bg-slate-950/80 backdrop-blur-md border border-amber-500/20 rounded-xl shadow-2xl">
                    <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Maritime Coverage</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                            Global maritime coverage available even in geofenced regions (2-10nm offshore).
                        </p>
                    </div>
                 </div>
             </div>

             {/* Zoom Controls */}
             <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-50">
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

