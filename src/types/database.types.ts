
export interface Profile {
  id: string;
  username: string;
  leetcode_username: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string | null;
  duration_days: number;
  max_participants: number;
  forfeit: string | null;
  status: 'active' | 'completed';
  created_by: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface ContestParticipant {
  id: string;
  contest_id: string;
  user_id: string;
  joined_at: string;
}

export interface LeetCodeStats {
  id: string;
  user_id: string;
  total_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  acceptance_rate: number;
  ranking: number;
  contest_rating: number;
  snapshot_date: string;
}
