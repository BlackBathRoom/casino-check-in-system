import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router';
import { BadgeInfo, CircleX } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import type { NotificationMessage } from '@backend/services/notificationOrder';
import StarBucksSound from '/starbucks.mp3';
import MacdonaldSound from '/macdonald.mp3';
import { useNotification } from '@/hooks/useNotification';
import Notification from '@/components/ui/Notification';
import { AdminNotificationProvider } from '@/contexts/adminNotification';
import { useAuthOptions } from '@/api/routes/auth';
import { socket } from '@/api/shared/apiClient';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: auth } = useSuspenseQuery(useAuthOptions());

  const [targetPlay, setTargetPlay] = useState<
    'starbucks' | 'macdonald' | null
  >(null);
  const [playStarBucks] = useSound(StarBucksSound, { volume: 1 });
  const [playMacdonald] = useSound(MacdonaldSound, { volume: 0.8 });

  if (auth === null) {
    navigate({
      to: '/admin/login',
    });
  } else {
    if (auth.role === 'user') {
      navigate({
        to: '/users/$userId',
        params: { userId: auth.password },
      });
    }
  }

  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });
    socket.addEventListener('message', (event) => {
      const data: NotificationMessage = JSON.parse(event.data);
      notification.addNotification({
        message: `${data.itemName}が注文されました`,
        type: 'info',
      });

      if (data.productType === 'drink') {
        setTargetPlay('starbucks');
      } else {
        setTargetPlay('macdonald');
      }
    });

    return () => {
      socket.removeEventListener('open', () => {
        console.log('WebSocket connection established');
      });
      socket.removeEventListener('message', (event) => {
        console.log('WebSocket message received:', event.data);
      });
    };
  }, []);

  useEffect(() => {
    if (targetPlay === 'starbucks') {
      playStarBucks();
    } else if (targetPlay === 'macdonald') {
      playMacdonald();
    }

    return () => setTargetPlay(null);
  }, [targetPlay]);

  const notification = useNotification();

  return (
    <div className="flex flex-col h-full py-10 w-full lg:max-w-3xl gap-6 mx-auto">
      <AdminNotificationProvider value={notification}>
        <Outlet />
      </AdminNotificationProvider>
      <Notification>
        {notification.notificationItems.map((item) => (
          <Notification.Alert
            key={item.id}
            color={item.type}
            className="text-xl flex items-center gap-3"
          >
            {item.type === 'info' ? (
              <BadgeInfo className="w-6 h-6" />
            ) : (
              <CircleX className="w-6 h-6" />
            )}
            <span>{item.message}</span>
          </Notification.Alert>
        ))}
      </Notification>
    </div>
  );
}
