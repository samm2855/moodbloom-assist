import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RelaxationToolsProps {
  onBack: () => void;
}

const RelaxationTools = ({ onBack }: RelaxationToolsProps) => {
  const [activeView, setActiveView] = useState<"main" | "breathing" | "meditation">("main");
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingCycle, setBreathingCycle] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale");
  const [meditationTime, setMeditationTime] = useState(300); // 5 minutes default
  const [meditationActive, setMeditationActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(meditationTime);
  const { toast } = useToast();

  // Breathing exercise logic
  useEffect(() => {
    if (!isBreathing) return;

    const breathingPattern = {
      inhale: 4000,  // 4 seconds
      hold: 2000,    // 2 seconds
      exhale: 6000,  // 6 seconds
      pause: 1000,   // 1 second
    };

    const interval = setInterval(() => {
      setBreathingCycle(current => {
        switch (current) {
          case "inhale": return "hold";
          case "hold": return "exhale";
          case "exhale": return "pause";
          case "pause": return "inhale";
          default: return "inhale";
        }
      });
    }, breathingPattern[breathingCycle]);

    return () => clearInterval(interval);
  }, [isBreathing, breathingCycle]);

  // Meditation timer logic
  useEffect(() => {
    if (!meditationActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setMeditationActive(false);
          toast({
            title: "Meditation Complete! 🧘‍♀️",
            description: "Great job taking time for yourself. How do you feel?",
          });
          return meditationTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [meditationActive, timeLeft, meditationTime, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingCycle) {
      case "inhale": return "Breathe In...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe Out...";
      case "pause": return "Pause...";
    }
  };

  const getBreathingCircleSize = () => {
    switch (breathingCycle) {
      case "inhale": return "scale-150";
      case "hold": return "scale-150";
      case "exhale": return "scale-100";
      case "pause": return "scale-100";
    }
  };

  if (activeView === "breathing") {
    return (
      <div className="min-h-screen bg-gradient-calm p-6 pt-20 pb-32">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="floating"
            size="icon"
            onClick={() => setActiveView("main")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Breathing Exercise</h1>
            <p className="text-muted-foreground">4-2-6-1 breathing pattern</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center">
            <div 
              className={`
                w-64 h-64 rounded-full transition-all duration-1000 ease-in-out
                bg-gradient-radial from-primary-glow/30 via-secondary/20 to-transparent
                ${getBreathingCircleSize()}
                ${isBreathing ? 'animate-breathe' : ''}
              `}
            >
              <div className="absolute inset-8 rounded-full bg-gradient-primary/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🫁</div>
                  <p className="text-lg font-semibold text-primary">
                    {isBreathing ? getBreathingInstruction() : "Ready to breathe?"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <Card className="wellness-card p-6 text-center max-w-md">
            <h3 className="font-semibold mb-3">4-2-6-1 Breathing</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Inhale for 4 seconds</p>
              <p>• Hold for 2 seconds</p>
              <p>• Exhale for 6 seconds</p>
              <p>• Pause for 1 second</p>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              variant={isBreathing ? "destructive" : "wellness"}
              size="xl"
              onClick={() => {
                setIsBreathing(!isBreathing);
                if (!isBreathing) {
                  setBreathingCycle("inhale");
                }
              }}
            >
              {isBreathing ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Breathing
                </>
              )}
            </Button>

            <Button
              variant="floating"
              size="xl"
              onClick={() => {
                setIsBreathing(false);
                setBreathingCycle("inhale");
              }}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === "meditation") {
    return (
      <div className="min-h-screen bg-gradient-calm p-6 pt-20 pb-32">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="floating"
            size="icon"
            onClick={() => setActiveView("main")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Meditation Timer</h1>
            <p className="text-muted-foreground">Find your inner peace</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Timer Display */}
          <div className="relative">
            <div className="w-64 h-64 rounded-full bg-gradient-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">🧘‍♀️</div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-muted-foreground">
                  {meditationActive ? "Meditating..." : "Ready to meditate"}
                </p>
              </div>
            </div>
          </div>

          {/* Time Selection */}
          {!meditationActive && (
            <Card className="wellness-card p-6">
              <h3 className="font-semibold mb-4 text-center">Choose Duration</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "3 min", value: 180 },
                  { label: "5 min", value: 300 },
                  { label: "10 min", value: 600 },
                  { label: "15 min", value: 900 },
                  { label: "20 min", value: 1200 },
                  { label: "30 min", value: 1800 },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={meditationTime === option.value ? "wellness" : "floating"}
                    size="sm"
                    onClick={() => {
                      setMeditationTime(option.value);
                      setTimeLeft(option.value);
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </Card>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              variant={meditationActive ? "destructive" : "wellness"}
              size="xl"
              onClick={() => setMeditationActive(!meditationActive)}
            >
              {meditationActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Meditation
                </>
              )}
            </Button>

            <Button
              variant="floating"
              size="xl"
              onClick={() => {
                setMeditationActive(false);
                setTimeLeft(meditationTime);
              }}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm p-6 pt-20 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="floating"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relaxation Tools</h1>
          <p className="text-muted-foreground">Find your calm and peace</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card 
          className="wellness-card-hover p-6 cursor-pointer"
          onClick={() => setActiveView("breathing")}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center floating">
              <span className="text-2xl">🫁</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Breathing Exercise
              </h3>
              <p className="text-muted-foreground">
                Guided breathing with visual cues to reduce stress and anxiety
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="wellness-card-hover p-6 cursor-pointer"
          onClick={() => setActiveView("meditation")}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-secondary flex items-center justify-center floating-delayed">
              <Timer className="w-7 h-7 text-secondary-foreground" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Meditation Timer
              </h3>
              <p className="text-muted-foreground">
                Peaceful meditation sessions with customizable durations
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="wellness-card-hover p-6 cursor-pointer"
          onClick={() => {
            toast({
              title: "Coming Soon! 🎵",
              description: "Soothing sounds and nature audio will be available in the next update.",
            });
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center floating">
              <Volume2 className="w-7 h-7 text-accent-foreground" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Calming Sounds
              </h3>
              <p className="text-muted-foreground">
                Nature sounds, rain, ocean waves, and peaceful music
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="wellness-card-floating p-6 mt-8 bg-gradient-accent">
        <div className="text-center">
          <h3 className="font-semibold mb-3 text-accent-foreground">💡 Relaxation Tips</h3>
          <div className="space-y-2 text-sm text-accent-foreground">
            <p>• Find a quiet, comfortable space</p>
            <p>• Use headphones for better experience</p>
            <p>• Practice regularly for best results</p>
            <p>• Don't worry if your mind wanders - that's normal!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RelaxationTools;