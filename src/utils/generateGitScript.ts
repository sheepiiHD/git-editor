import { ContributionData } from '../components/ContributionGraph';

export function generateGitScript(data: ContributionData): string {
  const entries = Object.entries(data)
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => (a < b ? -1 : 1));

  if (entries.length === 0) {
    return '# No commits selected.';
  }

  const lines: string[] = [];

  lines.push('#!/usr/bin/env bash');
  lines.push('# Run inside the target git repository');
  lines.push('');
  lines.push('# Initialise repository if this folder is not already a git repo');
  lines.push('git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init');
  lines.push('');
  lines.push('# Ensure there is at least one commit so the tag has something to point at');
  lines.push("if ! git rev-parse --verify HEAD >/dev/null 2>&1; then");
  lines.push('  git commit --allow-empty -m "chore: baseline before fake contributions"');
  lines.push('fi');
  lines.push('');
  lines.push('# Tag current HEAD so we can reset later');
  lines.push('git tag -f before-fake-contrib');
  lines.push('');

  for (const [date, count] of entries) {
    lines.push(`# ${date}`);
    lines.push(`for i in $(seq 1 ${count}); do`);
    lines.push('  hour=$(printf "%02d" $((RANDOM % 24)))');
    lines.push('  min=$(printf "%02d" $((RANDOM % 60)))');
    lines.push('  sec=$(printf "%02d" $((RANDOM % 60)))');
    lines.push('  timestamp="$hour:$min:$sec"');
    lines.push(`  GIT_AUTHOR_DATE="${date}T$timestamp" GIT_COMMITTER_DATE="${date}T$timestamp" git commit --allow-empty -m "feat: backfill commit $i on ${date}"`);
    lines.push('done');
    lines.push('');
  }

  return lines.join('\n');
} 