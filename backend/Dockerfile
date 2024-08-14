# Dockerfile for backend (NestJS)
FROM node:18.18

# Set working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY backend/package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY backend/ .

# Build the NestJS application
RUN npm run build

# Expose the port NestJS will run on
EXPOSE 5000

# Command to run the NestJS application
CMD ["node", "dist/main"]
