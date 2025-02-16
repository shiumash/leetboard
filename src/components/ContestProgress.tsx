
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContestParticipant } from '@/types/database.types';

interface ContestProgressProps {
  data: {
    name: string;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
  }[];
}

const ContestProgress = ({ data }: ContestProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem Difficulty Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="easySolved" name="Easy" fill="#00B8A3" stackId="a" />
              <Bar dataKey="mediumSolved" name="Medium" fill="#FFC01E" stackId="a" />
              <Bar dataKey="hardSolved" name="Hard" fill="#FF375F" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContestProgress;
