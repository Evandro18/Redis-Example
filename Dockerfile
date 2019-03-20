#Docckerfile
FROM node:10
WORKDIR '/var/www/app'

RUN npm install

CMD npm start