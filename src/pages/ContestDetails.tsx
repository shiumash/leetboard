
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Clock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchLeetCodeStats } from "@/services/leetcode";
import ContestProgress from "@/components/ContestProgress";
import LeaderboardTable from "@/components/LeaderboardTable";
import { useToast } from "@/components/ui/use-toast";
import type { Contest, Profile, LeetCodeStats } from "@/types/database.types";

const ContestDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [contest, setContest] = useState<Contest | null>(null);
  const [participants, setParticipants] = useState<Profile[]>([]);
  const [stats, setStats] = useState<Record<string, LeetCodeStats>>({});

  // Fetch contest details
  useEffect(() => {
    const fetchContest = async () => {
      try {
        // Fetch contest details
        const contestResponse = await supabase
          .from('contests')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (contestResponse.error) throw contestResponse.error;
        if (!contestResponse.data) {
          toast({
            variant: "destructive",
            title: "Contest not found",
            description: "The requested contest could not be found.",
          });
          return;
        }

        setContest(contestResponse.data as Contest);

        // Fetch participants with their profiles
        const participantsResponse = await supabase
          .from('contest_participants')
          .select(`
            user_id,
            profiles!inner (
              id,
              username,
              leetcode_username,
              created_at,
              updated_at
            )
          `)
          .eq('contest_id', id);

        if (participantsResponse.error) throw participantsResponse.error;

        const profiles = participantsResponse.data.map(p => p.profiles) as Profile[];
        setParticipants(profiles);

        // Fetch LeetCode stats for each participant
        for (const profile of profiles) {
          if (profile.leetcode_username) {
            try {
              const leetcodeStats = await fetchLeetCodeStats(profile.leetcode_username);
              const statsEntry: LeetCodeStats = {
                id: crypto.randomUUID(),
                user_id: profile.id,
                total_solved: leetcodeStats.totalSolved,
                easy_solved: leetcodeStats.easySolved,
                medium_solved: leetcodeStats.mediumSolved,
                hard_solved: leetcodeStats.hardSolved,
                acceptance_rate: leetcodeStats.acceptanceRate,
                ranking: leetcodeStats.ranking,
                contest_rating: 0,
                snapshot_date: new Date().toISOString(),
              };
              setStats(prev => ({ ...prev, [profile.id]: statsEntry }));
            } catch (error) {
              console.error(`Error fetching LeetCode stats for ${profile.leetcode_username}:`, error);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: "Error fetching data",
          description: "There was an error fetching the contest data.",
        });
      }
    };

    if (id) {
      fetchContest();
    }
  }, [id, toast]);

  // Prepare data for visualization
  const chartData = participants.map(participant => ({
    name: participant.username,
    easySolved: stats[participant.id]?.easy_solved || 0,
    mediumSolved: stats[participant.id]?.medium_solved || 0,
    hardSolved: stats[participant.id]?.hard_solved || 0,
  }));

  // Prepare leaderboard data
  const leaderboardData = participants
    .map((participant, index) => {
      const userStats = stats[participant.id];
      if (!userStats) return null;

      // Calculate score: Easy(1) + Medium(3) + Hard(5)
      const score = 
        userStats.easy_solved + 
        userStats.medium_solved * 3 + 
        userStats.hard_solved * 5;

      return {
        rank: index + 1,
        username: participant.username,
        totalSolved: userStats.total_solved,
        easySolved: userStats.easy_solved,
        mediumSolved: userStats.medium_solved,
        hardSolved: userStats.hard_solved,
        score,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score)
    .map((entry, index) => ({ ...entry!, rank: index + 1 }));

  if (!contest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/contests">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{contest.title}</h1>
          <p className="text-gray-600 mt-1">Contest #{contest.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{participants.length}</div>
            <p className="text-gray-600">Active competitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contest.duration_days} days</div>
            <p className="text-gray-600">Until {new Date(contest.end_date).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{contest.status}</div>
            <p className="text-gray-600">Contest state</p>
          </CardContent>
        </Card>
      </div>

      <ContestProgress data={chartData} />
      <LeaderboardTable entries={leaderboardData} />
    </div>
  );
};

export default ContestDetails;
