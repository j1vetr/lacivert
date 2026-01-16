import React from 'react';
import { ArrowDown, Satellite, Wifi, Globe, ShieldCheck, Anchor } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export const HeroHorizon = ({ t }: { t: any }) => {
    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none h-full w-full">
            
            {/* THE HORIZON LINE */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"></div>
            
            {/* Top Half: Content */}
            <div className="flex-1 w-full flex flex-col justify-end items-center pb-12 z-20 pointer-events-auto">
                <div className="text-center animate-in fade-in slide-in-from-top-10 duration-1000 px-4">
                    
                    <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-4 font-heading drop-shadow-2xl">
                        Denizlerde <span className="font-bold text-cyan-400">Kesintisiz</span> Bağlantı
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-300 font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
                        Starlink Maritime, Eutelsat OneWeb ve Iridium Certus ile gemileriniz için yüksek hızlı internet ve siber güvenlik çözümleri.
                    </p>

                    <div className="flex items-center justify-center gap-8">
                        <Button asChild className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 h-12 rounded-full font-medium tracking-wide shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all hover:scale-105">
                            <Link href="/it-hizmetleri">
                                HİZMETLERİMİZ
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 h-12 rounded-full font-medium tracking-wide backdrop-blur-sm transition-all hover:scale-105">
                            <Link href="/iletisim">
                                İLETİŞİM
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Half: Service Focus */}
            <div className="flex-1 w-full flex flex-col justify-start items-center pt-16 z-20 pointer-events-auto bg-gradient-to-b from-cyan-950/20 to-transparent">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-5xl w-full px-4">
                    
                    {/* Service 1 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-sm hover:bg-slate-950/60 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer">
                        <div className="p-3 rounded-full bg-slate-900 group-hover:bg-cyan-950/50 transition-colors">
                            <Satellite className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-white tracking-wider mb-1 group-hover:text-cyan-300 transition-colors">STARLINK MARITIME</div>
                            <div className="text-[10px] text-slate-500 group-hover:text-slate-400 uppercase tracking-widest">LEO Uydu İnterneti</div>
                        </div>
                    </div>

                    {/* Service 2 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-sm hover:bg-slate-950/60 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer">
                        <div className="p-3 rounded-full bg-slate-900 group-hover:bg-blue-950/50 transition-colors">
                            <Globe className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-white tracking-wider mb-1 group-hover:text-blue-300 transition-colors">EUTELSAT ONEWEB</div>
                            <div className="text-[10px] text-slate-500 group-hover:text-slate-400 uppercase tracking-widest">Global Kapsama</div>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-sm hover:bg-slate-950/60 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer">
                        <div className="p-3 rounded-full bg-slate-900 group-hover:bg-emerald-950/50 transition-colors">
                            <ShieldCheck className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-white tracking-wider mb-1 group-hover:text-emerald-300 transition-colors">CYBER SECURITY</div>
                            <div className="text-[10px] text-slate-500 group-hover:text-slate-400 uppercase tracking-widest">Firewall & Koruma</div>
                        </div>
                    </div>

                 </div>
                 
                 <div className="mt-auto mb-8 animate-bounce">
                    <ArrowDown className="w-5 h-5 text-cyan-500/50" />
                 </div>
            </div>

        </div>
    );
}

export default HeroHorizon;