import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/bun';
import { getCookie } from 'hono/cookie';
import { decode } from 'hono/jwt';
import { AUTH_COOKIE_NAME } from '@/constants';
import { notificationOrderManager } from '@/services/notificationOrder';

const roleChecker = (role: unknown): 'admin' | 'user' | null => {
  if (!role || typeof role !== 'string') return null;
  if (role === 'admin') return 'admin';
  if (role === 'user') return 'user';
  return null;
};

const websocketRoute = new Hono().get(
  '/ws',
  upgradeWebSocket((c) => {
    const token = getCookie(c, AUTH_COOKIE_NAME);
    if (!token) return {};
    const { payload } = decode(token);
    const role = roleChecker(payload.role);
    if (!role) return {};

    return role === 'admin'
      ? {
          onOpen: (_, ws) => {
            notificationOrderManager.addAdminSocket(ws);
          },
          onClose: (_, ws) => {
            notificationOrderManager.removeAdminSocket(ws);
          },
        }
      : {};
  })
);

export default websocketRoute;
