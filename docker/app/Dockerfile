FROM oven/bun:latest

RUN apt-get update && apt-get install -y \
    git sudo ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

