import type { WSContext } from 'hono/ws';

export interface NotificationMessage {
  productType: 'tip' | 'drink';
  itemName: string;
}

class NotificationOrder {
  private static instance: NotificationOrder;

  private adminSockets: Set<WSContext>;

  private constructor() {
    this.adminSockets = new Set<WSContext>();
  }

  public addAdminSocket(ws: WSContext): void {
    this.adminSockets.add(ws);
  }

  public removeAdminSocket(ws: WSContext): void {
    this.adminSockets.delete(ws);
  }

  public notifyAdmins(message: NotificationMessage): void {
    this.adminSockets.forEach((ws) => {
      ws.send(JSON.stringify(message));
    });
  }

  public static getInstance(): NotificationOrder {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!NotificationOrder.instance) {
      NotificationOrder.instance = new NotificationOrder();
    }
    return NotificationOrder.instance;
  }
}

export const notificationOrderManager = NotificationOrder.getInstance();
