FROM node:14-alpine
ENV NODE_ENV=production
ENV REDIS_SERVER=redis
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g nodemon && npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
