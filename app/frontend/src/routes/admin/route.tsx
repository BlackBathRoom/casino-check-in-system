import { Outlet, createFileRoute } from '@tanstack/react-router';
import { BadgeInfo, CircleX } from 'lucide-react';
import { useNotification } from '@/hooks/useNotification';
import Notification from '@/components/ui/Notification';
import { AdminNotificationProvider } from '@/contexts/adminNotification';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
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
