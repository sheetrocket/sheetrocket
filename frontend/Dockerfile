# Dockerfile for frontend (Next.js)
FROM node:18.18

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY frontend/ .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV development

# Command to run the next.js app
CMD ["npm", "run", "dev"]
