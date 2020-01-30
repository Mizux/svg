# Create a virtual environment with all tools installed
FROM node:alpine AS env
LABEL maintainer="mizux.dev@gmail.com"

RUN apk add --no-cache wget
# Install/Configure nodejs, npm, yarn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
# Global Dependencies
RUN yarn global add http-server

# Create app directory
WORKDIR /home/node/app
# Bundle app deps
COPY js/*.sh js/
RUN (cd js && ./deps.sh)
# Bundle app source
COPY *.html ./

EXPOSE 8080
CMD [ "http-server" ]
