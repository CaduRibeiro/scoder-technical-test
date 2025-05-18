#!/bin/sh

# wait-for.sh host:port command...
# Exemplo: ./wait-for.sh mysql:3306 -- echo "MySQL is up"

set -e

host_port="$1"
shift

host=$(echo "$host_port" | cut -d : -f 1)
port=$(echo "$host_port" | cut -d : -f 2)

echo "⏳ Waiting for $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "✅ $host:$port is available. Running command..."
exec "$@"
