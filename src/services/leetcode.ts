
import axios from "axios";

interface LeetCodeUserStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: string;
}

const LEETCODE_API_URL = "https://leetcode-stats-api.herokuapp.com";

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeUserStats> => {
  const response = await axios.get(`${LEETCODE_API_URL}/${username}`);
  return response.data;
};
