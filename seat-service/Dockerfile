# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire source code
COPY . .

# Build TypeScript code
RUN npm run build

# Seed seats during build phase (optional - for fresh containers)
# RUN node dist/seed/seedSeats.js

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/app.js"]
