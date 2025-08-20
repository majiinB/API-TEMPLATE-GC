# -------- Stage 1: Build --------
# Use the official Node.js 22 image from Google Cloud Platform
FROM node:22-slim AS builder

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# Copying package files separately allows better use of Docker layer caching.
COPY package*.json ./

# Install production dependencies.
RUN npm ci

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm run build

# -------- Stage 2: Production --------
FROM node:22-slim AS runner

WORKDIR /app

# Remove devDependencies after build
COPY package*.json ./
RUN npm ci --only=production

# Copy built dist and any runtime files
COPY --from=builder /app/dist ./dist

# Configure the container to run as a non-root user
USER node

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Cloud Run will use port 8080
EXPOSE 8080

# Run the web service on container startup.
CMD [ "node", "dist/index.js" ]