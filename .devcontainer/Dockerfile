FROM oven/bun:latest

ARG USER_NAME=bun

RUN apt-get update && apt-get install -y \
    git sudo ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN echo "${USER_NAME} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USER_NAME} \
    && chmod 0440 /etc/sudoers.d/${USER_NAME}
