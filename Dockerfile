# Create a virtual environment with all tools installed
FROM node:alpine AS env
LABEL maintainer="mizux.dev@gmail.com"
# Install/Configure nodejs, npm, yarn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
# Global Dependencies
RUN yarn global add http-server

# Create app directory
WORKDIR /home/node/app
# Bundle app source
COPY js index.html ./

EXPOSE 8080
CMD [ "http-server" ]