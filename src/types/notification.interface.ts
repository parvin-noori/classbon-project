export interface Notification {
  id: string;
  message: string;
  duration?: number;
  type: NotificationType;
}

type NotificationType = "info" | "success" | "error" | "warning";
