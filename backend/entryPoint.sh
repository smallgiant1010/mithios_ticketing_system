#!/usr/bin/env bash

set -e

if [ -f /app/.env ]; then
  export $(grep -v '^#' /app/.env | xargs)
fi

cloudflared access tcp --hostname $MONGO_DOMAIN --url localhost:27016 \
  --service-token-id $CLIENT_ID \
  --service-token-secret $CLIENT_SECRET &

npm run start &

wait -n
EXIT_CODE=$?
echo "Shutting down..."
exit $EXIT_CODE


