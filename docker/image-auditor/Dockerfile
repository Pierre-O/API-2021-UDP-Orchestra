FROM node:17.3.0

RUN apt-get update && apt-get install -y vim
RUN npm install
COPY src /opt/app

ENTRYPOINT ["node", "/opt/app/auditor.js"]