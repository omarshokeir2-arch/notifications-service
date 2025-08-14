# producer/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json from parent directory
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy producer source code
COPY producer/ ./

# Expose port
EXPOSE 3000

# Start producer
CMD ["node", "producer.js"]
