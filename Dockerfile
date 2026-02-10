FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build || echo "No build script, skipping"
EXPOSE 5173
CMD ["npm", "run", "dev"]
