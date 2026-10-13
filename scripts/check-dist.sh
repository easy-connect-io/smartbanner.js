#!/usr/bin/env bash
# Rebuilds and fails if the committed dist/ (or the generated src/smartbanner-styles.js) doesn't
# match what src/ builds to. Run by CI on every PR and by the deploy workflow before it uploads.
set -euo pipefail

npm run build

# The license banner carries the build year, so ignore that line.
if ! git diff --exit-code -I 'Copyright ©' -- dist src/smartbanner-styles.js; then
  echo "::error::dist/ doesn't match src/. Run npm run build and commit dist/."
  exit 1
fi
