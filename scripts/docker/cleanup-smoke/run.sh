#!/usr/bin/env bash
set -euo pipefail

cd /repo

export CRABFORK_STATE_DIR="/tmp/crabfork-test"
export CRABFORK_CONFIG_PATH="${CRABFORK_STATE_DIR}/crabfork.json"

echo "==> Build"
if ! pnpm build >/tmp/crabfork-cleanup-build.log 2>&1; then
  cat /tmp/crabfork-cleanup-build.log
  exit 1
fi

echo "==> Seed state"
mkdir -p "${CRABFORK_STATE_DIR}/credentials"
mkdir -p "${CRABFORK_STATE_DIR}/agents/main/sessions"
echo '{}' >"${CRABFORK_CONFIG_PATH}"
echo 'creds' >"${CRABFORK_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${CRABFORK_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
if ! pnpm crabfork reset --scope config+creds+sessions --yes --non-interactive >/tmp/crabfork-cleanup-reset.log 2>&1; then
  cat /tmp/crabfork-cleanup-reset.log
  exit 1
fi

test ! -f "${CRABFORK_CONFIG_PATH}"
test ! -d "${CRABFORK_STATE_DIR}/credentials"
test ! -d "${CRABFORK_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${CRABFORK_STATE_DIR}/credentials"
echo '{}' >"${CRABFORK_CONFIG_PATH}"

echo "==> Uninstall (state only)"
if ! pnpm crabfork uninstall --state --yes --non-interactive >/tmp/crabfork-cleanup-uninstall.log 2>&1; then
  cat /tmp/crabfork-cleanup-uninstall.log
  exit 1
fi

test ! -d "${CRABFORK_STATE_DIR}"

echo "OK"
