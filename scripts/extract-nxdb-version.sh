#!/bin/bash
set -e

NXDB_VERSION=$(cat ../package.json \
  | grep '"nxdb":' \
  | tail -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed -e 's/^[[:space:]]*//'
)
