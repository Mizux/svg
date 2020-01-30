# SVG
SVG related stuff

![graph](src/graph.svg)  
[graph.svg](src/graph.svg)

![paper](https://rawgithub.com/Mizux/svg/master/src/paper.svg)  
[paper.svg](src/paper.svg)

using `src/stone.svg`  
![stone](src/stone.svg)

using `https://rawgithub.com/Mizux/svg/master/src/stone.svg`  
![stone](https://rawgithub.com/Mizux/svg/master/src/stone.svg)

[stone.svg](src/stone.svg)

note: Github.com does not support well svg filter.  
e.g. `![stone](src/stone.svg)` won't work,
**BUT** if you use rawgithub.com (i.e. letting your browser doing the rendering it will work).  
e.g. `![stone](https://rawgithub.com/Mizux/svg/master/src/stone.svg)`

# Python
To generate svg from a python script you can use:
```sh
./generate.sh
```
This will generate some `src/gen_*.svg` images, then they will be converted to PNG using inkscape...

# Web
## Install
in your .rc file
```sh
# Install/Configure nodejs, npm, yarn
export NPM_CONFIG_PREFIX=${HOME}/.npm-global
export PATH=${PATH}:${NPM_CONFIG_PREFIX}/bin
```
Then install a simple nodejs server
```sh
npm install -g http-server
(cd js && ./deps.sh)
```

## Run
in one terminal run the server using:
```sh
hs
```
Then in your browser open http://localhost:8080/three.html 
