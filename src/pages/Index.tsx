
import { Button } from "@/components/ui/button";
import { Trophy, Code, Drum } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center gap-8 py-16">
      <div className="space-y-4 max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Compete in LeetCode Challenges with Friends
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Create contests, track progress, and challenge your friends to solve
          LeetCode problems. The stakes? The loser faces a forfeit!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button asChild size="lg" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Link to="/contests/new">Create Contest</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <Link to="/contests">View Contests</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <FeatureCard
          icon={Code}
          title="Track Progress"
          description="Monitor your LeetCode solving journey and see who's leading the pack"
        />
        <FeatureCard
          icon={Trophy}
          title="Compete"
          description="Create custom contests and compete with friends in solving LeetCode problems"
        />
        <FeatureCard
          icon={Drum}
          title="Set Stakes"
          description="Add excitement with friendly forfeits for the participants who fall behind"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in">
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center gap-2 justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 px-2 text-md">{description}</p>
  </div>
);

export default Index;
