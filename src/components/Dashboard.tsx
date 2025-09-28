import React, { useState, useEffect } from "react";
import { Heart, Brain, BookOpen, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import wellnessBackground from "@/assets/wellness-background.jpg";

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const motivationalQuotes = [
    {
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins"
    },
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Anonymous"
    },
    {
      text: "Progress, not perfection. Every small step counts.",
      author: "Anonymous"
    },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Logout Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged Out",
          description: "You've been successfully logged out.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Logout Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      id: "mood",
      title: "Track Mood",
      description: "Log how you're feeling today",
      icon: Heart,
      color: "wellness",
      emoji: "💖"
    },
    {
      id: "relax",
      title: "Relax & Breathe",
      description: "Find your calm with guided exercises",
      icon: Brain,
      color: "calm",
      emoji: "🧘‍♀️"
    },
    {
      id: "journal",
      title: "Journal",
      description: "Express your thoughts freely",
      icon: BookOpen,
      color: "mood",
      emoji: "✍️"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wellnessBackground})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-calm opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 p-6 pt-20 pb-32">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-glow" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MindMate
              </h1>
              <Sparkles className="w-8 h-8 text-secondary animate-glow" />
            </div>
            <p className="text-lg text-muted-foreground font-medium">
              Your Personal Wellness Companion
            </p>
          </div>
          
          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-medium text-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Daily Quote */}
        <Card className="wellness-card-floating mb-8 p-6 text-center animate-scale-in">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center floating">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Daily Inspiration
          </h3>
          <blockquote className="text-base text-foreground mb-2 italic leading-relaxed">
            "{motivationalQuotes[currentQuote].text}"
          </blockquote>
          <cite className="text-sm text-muted-foreground font-medium">
            — {motivationalQuotes[currentQuote].author}
          </cite>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center mb-6 text-shadow-soft">
            How are you feeling today?
          </h2>
          
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id} 
                className="wellness-card-hover p-6 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onViewChange(action.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center floating-delayed">
                      <span className="text-2xl">{action.emoji}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Encouragement */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-muted-foreground font-medium">
            Remember: Taking care of your mental health is not selfish. 
            <br />
            <span className="text-primary font-semibold">You matter. You are enough. 💙</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;