FROM node:18

# Dossier de travail
WORKDIR /app

# Copier package.json depuis frontend et installer dépendances
COPY frontend/package*.json ./
RUN npm install

# Copier tout le projet frontend
COPY frontend/. .

# Exposer le port utilisé par React (par défaut 3000)
EXPOSE 3000

# Lancer le serveur
CMD ["npm", "start"]
