
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  score: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const LeaderboardTable = ({ entries }: LeaderboardTableProps) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="w-5 h-5 text-primary" />
          Detailed Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead className="text-right">Easy</TableHead>
              <TableHead className="text-right">Medium</TableHead>
              <TableHead className="text-right">Hard</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.username}>
                <TableCell className={`font-medium ${getRankColor(entry.rank)}`}>
                  #{entry.rank}
                </TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell className="text-right text-[#00B8A3]">
                  {entry.easySolved}
                </TableCell>
                <TableCell className="text-right text-[#FFC01E]">
                  {entry.mediumSolved}
                </TableCell>
                <TableCell className="text-right text-[#FF375F]">
                  {entry.hardSolved}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {entry.totalSolved}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {entry.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
