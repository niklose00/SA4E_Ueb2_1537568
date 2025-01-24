# Basis-Image
FROM node:18

# Arbeitsverzeichnis setzen
WORKDIR /app

# Kopiere die Dateien ins Image
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Exponiere den Port
EXPOSE 4000

# Startkommando
CMD ["npm", "start"]
