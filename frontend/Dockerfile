# frontend/Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source (optional for dev, Compose will mount)
COPY . .

# Expose React dev server port
EXPOSE 5173

# Default command for dev mode
CMD ["npm", "run", "dev", "--", "--host"]