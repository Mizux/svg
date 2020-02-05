# SVG
SVG related stuff...

# Codemap
* [src](src): handwritten svg files
* [genap](genapp): Static Webapp
* [genpy](genpy): Python generator script

## Simple animation
![graph](src/graph.svg)  
[graph.svg](src/graph.svg)

## Simple filter effect
![paper](https://rawgithub.com/Mizux/svg/master/src/paper.svg)  
[paper.svg](src/paper.svg)

# Python Generator
To generate svg from a python script you can use:
```sh
./generate.sh
```
This will generate some `src/gen_*.svg` images, then they will be converted to PNG using inkscape...

# Webapp Generator
## Setup docker
in your .rc file
```sh
# Install/Configure nodejs, npm, yarn
export NPM_CONFIG_PREFIX=${HOME}/.npm-global
export PATH=${PATH}:${NPM_CONFIG_PREFIX}/bin
```
Then install a simple nodejs server
```sh
docker build -t svg .
```

## Run
In one terminal run the server using:
```sh
docker run --rm --net=host --init --name plop -it svg:latest
```
Then in your browser open http://localhost:8080

# Troubleshooting MD rendering
GitHub MD rendering seems borken...

e.g using `![stone](src/stone.svg)` won't work,  
![stone](src/stone.svg)

**BUT** if you use rawgithub.com  
e.g. `![stone](https://rawgithub.com/Mizux/svg/master/src/stone.svg)`  
![stone](https://rawgithub.com/Mizux/svg/master/src/stone.svg)

src: [stone.svg](src/stone.svg)
