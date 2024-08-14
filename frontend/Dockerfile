# Dockerfile for frontend (Next.js)
FROM node:18.18

# Set working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package.json ./

RUN npm install -g next

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY frontend/ .

# Expose the port Next.js will run on
EXPOSE 3000

# Command to run Next.js
CMD ["next", "dev"]
