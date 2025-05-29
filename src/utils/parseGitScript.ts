import { ContributionData } from '../components/ContributionGraph';

export function parseGitScript(script: string): ContributionData {
  const data: ContributionData = {};
  const dateLineRegex = /^#\s*(\d{4}-\d{2}-\d{2})/;
  const forLineRegex = /for\s+i\s+in\s+\{1\.\.(\d+)\}/;

  let currentDate: string | null = null;

  script.split(/\r?\n/).forEach(line => {
    const dateMatch = line.match(dateLineRegex);
    if (dateMatch) {
      currentDate = dateMatch[1];
      return;
    }

    if (currentDate) {
      const forMatch = line.match(forLineRegex);
      if (forMatch) {
        const count = parseInt(forMatch[1], 10);
        if (!isNaN(count)) {
          data[currentDate] = count;
        }
        currentDate = null; // reset until next date block
      }
    }
  });

  return data;
} 