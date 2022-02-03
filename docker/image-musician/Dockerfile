FROM node:17.3.0

COPY src /opt/app
WORKDIR /opt/app/
RUN npm install uuid

ENTRYPOINT ["node", "/opt/app/musician.js"]