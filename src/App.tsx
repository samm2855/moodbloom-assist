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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./components/auth/AuthPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <div className="wellness-card p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onBack={() => {}} />;
  }

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
        return <Dashboard onViewChange={setActiveView} />;
      default:
        return <Dashboard onViewChange={setActiveView} />;
    }
  };

  return (
    <div className="relative">
      {renderCurrentView()}
      <Navigation activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
