
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from 'react';

const CreateContest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    participants: '',
    forfeit: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const now = new Date();
    const endDate = new Date(now.getTime() + parseInt(formData.duration) * 24 * 60 * 60 * 1000);

    const contestData = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      duration_days: parseInt(formData.duration),
      max_participants: parseInt(formData.participants),
      forfeit: formData.forfeit || null,
      status: 'active' as const,
      created_by: user?.id,
      start_date: now.toISOString(),
      end_date: endDate.toISOString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    }

    try {
      const { error } = await supabase
        .from('contests')
        .insert([contestData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contest created successfully!",
      });
      
      navigate('/contests');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create contest",
      });
    }
  };
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Contest</h1>
        <p className="text-gray-600 mt-2">Set up a new LeetCode competition</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Contest Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Contest Title</Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Weekly Algorithm Challenge" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your contest" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="forfeit">Forfeit</Label>
              <Input 
                id="forfeit"
                value={formData.forfeit}
                onChange={(e) => setFormData({...formData, forfeit: e.target.value})}
                placeholder="e.g., Buy coffee for the winner" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Days)</Label>
              <Select onValueChange={(value) => setFormData({...formData, duration: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="14">2 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Max Participants</Label>
              <Select onValueChange={(value) => setFormData({...formData, participants: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of participants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 participants</SelectItem>
                  <SelectItem value="3">3 participants</SelectItem>
                  <SelectItem value="4">4 participants</SelectItem>
                  <SelectItem value="5">5 participants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">Create Contest</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateContest;
