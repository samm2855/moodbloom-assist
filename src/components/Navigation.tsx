import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Music, BookOpen, User, Home } from "lucide-react";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "mood", label: "Mood", icon: Heart },
    { id: "relax", label: "Relax", icon: Brain },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-wellness rounded-full px-6 py-3 border border-border/50 shadow-[var(--shadow-floating)]">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "wellness" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={`
                  relative transition-all duration-300 ease-in-out
                  ${isActive 
                    ? "scale-110 shadow-[var(--shadow-glow)]" 
                    : "hover:scale-105"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <span className="text-xs font-medium ml-1">{item.label}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;