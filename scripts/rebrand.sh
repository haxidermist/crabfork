#!/usr/bin/env bash
set -euo pipefail

# Rebrand openclaw → crabfork
# Run from repo root: bash scripts/rebrand.sh
#
# Replacements (order matters — most specific first):
#   @openclaw/  → @crabfork/
#   OpenClaw    → Crabfork
#   OPENCLAW_   → CRABFORK_
#   OPENCLAW    → CRABFORK
#   openclaw    → crabfork
#
# Skips: node_modules, dist, pnpm-lock.yaml, .git, binary files, this script

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "=== Crabfork Rebrand ==="
echo "Working in: $REPO_ROOT"

# File extensions to process
EXTENSIONS=(
  ts js mjs cjs jsx tsx
  json json5 jsonl
  md mdx txt
  sh bash zsh ps1
  yml yaml toml
  html css scss
  swift kt kts gradle
  plist xml
  env env.example
  cfg conf ini
  mts cts
  Makefile Dockerfile
)

# Build find expression for extensions
FIND_ARGS=()
first=true
for ext in "${EXTENSIONS[@]}"; do
  if $first; then
    FIND_ARGS+=( "(" "-name" "*.$ext" )
    first=false
  else
    FIND_ARGS+=( "-o" "-name" "*.$ext" )
  fi
done
# Also match extensionless files like Makefile, Dockerfile
FIND_ARGS+=( "-o" "-name" "Makefile" "-o" "-name" "Dockerfile*" ")" )

# Directories to skip
PRUNE_DIRS=(
  node_modules dist .git .turbo .next .cache
  build target out vendor/bundle
)
PRUNE_EXPR=()
for d in "${PRUNE_DIRS[@]}"; do
  PRUNE_EXPR+=( "-path" "./$d" "-prune" "-o" )
done

echo ""
echo "Finding files..."

# Count first
FILE_COUNT=$(find . "${PRUNE_EXPR[@]}" "${FIND_ARGS[@]}" -print 2>/dev/null | \
  grep -v "pnpm-lock.yaml" | \
  grep -v "scripts/rebrand.sh" | \
  wc -l | tr -d ' ')
echo "Found $FILE_COUNT candidate files"

echo ""
echo "Applying replacements..."

CHANGED=0

find . "${PRUNE_EXPR[@]}" "${FIND_ARGS[@]}" -print 2>/dev/null | \
  grep -v "pnpm-lock.yaml" | \
  grep -v "scripts/rebrand.sh" | \
while IFS= read -r file; do
  # Skip if file doesn't contain any openclaw reference (case insensitive)
  if ! grep -qil "openclaw" "$file" 2>/dev/null; then
    continue
  fi

  # Apply replacements in order (most specific first)
  # Using perl for reliability across platforms
  perl -pi -e '
    s/\@openclaw\//\@crabfork\//g;
    s/OpenClaw/Crabfork/g;
    s/OPENCLAW_/CRABFORK_/g;
    s/OPENCLAW/CRABFORK/g;
    s/openclaw/crabfork/g;
  ' "$file"

  CHANGED=$((CHANGED + 1))
done

echo ""
echo "=== Rebrand complete ==="
echo ""
echo "Next steps:"
echo "  1. Rename openclaw.mjs → crabfork.mjs"
echo "  2. Update pnpm-lock.yaml (pnpm install)"
echo "  3. Check build: pnpm build"
echo "  4. Rename any openclaw-named directories if needed"
