import React from 'react';
import { ArrowDown, Radio, Globe, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export const HeroHorizon = ({ t }: { t: any }) => {
    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none h-full w-full">
            
            {/* THE HORIZON LINE */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"></div>
            
            {/* Top Half: Content */}
            <div className="flex-1 w-full flex flex-col justify-end items-center pb-8 z-20 pointer-events-auto">
                <div className="text-center animate-in fade-in slide-in-from-top-10 duration-1000">
                    <div className="mb-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Lacivert Technology
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-2 font-heading">
                        {t('home.hero_title_main')}
                    </h1>
                    
                    <p className="text-sm md:text-base text-slate-400 font-light tracking-wide max-w-lg mx-auto mb-8">
                        {t('home.hero_desc')}
                    </p>

                    <div className="flex items-center justify-center gap-6">
                        <Button asChild variant="ghost" className="text-white hover:text-cyan-400 hover:bg-transparent p-0 font-light tracking-widest text-xs group">
                            <Link href="/it-hizmetleri">
                                <span className="border-b border-white/30 pb-1 group-hover:border-cyan-400 transition-colors">DISCOVER</span>
                            </Link>
                        </Button>
                        <div className="w-px h-4 bg-white/20"></div>
                        <Button asChild variant="ghost" className="text-white hover:text-cyan-400 hover:bg-transparent p-0 font-light tracking-widest text-xs group">
                            <Link href="/iletisim">
                                <span className="border-b border-white/30 pb-1 group-hover:border-cyan-400 transition-colors">CONTACT</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Half: Minimal Metrics */}
            <div className="flex-1 w-full flex flex-col justify-start items-center pt-12 z-20 pointer-events-auto bg-gradient-to-b from-cyan-950/10 to-transparent">
                 <div className="grid grid-cols-3 gap-12 md:gap-24 text-center opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <Globe className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-[10px] tracking-widest text-slate-500 uppercase">Global</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <Radio className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-[10px] tracking-widest text-slate-500 uppercase">Starlink</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <Shield className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-[10px] tracking-widest text-slate-500 uppercase">Secure</span>
                    </div>
                 </div>
                 
                 <div className="mt-auto mb-8 animate-bounce">
                    <ArrowDown className="w-4 h-4 text-white/20" />
                 </div>
            </div>

        </div>
    );
}

export default HeroHorizon;