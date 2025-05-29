import { formatISO, subDays } from 'date-fns';

export type ContributionData = Record<string, number>;

export function generateRandomContributions(totalDays: number = 365): ContributionData {
  const today = new Date();
  const data: ContributionData = {};

  for (let i = 0; i < totalDays; i++) {
    const date = subDays(today, i);
    const key = formatISO(date, { representation: 'date' }); // YYYY-MM-DD
    data[key] = Math.floor(Math.random() * 40); // random 0-39
  }

  return data;
} 