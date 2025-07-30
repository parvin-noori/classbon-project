export interface Notification {
  id: string;
  message: string;
  duration?: number;
  type: NotificationType;
}

export type NotificationType = "info" | "success" | "error" | "warning";
