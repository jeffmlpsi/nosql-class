#!/bin/sh

#stop cassandra and remove the network
docker stop cassandra 
docker network  rm cassandra
# docker rm cassandra

