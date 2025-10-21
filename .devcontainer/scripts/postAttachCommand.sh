#!/bin/bash

sudo find /workspace -path /workspace/docker/mysql/mysql_data -prune -o -exec chown bun:bun {} +
bun install
