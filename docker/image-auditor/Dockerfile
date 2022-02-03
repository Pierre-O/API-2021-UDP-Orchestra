FROM node:17.3.0

COPY src /opt/app
WORKDIR /opt/app/
RUN npm install moment --save

CMD ["node", "/opt/app/auditor.js"]