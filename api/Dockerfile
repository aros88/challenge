FROM node
WORKDIR /api

COPY package.json /api

RUN npm install
RUN npm install -g nodemon

COPY . /api

# CMD ["node","app.js"]
