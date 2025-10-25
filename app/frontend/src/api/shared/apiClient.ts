import { hc } from 'hono/client';
import type { AppType } from '@backend/routes';

export const client = hc<AppType>('http://localhost:3000').api;
