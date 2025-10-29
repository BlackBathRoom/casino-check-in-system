import { hc } from 'hono/client';
import type { AppType } from '@backend/routes';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const client = hc<AppType>(apiBaseUrl, {
  fetch: async (req: string | Request | URL, init: RequestInit | undefined) =>
    await fetch(req, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
}).api;

export const socket = client.ws.$ws();
