
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Contests = () => {
  // This will be replaced with real data later
  const mockContests = [
    {
      id: uuidv4(),
      title: "Weekly Algorithm Challenge",
      participants: 4,
      duration: "7 days",
      status: "active",
    },
    {
      id: uuidv4(),
      title: "Weekend Sprint",
      participants: 3,
      duration: "2 days",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Active Contests</h1>
          <p className="text-gray-600 mt-2">Join or track ongoing coding competitions</p>
        </div>
        <Button asChild>
          <Link to="/contests/new">Create Contest</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContests.map((contest) => (
          <Link key={contest.id} to={`/contests/${contest.id}`}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  {contest.title}
                </CardTitle>
                <CardDescription>
                  <span className={`capitalize ${
                    contest.status === "active" ? "text-green-600" : "text-gray-600"
                  }`}>
                    {contest.status}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {contest.participants} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {contest.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contests;
