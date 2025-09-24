import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MoodTracker from "./components/MoodTracker";
import RelaxationTools from "./components/RelaxationTools";
import Journal from "./components/Journal";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderCurrentView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard onViewChange={setActiveView} />;
      case "mood":
        return <MoodTracker onBack={() => setActiveView("dashboard")} />;
      case "relax":
        return <RelaxationTools onBack={() => setActiveView("dashboard")} />;
      case "journal":
        return <Journal onBack={() => setActiveView("dashboard")} />;
      case "profile":
        // Profile component would go here - for now redirect to dashboard
        return <Dashboard onViewChange={setActiveView} />;
      default:
        return <Dashboard onViewChange={setActiveView} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className="relative">
                {renderCurrentView()}
                <Navigation activeView={activeView} onViewChange={setActiveView} />
              </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
