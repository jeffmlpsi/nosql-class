#!/bin/sh

docker network create cassandra
docker network ls
docker run --rm -d --name cassandra --hostname cassandra --network cassandra cassandra
