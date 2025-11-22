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
import ServicesStarlink from "@/pages/ServicesStarlink";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/hakkimizda" component={About} />
        <Route path="/it-hizmetleri" component={ServicesIT} />
        <Route path="/siber-guvenlik" component={ServicesSecurity} />
        <Route path="/starlink" component={ServicesStarlink} />
        <Route path="/iletisim" component={Contact} />
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
