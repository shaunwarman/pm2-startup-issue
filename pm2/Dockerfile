FROM ubuntu:xenial

WORKDIR /tmp/node

ARG NODE_VERSION=6.11.1
ARG NPM_VERSION=5.2.0

ENV NODE_VERSION ${NODE_VERSION}
ENV NPM_VERSION ${NPM_VERSION}

COPY . .

# setup node/npm and install pm2
RUN apt-get update \
    && apt-get install -y curl \
    && curl -SLOk "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz" \
    && npm config set registry "https://registry.npmjs.com" \
    && npm install -g npm@"$NPM_VERSION" pm2@^2.4.0 \
    && npm cache clean -f \
    && npm uninstall npm -g

# setup pm2 folder structure
RUN mkdir -p /home/cronusapp/.pm2/logs \
    && mkdir -p /home/cronusapp/.pm2/pids \
    && cd /home/cronusapp/.pm2 \
    && touch pm2.log \
             pm2.pid \
             rpc.sock \
             pub.sock \
             conf.js \
             module_conf.json \
    && chmod -R 777 /home/cronusapp/.pm2

CMD pm2-docker start /dependencies/deploy/pm2.json
