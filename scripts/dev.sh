#!/bin/bash
cd /app
exec /app/node_modules/.bin/next dev -p 3000 -H 0.0.0.0
