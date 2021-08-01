FROM node:16.3

WORKDIR /app

ENV NODE_ENV="production"

COPY scripts/install_mongo.sh install_mongo.sh
COPY scripts/runUnit.sh runUnit.sh
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY build/ .

RUN ["bash", "install_mongo.sh"]
RUN ["npm", "ci"]

ENTRYPOINT ["/bin/bash", "runUnit.sh"]
