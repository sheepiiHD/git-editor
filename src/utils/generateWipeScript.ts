export function generateWipeScript(): string {
  return `#!/usr/bin/env bash
# DANGER: Permanently remove all commits in current branch and leave a single empty commit.
# Useful for cleaning fake contribution history. Force-push will overwrite remote history.

set -e

CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

# Create orphan branch with no history
ORPHAN=clean-history-temp

git checkout --orphan $ORPHAN
# Remove all tracked files from index. Leave working tree intact.
git rm -rf --cached .
# (Optional) Remove working tree files as well: rm -rf *

git commit --allow-empty -m "chore: clean branch history"

# Delete old branch and rename orphan to original
git branch -D $CURRENT_BRANCH
git branch -m $CURRENT_BRANCH

echo "History wiped. If this repo is linked to a remote, run: git push -f origin $CURRENT_BRANCH"
`;
} 