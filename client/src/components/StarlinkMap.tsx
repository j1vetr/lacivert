import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import { Globe, Map as MapIcon, Info } from 'lucide-react';

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

export function StarlinkMap() {
  const { t } = useTranslation();
  const [geography, setGeography] = useState<any[]>([]);

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((topology) => {
        const countries = feature(topology, topology.objects.countries);
        setGeography((countries as any).features);
      });
  }, []);

  // Country ID to Name Mapping
  const countryNames: Record<string, string> = {
    "840": "USA", "124": "Canada", "484": "Mexico",
    "076": "Brazil", "032": "Argentina", "152": "Chile", "170": "Colombia", "218": "Ecuador", "600": "Paraguay", "604": "Peru", "858": "Uruguay", "862": "Venezuela",
    "826": "UK", "250": "France", "276": "Germany", "380": "Italy", "724": "Spain", "620": "Portugal", "528": "Netherlands", "056": "Belgium", "756": "Switzerland", "040": "Austria", "203": "Czechia", "616": "Poland", "578": "Norway", "752": "Sweden", "246": "Finland", "352": "Iceland", "372": "Ireland", "428": "Latvia", "440": "Lithuania", "233": "Estonia", "417": "Kyrgyzstan",
    "036": "Australia", "554": "New Zealand",
    "392": "Japan", "608": "Philippines", "458": "Malaysia",
    "643": "Russia", "112": "Belarus", "156": "China", "356": "India", "586": "Pakistan", "792": "Turkey", "682": "Saudi Arabia", "364": "Iran", "368": "Iraq", "818": "Egypt", "710": "South Africa", "024": "Angola", "784": "UAE", "408": "North Korea",
    "360": "Indonesia", "418": "Laos", "434": "Libya", "450": "Madagascar", "454": "Malawi", "480": "Mauritius", "504": "Morocco", "624": "Guinea-Bissau", "728": "South Sudan", "760": "Syria", "887": "Yemen"
  };

  const projection = d3.geoMercator()
    .scale(140)
    .translate([400, 280]);

  const pathGenerator = d3.geoPath().projection(projection);
  // Removed tooltip state as we are showing labels directly

  return (
    <div className="bg-slate-950 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
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

        <div className="relative w-full max-w-5xl mx-auto bg-slate-900/50 rounded-3xl border border-white/5 p-4 md:p-8 shadow-2xl overflow-hidden">
          {/* Map SVG */}
          <div className="w-full aspect-[1.6/1] relative select-none">
             <svg viewBox="0 0 800 450" className="w-full h-full">
                <g>
                  {geography.map((geo) => {
                    const id = String(geo.id);
                    let fill = "#1e293b"; // default slate-800 (Rest of World)
                    let opacity = 0.5;
                    let name = countryNames[id] || ""; // Use mapped name or empty
                    let stroke = "#334155";

                    // ID Mapping (ISO 3166-1 numeric approx) based on common world-atlas usage
                    // Geofenced List (Pink/Purple in image): 
                    // Russia(643), Belarus(112), China(156), India(356), Pakistan(586), 
                    // Turkey(792), Saudi Arabia(682), Iran(364), Iraq(368), Egypt(818), 
                    // South Africa(710), Angola(024), UAE(784), North Korea(408)
                    const geofencedIds = [
                        "643", "112", "156", "356", "586", "792", "682", "364", "368", 
                        "818", "710", "024", "784", "408", "104", "360", "418", "434", "450", "454", "480", "504", "624", "728", "760", "887"
                    ];

                    // Active/Available (Blue in image):
                    // North America, South America, Europe, Australia, Japan
                    const activeIds = [
                        "840", "124", "484", // NA (USA, CAN, MEX)
                        "076", "032", "152", "170", "218", "600", "604", "858", "862", // South America (BRA, ARG, CHL, COL, ECU, PRY, PER, URY, VEN)
                        "826", "250", "276", "380", "724", "620", "528", "056", "756", "040", "203", "616", "578", "752", "246", "352", "372", "428", "440", "233", "417", // Europe (UK, FR, DE, IT, ES, PT, NL, BE, CH, AT, CZ, PL, NO, SE, FI, IS, IE, LV, LT, EE, KG)
                        "036", "554", // Oceania (AUS, NZL)
                        "392", "608", "458" // Asia (JPN, PHL, MYS)
                    ];

                    let isColored = false;

                    if (geofencedIds.includes(id)) {
                        fill = "#d946ef"; // fuchsia-500 (Geofenced/Pink)
                        opacity = 0.9;
                        isColored = true;
                    } else if (activeIds.includes(id)) {
                        fill = "#0ea5e9"; // sky-500 (Active/Blue)
                        opacity = 0.8;
                        isColored = true;
                    }

                    const centroid = pathGenerator.centroid(geo);
                    // Only show label if it's a colored country AND we have a name AND it's large enough (simple heuristic using centroid validity)
                    // We can also check d3.geoArea(geo) but let's trust the lists for now.
                    // To prevent clutter, we might skip small countries if we had area data, but for now let's try to show all in our lists.
                    const showLabel = isColored && name && !isNaN(centroid[0]);

                    return (
                      <g key={geo.rsmKey || id}>
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
                <foreignObject x="20" y="380" width="300" height="100">
                    <div className="flex flex-col gap-2 bg-slate-950/80 p-3 rounded-lg border border-white/10 backdrop-blur-sm text-xs shadow-xl">
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
          </div>
          
          {/* Maritime Coverage Note */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl">
            <Info className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
            <div>
                <h4 className="text-fuchsia-400 font-bold text-sm mb-1">Geofenced Regions Note</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    "Geofenced" bölgelerde (Türkiye dahil) karasal Starlink hizmeti kısıtlı olabilir, ancak <strong>Maritime (Denizcilik)</strong> hizmeti kıyıdan 12 deniz mili (Nautical Miles) açıldıktan sonra uluslararası sularda sorunsuz çalışmaktadır.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
