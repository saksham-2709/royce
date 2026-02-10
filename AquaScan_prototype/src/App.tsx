import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DatasetUpload from "./components/DatasetUpload";
import AnalysisOptions from "./components/AnalysisOptions";
import SamplesPage from "./components/Samples";
import MapPage from "./components/Map";
import ExportPage from "./components/Export";
import PremiumPage from "./components/Premium";

// ✅ import your context provider
import { DatasetProvider } from "./context/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* ✅ wrap with DatasetProvider */}
      <DatasetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<DatasetUpload />} />

            {/* Nested routes for Analysis */}
            <Route path="/analysis" element={<AnalysisOptions />}>
              <Route index element={<Navigate to="samples" replace />} />
              <Route path="samples" element={<SamplesPage />} />
              <Route path="map" element={<MapPage />} />
              <Route path="export" element={<ExportPage />} />
              <Route path="premium" element={<PremiumPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DatasetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
