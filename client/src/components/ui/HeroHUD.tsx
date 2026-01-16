import React, { useState, useEffect } from 'react';
import { Shield, Wifi, Activity, Navigation, Anchor, Globe, Lock, Cpu, Server, Radio } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Reusable HUD Card Component
const HUDCard = ({ children, className = "", align = "left" }: { children: React.ReactNode, className?: string, align?: "left" | "right" }) => (
    <div className={`bg-slate-950/40 backdrop-blur-md border border-cyan-500/20 p-4 rounded-xl relative group hover:border-cyan-500/40 transition-colors ${className}`}>
        {/* Tech Corners */}
        <div className={`absolute top-0 ${align === "left" ? "left-0" : "right-0"} w-2 h-2 border-t border-${align === "left" ? "l" : "r"} border-cyan-400`}></div>
        <div className={`absolute bottom-0 ${align === "left" ? "right-0" : "left-0"} w-2 h-2 border-b border-${align === "left" ? "r" : "l"} border-cyan-400 opacity-50`}></div>
        {children}
    </div>
);

// Animated Number Component
const LiveValue = ({ min, max, unit = "", interval = 1000, decimals = 0 }: { min: number, max: number, unit?: string, interval?: number, decimals?: number }) => {
    const [value, setValue] = useState((min + max) / 2);

    useEffect(() => {
        const timer = setInterval(() => {
            const change = (Math.random() - 0.5) * ((max - min) * 0.1);
            setValue(prev => {
                const newValue = Math.max(min, Math.min(max, prev + change));
                return newValue;
            });
        }, interval);
        return () => clearInterval(timer);
    }, [min, max, interval]);

    return <span className="font-mono text-cyan-300">{value.toFixed(decimals)}{unit}</span>;
};

export const HeroHUD = () => {
    return (
        <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none p-4 md:p-8 pt-24 pb-12">
            
            {/* TOP HUD BAR */}
            <div className="flex justify-between items-start w-full max-w-[1600px] mx-auto">
                {/* Left: Ship Status */}
                <div className="hidden md:flex flex-col gap-2 animate-in slide-in-from-left duration-1000 fade-in">
                    <HUDCard className="w-64">
                        <div className="flex items-center gap-2 mb-2 text-cyan-500 text-xs font-bold tracking-widest uppercase border-b border-cyan-500/20 pb-1">
                            <Navigation className="w-3 h-3" /> Vessel Status
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase">Speed</div>
                                <div className="text-lg font-bold text-white"><LiveValue min={12} max={18} unit=" kn" decimals={1} /></div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase">Heading</div>
                                <div className="text-lg font-bold text-white"><LiveValue min={140} max={145} unit="°" decimals={0} /></div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-[10px] text-slate-400 uppercase">Coordinates</div>
                                <div className="text-xs font-mono text-cyan-200">34°42'18.4"N 33°19'53.2"E</div>
                            </div>
                        </div>
                    </HUDCard>
                </div>

                {/* Right: Network Status */}
                <div className="hidden md:flex flex-col gap-2 animate-in slide-in-from-right duration-1000 fade-in">
                    <HUDCard className="w-72" align="right">
                         <div className="flex items-center justify-between gap-2 mb-2 text-cyan-500 text-xs font-bold tracking-widest uppercase border-b border-cyan-500/20 pb-1">
                            <div className="flex items-center gap-2">
                                <Wifi className="w-3 h-3" /> Network Integrity
                            </div>
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </div>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-400 uppercase">Starlink Signal</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-sm ${i<=4 ? 'bg-cyan-400' : 'bg-slate-700'}`}></div>)}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-400 uppercase">Latency</span>
                                <LiveValue min={25} max={45} unit=" ms" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-400 uppercase">Firewall</span>
                                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><Shield className="w-3 h-3" /> ACTIVE</span>
                            </div>
                        </div>
                    </HUDCard>
                </div>
            </div>

            {/* CENTER: MAIN CONTENT */}
            <div className="flex-grow flex items-center justify-center pointer-events-auto">
                <div className="text-center max-w-4xl mx-auto px-4">
                     {/* Floating Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md mb-8 animate-in fade-in zoom-in duration-700 delay-300">
                        <div className="flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono text-emerald-400 font-bold">SYSTEM OPTIMIZED</span>
                        </div>
                        <div className="w-px h-4 bg-cyan-500/30"></div>
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-mono text-cyan-200">GLOBAL LINK</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 text-2xl md:text-3xl font-light tracking-[0.2em] mb-4 uppercase">
                            Denizcilik & Teknoloji
                        </span>
                        Okyanusun Ortasında <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">
                            Ofis Konforu
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        Kesintisiz Starlink bağlantısı ve siber güvenlik kalkanı ile gemileriniz, dünyanın neresinde olursa olsun işinizin merkezinde.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Button asChild size="lg" className="h-16 px-10 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-none border border-cyan-400/50 shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(8,145,178,0.6)] group relative overflow-hidden">
                            <Link href="/it-hizmetleri">
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/50"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/50"></div>
                                <span className="relative z-10 flex items-center gap-3">
                                    HİZMETLERİ KEŞFET <Radio className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </span>
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-16 px-10 border-slate-600 text-slate-200 bg-slate-900/60 hover:bg-slate-800 hover:text-white backdrop-blur-md rounded-none border border-slate-500/50 transition-all hover:scale-105 group relative">
                            <Link href="/iletisim">
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-400/50"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-400/50"></div>
                                <span className="relative z-10">BİZE ULAŞIN</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* BOTTOM HUD STRIP */}
            <div className="w-full max-w-[1600px] mx-auto border-t border-cyan-500/20 pt-4 hidden md:flex justify-between items-center text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest animate-in slide-in-from-bottom duration-1000 fade-in">
                 <div className="flex gap-8">
                    <span>SYS_ID: LCV-2024-X1</span>
                    <span>SECURE_LINK: ESTABLISHED</span>
                    <span>ENCRYPTION: AES-256</span>
                 </div>
                 <div className="flex gap-8">
                    <span className="animate-pulse">● LIVE MONITORING</span>
                 </div>
            </div>

        </div>
    );
}

export default HeroHUD;