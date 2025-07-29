import { Notification } from "@/types/notification.interface";
import { generateId } from "@/utils/string";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type NotificationState = {
  notifications: Notification[];
  showNotification: (notificaiton: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>()(devtools((set, get) => ({
    notifications: [],
    showNotification: (notification) => {
      const id = generateId();
      set((state) => ({
        notifications: [...state.notifications, { id: id, ...notification }],
      }));
  
      setTimeout(() => {
          get().dismissNotification(id)
      }, notification.duration);
    },
    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    },
  })));
