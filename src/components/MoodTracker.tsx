import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodTrackerProps {
  onBack: () => void;
}

const MoodTracker = ({ onBack }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const moods = [
    { id: "amazing", emoji: "🌟", label: "Amazing", color: "from-yellow-300 to-orange-300" },
    { id: "happy", emoji: "😊", label: "Happy", color: "from-green-300 to-teal-300" },
    { id: "okay", emoji: "😐", label: "Okay", color: "from-blue-300 to-cyan-300" },
    { id: "stressed", emoji: "😰", label: "Stressed", color: "from-orange-300 to-red-300" },
    { id: "anxious", emoji: "😟", label: "Anxious", color: "from-purple-300 to-pink-300" },
    { id: "sad", emoji: "😢", label: "Sad", color: "from-gray-400 to-blue-400" },
  ];

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today before saving.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a database
    toast({
      title: "Mood logged successfully! 💙",
      description: "Your mood has been recorded. Keep taking care of yourself!",
    });

    // Reset form
    setSelectedMood(null);
    setNote("");
  };

  const selectedMoodData = moods.find(m => m.id === selectedMood);

  return (
    <div className="min-h-screen bg-gradient-calm p-6 pt-20 pb-32">
      {/* Header */}
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
          <h1 className="text-2xl font-bold text-foreground">Mood Check-In</h1>
          <p className="text-muted-foreground">How are you feeling right now?</p>
        </div>
      </div>

      {/* Mood Selection */}
      <Card className="wellness-card p-6 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Your Mood</h2>
          <p className="text-muted-foreground text-sm">
            It's okay to not be okay. Every feeling is valid.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className={`
                mood-item p-4 rounded-lg border-2 cursor-pointer transition-all duration-300
                ${selectedMood === mood.id 
                  ? "border-primary shadow-[var(--shadow-glow)] scale-105 bg-gradient-to-r " + mood.color
                  : "border-border hover:border-primary/50 hover:scale-102"
                }
              `}
              onClick={() => setSelectedMood(mood.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-2 mood-emoji">{mood.emoji}</div>
                <p className={`font-medium ${selectedMood === mood.id ? "text-white" : "text-foreground"}`}>
                  {mood.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Mood Display */}
        {selectedMood && selectedMoodData && (
          <div className="text-center mb-4 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground">
              <span className="text-2xl">{selectedMoodData.emoji}</span>
              <span className="font-semibold">
                Feeling {selectedMoodData.label}
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Optional Note */}
      <Card className="wellness-card p-6 mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>💭</span>
          What's on your mind? (Optional)
        </h3>
        <Textarea
          placeholder="Share your thoughts, feelings, or what happened today..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-24 resize-none border-border/50 focus:border-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Your thoughts are safe and private. This can help you reflect on your day.
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="wellness"
          size="xl"
          onClick={handleSaveMood}
          className="w-full"
          disabled={!selectedMood}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Log My Mood
        </Button>

        <Button
          variant="floating"
          className="w-full"
          onClick={() => {
            toast({
              title: "Mood insights coming soon! 📊",
              description: "Track your moods daily to see patterns and trends.",
            });
          }}
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          View Mood Trends
        </Button>
      </div>

      {/* Encouragement */}
      <div className="text-center mt-8 animate-fade-in">
        <Card className="wellness-card-floating p-4 bg-gradient-accent">
          <p className="text-sm text-accent-foreground font-medium">
            🌱 Remember: Your mental health journey is unique. 
            <br />
            Be patient and kind to yourself. Every step forward counts!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;