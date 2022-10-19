#!/usr/env bash

git clone https://github.com/temporalio/docker-compose.git && cd  docker-compose

docker-compose up -d

# Set up the supplier

cd ./supplier

npm install

ts-node ./src/index.ts

nohup ts-node ./src/index.ts &

# Set up the machine

cd ../machine

npm install

# nohup nodemon src/worker.ts &

nohup ts-node src/worker.ts &

nohup ts-node ./src/index.ts &

echo "Everything is up and running"