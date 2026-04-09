import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotification, type Notification, type NotificationType } from '../contexts/NotificationContext';

const icons: Record<NotificationType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const NotificationItem = ({ n, onRemove }: { n: Notification; onRemove: (id: string) => void }) => {
  const Icon = icons[n.type];

  const handleRemove = () => {
    onRemove(n.id);
  };

  return (
    <div className={`notification-toast notification--${n.type}`}>
      <div className="notification-icon">
        <Icon size={20} />
      </div>
      <div className="notification-content">
        {n.title && <p className="notification-title">{n.title}</p>}
        <p className="notification-message">{n.message}</p>
      </div>
      <button className="notification-close" onClick={handleRemove} aria-label="إغلاق">
        <X size={16} />
      </button>
    </div>
  );
};

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotification();
  return (
    <div className="notifications-container" aria-live="polite">
      {notifications.map(n => (
        <NotificationItem key={n.id} n={n} onRemove={removeNotification} />
      ))}
    </div>
  );
};

export default NotificationToast;
