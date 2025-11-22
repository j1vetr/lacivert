import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-slate-950 font-sans text-white">
      <SEO 
        title="404 - Sayfa Bulunamadı" 
        description="Aradığınız sayfa bulunamadı." 
      />
      
      <div className="mb-8 p-6 bg-slate-900/50 rounded-full border border-white/5 shadow-[0_0_50px_rgba(6,182,212,0.1)] animate-pulse">
        <AlertTriangle className="w-20 h-20 text-cyan-500" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter font-heading">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-medium text-slate-300 mb-6">
        {t('not_found.title') || "Sayfa Bulunamadı"}
      </h2>
      
      <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
        {t('not_found.desc') || "Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek devam edebilirsiniz."}
      </p>
      
      <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold h-14 px-10 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover:scale-105 border-0">
        <Link href="/">
          {t('not_found.btn_home') || "Ana Sayfaya Dön"}
        </Link>
      </Button>
    </div>
  );
}