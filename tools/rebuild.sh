#!/bin/sh
# Reconstruit index.html : génération + application des retouches (index-overrides.patch)
set -e
cd "$(dirname "$0")"
node gen.js
node prod.js
patch -s ../index.html < index-overrides.patch
echo "index.html reconstruit."
