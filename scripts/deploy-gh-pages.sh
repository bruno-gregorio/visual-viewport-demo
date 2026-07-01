#!/usr/bin/env bash
#
# Deploy the demo app to GitHub Pages using the branch strategy.
#
# Builds apps/visual-viewport-demo, then publishes the built `dist/` to the
# `gh-pages` branch (as its full, orphaned contents) and pushes it to origin.
# GitHub Pages should be configured to serve from the `gh-pages` branch, root.
#
# Usage: bun run deploy   (or: ./scripts/deploy-gh-pages.sh)

set -euo pipefail

BRANCH="gh-pages"
REMOTE="origin"
DIST_DIR="apps/visual-viewport-demo/dist"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "==> Building the demo"
bun install
bun run build:demo

if [ ! -d "$DIST_DIR" ]; then
  echo "error: build output not found at $DIST_DIR" >&2
  exit 1
fi

# GitHub Pages helpers:
#   - .nojekyll   -> serve files/dirs starting with "_" and skip Jekyll
#   - 404.html    -> SPA fallback so client-side routes resolve on refresh
touch "$DIST_DIR/.nojekyll"
cp "$DIST_DIR/index.html" "$DIST_DIR/404.html"

WORKTREE_DIR="$(mktemp -d)"
cleanup() {
  git worktree remove --force "$WORKTREE_DIR" 2>/dev/null || true
  rm -rf "$WORKTREE_DIR"
}
trap cleanup EXIT

echo "==> Preparing '$BRANCH' worktree"
git worktree prune
git fetch "$REMOTE" "$BRANCH" 2>/dev/null || true

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git worktree add "$WORKTREE_DIR" "$BRANCH"
elif git show-ref --verify --quiet "refs/remotes/$REMOTE/$BRANCH"; then
  git worktree add "$WORKTREE_DIR" -b "$BRANCH" "$REMOTE/$BRANCH"
else
  # First deploy: start the branch with no history.
  git worktree add --detach "$WORKTREE_DIR"
  git -C "$WORKTREE_DIR" checkout --orphan "$BRANCH"
fi

echo "==> Syncing build output"
# Replace everything tracked in the worktree (keep its .git file/dir).
find "$WORKTREE_DIR" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R "$DIST_DIR"/. "$WORKTREE_DIR"/

COMMIT_SHA="$(git rev-parse --short HEAD)"
cd "$WORKTREE_DIR"
git add --all
if git diff --cached --quiet; then
  echo "==> No changes to publish"
else
  git commit -m "deploy: ${COMMIT_SHA}"
  git push "$REMOTE" "HEAD:$BRANCH"
  echo "==> Published to '$BRANCH'"
fi
