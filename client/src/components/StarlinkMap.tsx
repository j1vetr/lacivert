import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import { Globe, Map as MapIcon, Info, Plus, Minus } from 'lucide-react';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Active Starlink Countries (Approximate List)
// This is a simplified list for visualization purposes.
const activeCountries = [
  "USA", "CAN", "MEX", // North America
  "GBR", "DEU", "FRA", "ESP", "ITA", "POL", "UKR", "NOR", "SWE", "FIN", "DNK", "NLD", "BEL", "CHE", "AUT", "CZE", "PRT", "IRL", "GRC", "ROU", "BGR", "HRV", "HUN", "SVK", "SVN", "EST", "LVA", "LTU", // Europe
  "AUS", "NZL", // Oceania
  "JPN", "PHL", "MYS", // Asia
  "BRA", "CHL", "PER", "COL", // South America
  "NGA", "KEN", "RWA", "MOZ", "ZMB", "MWI" // Africa
];

// Coming Soon / Waitlist
const waitlistCountries = [
  "TUR", "IND", "SAU", "EGY", "ZAF", "IDN", "THA", "VNM"
];

export function StarlinkMap({ fullScreen = false }: { fullScreen?: boolean }) {
  const { t } = useTranslation();
  const [geography, setGeography] = useState<any[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((topology) => {
        const countries = feature(topology, topology.objects.countries);
        setGeography((countries as any).features);
      });
  }, []);

  // Zoom Setup
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svg = select(svgRef.current);
    const g = select(gRef.current);

    // Calculate better initial scale/translate for mobile
    const isMobile = window.innerWidth < 768;
    
    // Start more zoomed in, especially on mobile
    const initialScale = isMobile ? 2.5 : 1.2;
    
    // Center on Europe/Middle East roughly
    const initialX = isMobile ? -280 : -50; 
    const initialY = isMobile ? -150 : 0;

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8]) // Zoom limits
      .translateExtent([[0, 0], [800, 450]]) // Pan limits matching viewBox
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // Apply initial transform
    svg.call(zoomBehavior)
       .call(zoomBehavior.transform, zoomIdentity.translate(initialX, initialY).scale(initialScale));
    
    // Store zoom behavior on svg node for button access
    (svg.node() as any).__zoomBehavior = zoomBehavior;

  }, [geography]); // Re-attach if geography loads (though mainly just needs svg/g refs)

  const handleZoom = (factor: number) => {
     if (!svgRef.current) return;
     const svg = select(svgRef.current);
     const zoomBehavior = (svg.node() as any).__zoomBehavior;
     if (zoomBehavior) {
         svg.transition().duration(300).call(zoomBehavior.scaleBy, factor);
     }
  };


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
    "840", "124", "484", // NA
    "076", "032", "152", "170", "604", "218", "600", "858", "068", // SA
    "826", "372", "250", "276", "380", "724", "620", "528", "056", "756", "040", "616", "203", "703", "348", "642", "100", "300", "752", "578", "246", "208", "233", "428", "440", "352", // EU
    "392", "608", "360", "036", "554", // Asia/Oceania
    "566", "288", "404", "646", "508", "454", "894", "716", "072", "748", "450", "694", "430", "562", "180", "710" // Africa
  ];

  // Geofenced/Waitlist (Pink/Fuchsia - Restricted/Coming Soon)
  const geofencedIds = [
    "792", "356", "586", "050", "144", "524", "004", "364", "368", "760", "422", "400", "682", "784", "634", "414", "512", "887",
    "156", "643", "112", "804", "398", "795", "860", "762", "417",
    "764", "704", "418", "116", "104", "458", "702", "410", "408",
    "818", "012", "504", "788", "434", "729", "231", "706"
  ];

  const projection = d3.geoMercator()
    .scale(140)
    .translate([400, 280]);

  const pathGenerator = d3.geoPath().projection(projection);
  // Removed tooltip state as we are showing labels directly

  // Ocean/Sea Labels
  const oceanLabels = [
    { name: "North Atlantic Ocean", coords: [-40, 35] },
    { name: "South Atlantic Ocean", coords: [-20, -25] },
    { name: "North Pacific Ocean", coords: [-160, 35] },
    { name: "South Pacific Ocean", coords: [-130, -25] },
    { name: "Indian Ocean", coords: [80, -15] },
    { name: "Southern Ocean", coords: [0, -65] },
    { name: "Arctic Ocean", coords: [0, 85] },
    { name: "Mediterranean Sea", coords: [18, 35], fontSize: "4px" },
    { name: "Caribbean Sea", coords: [-75, 15], fontSize: "4px" },
    { name: "Gulf of Mexico", coords: [-90, 25], fontSize: "4px" },
    { name: "Arabian Sea", coords: [65, 15], fontSize: "4px" },
    { name: "Bay of Bengal", coords: [90, 15], fontSize: "4px" },
    { name: "South China Sea", coords: [115, 12], fontSize: "4px" },
    { name: "Sea of Japan", coords: [135, 40], fontSize: "4px" },
  ];

  return (
    <div className={`bg-slate-950 relative overflow-hidden ${fullScreen ? 'h-[100dvh] pt-40 pb-0 flex flex-col' : 'py-20'}`}>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className={`container mx-auto px-0 md:px-4 relative z-10 ${fullScreen ? 'h-full flex flex-col' : ''}`}>
        
        {!fullScreen && (
            <div className="text-center mb-12 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">
                <Globe className="w-3 h-3" /> Global Coverage
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {t('home.map_section_title')}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                {t('home.map_section_desc')}
            </p>
            </div>
        )}

        <div className={`relative w-full mx-auto bg-slate-900/50 md:rounded-3xl border-y md:border border-white/5 shadow-2xl overflow-hidden ${fullScreen ? 'flex-grow flex flex-col h-full' : 'max-w-5xl p-4 md:p-8'}`}>
          {/* Map SVG */}
          <div className={`w-full relative select-none overflow-hidden cursor-grab active:cursor-grabbing ${fullScreen ? 'h-full' : 'aspect-[1.6/1]'}`}>
             <svg ref={svgRef} viewBox="0 0 800 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <g ref={gRef}>
                  {/* Ocean Labels Layer - Behind countries? No, on top of background but behind countries usually. 
                      Since countries are drawn on top, let's draw oceans first if we want them 'under' the land 
                      but visible on water. The background is water. */}
                  {oceanLabels.map((ocean, idx) => {
                      const [x, y] = projection(ocean.coords as [number, number]) || [0, 0];
                      if (!x || !y) return null;
                      return (
                          <text
                              key={`ocean-${idx}`}
                              x={x}
                              y={y}
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              fill="#475569" // slate-600
                              fontSize={ocean.fontSize || "8px"}
                              fontWeight="bold"
                              className="pointer-events-none select-none opacity-40 tracking-widest uppercase"
                              style={{ letterSpacing: '0.1em' }}
                          >
                              {ocean.name}
                          </text>
                      );
                  })}

                  {geography.map((geo) => {
                    const id = String(geo.id);
                    let fill = "#1e293b"; // default slate-800 (Rest of World)
                    let opacity = 0.5;
                    let name = countryNames[id] || ""; 
                    let stroke = "#334155";

                    let isColored = false;

                    if (geofencedIds.includes(id)) {
                        fill = "#d946ef"; // fuchsia-500 (Waitlist/Geofenced)
                        opacity = 0.9;
                        isColored = true;
                    } else if (activeIds.includes(id)) {
                        fill = "#0ea5e9"; // sky-500 (Active/Blue)
                        opacity = 0.8;
                        isColored = true;
                    }

                    const centroid = pathGenerator.centroid(geo);
                    const showLabel = isColored && name && !isNaN(centroid[0]);

                    return (
                      <g key={geo.id || `geo-${Math.random()}`}>
                          <path
                            d={pathGenerator(geo) || undefined}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="0.5"
                            style={{ transition: "all 0.3s" }}
                            className="hover:brightness-125"
                          />
                          {showLabel && (
                              <text
                                x={centroid[0]}
                                y={centroid[1]}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fill="white"
                                fontSize="6px"
                                fontWeight="bold"
                                style={{ 
                                    pointerEvents: 'none', 
                                    textShadow: '0px 0px 2px #000' 
                                }}
                              >
                                {name}
                              </text>
                          )}
                      </g>
                    );
                  })}
                </g>
                
                {/* Legend Overlay - Updated to match image logic */}
                <foreignObject x="20" y={fullScreen ? 20 : 380} width="300" height="100">
                    <div className="flex flex-col gap-2 bg-slate-950/80 p-3 rounded-lg border border-white/10 backdrop-blur-sm text-xs shadow-xl pointer-events-none">
                        <div className="flex items-center gap-2 text-slate-300">
                            <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                            {t('home.map_legend_active')}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <div className="w-3 h-3 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                            Geofenced Regions (Restricted)
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-600"></div>
                            {t('home.map_legend_inactive')}
                        </div>
                    </div>
                </foreignObject>
             </svg>

             {/* Zoom Controls */}
             <div className="absolute bottom-20 md:bottom-4 right-4 flex flex-col gap-3 z-50">
                <button 
                    onClick={() => handleZoom(1.3)}
                    className="w-10 h-10 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-all active:scale-95"
                    aria-label="Zoom In"
                >
                    <Plus className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => handleZoom(0.77)}
                    className="w-10 h-10 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-all active:scale-95"
                    aria-label="Zoom Out"
                >
                    <Minus className="w-5 h-5" />
                </button>
             </div>
          </div>
          
          {/* Maritime Coverage Note */}
          <div className={`flex items-start gap-3 p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 ${fullScreen ? 'relative md:absolute bottom-0 md:bottom-4 left-0 md:left-4 w-full md:max-w-md md:rounded-xl backdrop-blur-sm bg-slate-950/90 border-t md:border border-fuchsia-500/20 z-40' : 'mt-6 rounded-xl'}`}>
            <Info className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
            <div>
                <h4 className="text-fuchsia-400 font-bold text-sm mb-1">Geofenced Regions Note</h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    "Geofenced" bölgelerde (Türkiye dahil) karasal Starlink hizmeti kısıtlı olabilir, ancak <strong>Maritime (Denizcilik)</strong> hizmeti kıyıdan ülkeye göre değişkenlik gösteren (2 - 10 deniz mili) mesafeden sonra uluslararası sularda sorunsuz çalışmaktadır.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
