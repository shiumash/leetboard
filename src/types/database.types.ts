export interface Profile {
  id: string;
  username: string;
  leetcode_username: string | null;
  created_at: string;
  updated_at: string;
}

import { PostgrestError } from '@supabase/supabase-js'

export interface Contest {
  id: string
  title: string
  description: string | null
  duration_days: number
  max_participants: number
  forfeit: string | null
  status: 'active' | 'completed'
  owner_id: string  // Changed from created_by to match DB
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export type ContestError = PostgrestError | null

export type ContestResponse = {
  data: Contest | null
  error: PostgrestError | null
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
