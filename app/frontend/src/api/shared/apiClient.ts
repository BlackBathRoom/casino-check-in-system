import { hc } from 'hono/client';
import type { AppType } from '@backend/routes';

export const client = hc<AppType>('http://localhost:3000', {
  fetch: async (req: string | Request | URL, init: RequestInit | undefined) =>
    await fetch(req, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
}).api;
