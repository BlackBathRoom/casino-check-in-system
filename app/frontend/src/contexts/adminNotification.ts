import { createContext, useContext } from 'react';
import type { useNotification } from '@/hooks/useNotification';

type AdminNotificationContextType = Omit<
  ReturnType<typeof useNotification>,
  'notificationItems'
>;
const adminNotificationContext =
  createContext<AdminNotificationContextType | null>(null);

export const AdminNotificationProvider = adminNotificationContext.Provider;

export const useAdminNotification = () => {
  const context = useContext(adminNotificationContext);
  if (!context) {
    throw new Error(
      'useAdminNotification must be used within an AdminNotificationProvider'
    );
  }
  return context;
};
