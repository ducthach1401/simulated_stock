FROM node:16-alpine

WORKDIR /var/www

# Fix 'not get uid/gid'
RUN npm config set unsafe-perm true

# PM2
RUN npm install pm2 -g
COPY . .
RUN npm install

EXPOSE 8080

#
CMD ["pm2-runtime", "start", "pm2.json"]
