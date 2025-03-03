FROM node:18 AS build

# Instalar dependencias necesarias para Puppeteer y Chromium
RUN apt-get update && apt-get install -y \
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
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app /app

# Instalar Chromium en la segunda etapa
RUN apt-get update && apt-get install -y chromium

# Exponer el puerto
EXPOSE 3001

# Definir el comando por defecto
CMD ["npm", "start"]
