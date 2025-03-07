FROM node:18-slim AS build

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libgbm-dev \
    libasound2 \
    libxshmfence1 \
    libnss3-dev \
    libxss1 \
    fonts-liberation \
    libappindicator1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001

CMD ["npm", "start"]
