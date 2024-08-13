# Use the official base image for dev containers from Microsoft
FROM mcr.microsoft.com/devcontainers/base:bullseye

# Install PostgreSQL client and other necessary dependencies
RUN apt-get update && \
    apt-get install -y libpq-dev

# Install Docker for Docker-in-Docker setup
RUN curl -fsSL https://get.docker.com | sh

# Clean up to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
