"use client";

import React from "react";
import { NotificationProps } from "./notification.types";
import { useNotificationStore } from "@/store/notification.store";
import { NotificationToast } from "./notification-toast";

export const Notifications: React.FC<NotificationProps> = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  if (notifications.length < 0) return null;
  return (
    <div className="fixed flex flex-col-reverse bottom-3 right-3 gap-3">
      {notifications.map((p) => (
        <NotificationToast notification={p} key={`notification-${p.id}`} />
      ))}
    </div>
  );
};
