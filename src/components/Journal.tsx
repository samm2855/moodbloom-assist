import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, BookOpen, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalProps {
  onBack: () => void;
}

const Journal = ({ onBack }: JournalProps) => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [entries, setEntries] = useState<Array<{
    id: string;
    content: string;
    date: string;
    timestamp: number;
  }>>([
    {
      id: "1",
      content: "Today was a good day. I felt more relaxed after using the breathing exercise in the morning. It really helped me focus during my study session.",
      date: "Yesterday",
      timestamp: Date.now() - 86400000
    },
    {
      id: "2", 
      content: "Feeling a bit anxious about the upcoming exam, but I'm trying to stay positive. The meditation timer helped me center myself before bed.",
      date: "3 days ago",
      timestamp: Date.now() - 259200000
    }
  ]);
  const { toast } = useToast();

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something in your journal entry.",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      date: "Today",
      timestamp: Date.now()
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry("");

    toast({
      title: "Journal entry saved! 📝",
      description: "Your thoughts have been safely recorded.",
    });
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

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
          <h1 className="text-2xl font-bold text-foreground">Personal Journal</h1>
          <p className="text-muted-foreground">Express your thoughts and feelings</p>
        </div>
      </div>

      {/* New Entry */}
      <Card className="wellness-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">New Entry</h3>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <Textarea
          placeholder="How are you feeling today? What's on your mind? Write freely and without judgment..."
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          className="min-h-32 resize-none border-border/50 focus:border-primary mb-4"
        />

        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {currentEntry.length} characters • Your entries are private and secure
          </p>
          <Button
            variant="wellness"
            onClick={handleSaveEntry}
            disabled={!currentEntry.trim()}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Entry
          </Button>
        </div>
      </Card>

      {/* Past Entries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Past Entries</h2>
          <Button
            variant="floating"
            size="sm"
            onClick={() => {
              toast({
                title: "Search coming soon! 🔍",
                description: "You'll be able to search through your journal entries in the next update.",
              });
            }}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {entries.length === 0 ? (
          <Card className="wellness-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No entries yet</h3>
            <p className="text-muted-foreground">
              Start journaling to track your thoughts and feelings over time.
            </p>
          </Card>
        ) : (
          entries.map((entry, index) => (
            <Card 
              key={entry.id} 
              className="wellness-card-hover p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">📖</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Journal Entry</h4>
                    <span className="text-sm text-muted-foreground">
                      {getTimeAgo(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Tips */}
      <Card className="wellness-card-floating p-6 mt-8 bg-gradient-accent">
        <div className="text-center">
          <h3 className="font-semibold mb-3 text-accent-foreground">💡 Journaling Tips</h3>
          <div className="space-y-2 text-sm text-accent-foreground">
            <p>• Write without editing or judging yourself</p>
            <p>• Focus on your feelings, not just events</p>
            <p>• Try to journal regularly, even if it's just a few sentences</p>
            <p>• Be honest and authentic with yourself</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Journal;