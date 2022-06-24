#!/usr/bin/env bash
set -euo pipefail

command -v docker

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

docker build -t svg .
docker run --rm --init --net=host \
  -v ${SCRIPT_DIR}:/home/node/app \
  -it \
  --name svg \
  svg:latest
