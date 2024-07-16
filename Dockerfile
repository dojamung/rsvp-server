# Base image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Nest.js application code
COPY . .

# Expose port (adjust as necessary)
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]
