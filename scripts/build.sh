#!/usr/bin/env bash
set -euox pipefail

echo "Build starting"

# Generate the static site
rm -rf ./_site
bundle exec jekyll build

#bundle exec rake tests

echo "Build complete"
