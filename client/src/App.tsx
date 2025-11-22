import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ServicesIT from "@/pages/ServicesIT";
import ServicesSecurity from "@/pages/ServicesSecurity";
import ServicesSpace from "@/pages/ServicesSpace";
import ServicesLand from "@/pages/ServicesLand";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import ScrollToTop from "@/components/ScrollToTop";

import InnovationPage from "@/pages/Innovation";

// Sub-service pages
import StarlinkPage from "@/pages/services/space/Starlink";
import OneWebPage from "@/pages/services/space/OneWeb";
import IridiumPage from "@/pages/services/space/Iridium";
import PeplinkPage from "@/pages/services/land/Peplink";
import TeltonikaPage from "@/pages/services/land/Teltonika";

function Router() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/hakkimizda" component={About} />
        <Route path="/inovasyon" component={InnovationPage} />
        <Route path="/it-hizmetleri" component={ServicesIT} />
        <Route path="/siber-guvenlik" component={ServicesSecurity} />
        <Route path="/uzay-haberlesmesi" component={ServicesSpace} />
        <Route path="/kara-haberlesmesi" component={ServicesLand} />
        
        {/* Space Sub-services */}
        <Route path="/uzay-haberlesmesi/starlink" component={StarlinkPage} />
        <Route path="/uzay-haberlesmesi/oneweb" component={OneWebPage} />
        <Route path="/uzay-haberlesmesi/iridium" component={IridiumPage} />

        {/* Land Sub-services */}
        <Route path="/kara-haberlesmesi/peplink" component={PeplinkPage} />
        <Route path="/kara-haberlesmesi/teltonika" component={TeltonikaPage} />

        <Route path="/iletisim" component={Contact} />
        <Route path="/gizlilik-politikasi" component={PrivacyPolicy} />
        <Route path="/kullanim-sartlari" component={TermsOfUse} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
