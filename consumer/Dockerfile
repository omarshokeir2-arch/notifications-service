# consumer/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json from parent directory
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy consumer source code
COPY consumer/ ./

# Start consumer
CMD ["node", "consumer.js"]
