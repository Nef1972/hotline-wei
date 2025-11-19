"use client";

import { App, NotificationArgsProps } from "antd";

type StaticFn = (args: Partial<NotificationArgsProps>) => void;
export type NotificationInstance = {
  success: StaticFn;
  error: StaticFn;
  info: StaticFn;
  warning: StaticFn;
};

export default function useNotification() {
  const { notification: antdNotification } = App.useApp();

  const notification: NotificationInstance = {
    success: (args: Partial<NotificationArgsProps>) =>
      antdNotification.success({ message: "Succes", ...args }),
    error: (args: Partial<NotificationArgsProps>) =>
      antdNotification.error({ message: "Erreur", ...args }),
    info: (args: Partial<NotificationArgsProps>) =>
      antdNotification.info({ message: "Information", ...args }),
    warning: (args: Partial<NotificationArgsProps>) =>
      antdNotification.warning({ message: "Attention", ...args }),
  };

  return notification;
}
