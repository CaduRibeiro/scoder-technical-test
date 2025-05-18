#!/bin/sh

./wait-for.sh mysql:3306 -- echo "✅ MySQL is ready"
./wait-for.sh kafka:9092 -- echo "✅ Kafka is ready"

npm run start:prod
