#!/usr/bin/env sh
set -e
./texture.py -h

set -x
WIDTH=512
HEIGHT=512

./texture.py  > gen_default.svg
./texture.py --circle > gen_circle.svg
#./texture.py --paper > src/gen_paper.svg
#./texture.py --stone > src/gen_paper.svg
#./texture.py --dirt > src/gen_paper.svg
#./texture.py --sand > src/gen_paper.svg

# verify Inkscape is installed
command -v inkscape

mkdir -pv output
for i in *.svg; do
  FILE=$(basename "$i")
	inkscape -C -w $WIDTH -h $HEIGHT "$i" -o "${FILE%.svg}.png";
done;
