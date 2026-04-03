#!/bin/bash

containerid=$(docker ps -a | grep mongodb | awk '{print $1}')
docker stop $containerid
docker rm $containerid