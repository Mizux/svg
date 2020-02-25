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
