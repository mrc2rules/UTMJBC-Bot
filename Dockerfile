# syntax=docker/dockerfile:1

# ── Stage 1: Build / Dependency Installation ─────────────────────
FROM node:20-bookworm-slim AS builder

WORKDIR /build

# Copy dependencies manifest
COPY package*.json ./

# Install production dependencies cleanly (avoiding devDependencies)
RUN npm ci --only=production

# ── Stage 2: Runtime Production Environment ──────────────────────
FROM node:20-bookworm-slim

# Set environment to production
ENV NODE_ENV=production

WORKDIR /usr/app

# Pre-create data/config directories and set ownership to node user
RUN mkdir -p config data && chown -R node:node /usr/app

# Copy production node_modules from the builder stage
COPY --from=builder --chown=node:node /build/node_modules ./node_modules

# Copy source code and files
COPY --chown=node:node package.json ./
COPY --chown=node:node src/ ./src/
COPY --chown=node:node language/ ./language/

# Run the container under the non-root 'node' user (UID 1000)
USER node

# Expose stats API port and Web Dashboard port
EXPOSE 8181 8182

# Run the sharder directly in exec form
CMD ["node", "src/sharder.js"]
