import { useCallback, useEffect, useRef, useState } from 'react';

type NotificationType = 'error' | 'info';

export type NotificationItem = {
  id: number;
  message: string;
  type: NotificationType;
};

type UseNotificationOptions = {
  autoDismissMs?: number | null;
};

const DEFAULT_AUTO_DISMISS_MS = 10_000;

export const useNotification = ({
  autoDismissMs = DEFAULT_AUTO_DISMISS_MS,
}: UseNotificationOptions = {}) => {
  const [notificationItems, setNotificationItems] = useState<
    Array<NotificationItem>
  >([]);
  const timeoutIds = useRef<Array<number>>([]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutIds.current = [];
    };
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotificationItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addNotification = useCallback(
    ({ id, message, type }: Omit<NotificationItem, 'id'> & { id?: number }) => {
      const nextId = id ?? Date.now();

      setNotificationItems((prev) => [
        ...prev,
        {
          id: nextId,
          message,
          type,
        },
      ]);

      if (autoDismissMs) {
        const timeoutId = window.setTimeout(() => {
          removeNotification(nextId);
          timeoutIds.current = timeoutIds.current.filter(
            (storedId) => storedId !== timeoutId
          );
        }, autoDismissMs);

        timeoutIds.current.push(timeoutId);
      }

      return nextId;
    },
    [autoDismissMs, removeNotification]
  );

  return {
    addNotification,
    removeNotification,
    notificationItems,
  };
};
