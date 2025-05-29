export function generateResetScript(): string {
  return `#!/usr/bin/env bash
# Reset repository to state before fake contribution commits

if git rev-parse --verify before-fake-contrib >/dev/null 2>&1; then
  echo "Resetting to tag 'before-fake-contrib'…"
  git reset --hard before-fake-contrib
  git tag -d before-fake-contrib
  echo "Done. Repository history restored."
else
  echo "Tag 'before-fake-contrib' not found. Unable to reset."
  exit 1
fi
`;
} 