FROM node:18 AS build

RUN apt-get update && apt-get install -y libnss3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001

CMD ["npm", "start"]