
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Oferta from "./pages/Oferta";
import Privacy from "./pages/Privacy";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import Admin from "./pages/Admin";
import QuickLink from "./pages/QuickLink";
import CookieBanner from "./components/camp/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/zabronirovat" element={<QuickLink target="tseny" />} />
          <Route path="/kviz" element={<QuickLink target="kviz" />} />
          <Route path="/zvonok" element={<QuickLink target="call" />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-fail" element={<PaymentFail />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;