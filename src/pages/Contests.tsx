import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Trophy, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Contest } from "@/types/database.types";
import { useAuth } from "@/hooks/useAuth";

const Contests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedContestId, setJoinedContestId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const { data, error } = await supabase
          .from('contests')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setContests(data || []);
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchJoinedContest = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('contest_participants')
          .select('contest_id')
          .eq('user_id', user.id)
          .single();
        if (!error && data) {
          setJoinedContestId(data.contest_id);
        } else {
          setJoinedContestId(null);
        }
      } catch (error) {
        console.error('Error fetching joined contest:', error);
      }
    };

    fetchContests();
    fetchJoinedContest();
  }, [user]);

  const leaveContest = async (contestId: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('contest_participants')
        .delete()
        .eq('contest_id', contestId)
        .eq('user_id', user.id);
      if (error) throw error;
      // Remove the joined contest id from state
      setJoinedContestId(null);
    } catch (error) {
      console.error('Error leaving contest: ', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Active Contests</h1>
          <p className="text-gray-600 mt-2">Join or track ongoing coding competitions</p>
        </div>
        <div className="flex gap-4">
          {joinedContestId && (
            <Button 
              variant="destructive" 
              onClick={() => leaveContest(joinedContestId)}
            >
              Leave Contest
            </Button>
          )}
          <Button asChild>
            <Link to="/contests/new">Create Contest</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <Link key={contest.id} to={`/contests/${contest.id}`}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  {contest.title}
                </CardTitle>
                <CardDescription>
                  <span className={`capitalize ${contest.status === "active" ? "text-green-600" : "text-gray-600"}`}>
                    {contest.status}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {contest.max_participants} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {contest.duration_days} days
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