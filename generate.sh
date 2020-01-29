#!/usr/bin/env sh
set -e
./texture.py -h

set -x
WIDTH=512
HEIGHT=512

./texture.py  > src/gen_default.svg
./texture.py --circle > src/gen_circle.svg
#./texture.py --paper > src/gen_paper.svg

# verify Inkscape is installed
command -v inkscape
mkdir -pv output

for i in src/*.svg; do
  FILE=$(basename $i)
	inkscape -C -w $WIDTH -h $HEIGHT $i -e output/${FILE%.svg}.png;
done;
