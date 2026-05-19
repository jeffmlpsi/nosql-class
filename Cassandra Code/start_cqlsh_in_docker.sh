#!/bin/sh

echo "NOTE it takes a while for Cassandra to start up in Docker"
echo "if you get an error about not being able to connect, wait a bit and try again"
docker exec -it cassandra cqlsh
#exit cqlsh with control + d or type exit and press enter
