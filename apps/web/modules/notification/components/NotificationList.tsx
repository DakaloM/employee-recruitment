"use client";

import {
  NotificationStatus,
  NotificationCategory,
  NotificationFragment,
} from "@erecruitment/client";
import { Button, closeDialog } from "@erecruitment/ui";
import { format } from "date-fns";
import {
  CalendarDays,
  MonitorIcon,
  LucideIcon,
  Wallet2Icon,
  HelpCircleIcon,
  SettingsIcon,
  ListChecksIcon,
  CheckCheckIcon,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { executeApi } from "~/client/api";

import { NotificationsActionButtons } from "./NotificationsActions";

export function NotificationList({ notifications }: Props) {
  const ids: string[] = notifications.map((notification) => notification.id);

  return (
    <section className="bg-white shadow rounded-md w-full ">
      <div className="flex gap-4 place-items-center pt-2 pb-4 px-6">
        <div className="flex-1 flex place-items-center gap-2">
          <ListChecksIcon
            className="bg-primary rounded-lg p-2 text-white"
            size={38}
          />
          <span className="text-md font-semibold">Notifications</span>
        </div>
        {notifications.length === 0 ? (
          <SettingsIcon className="rounded-lg p-2" size={38} />
        ) : (
          <NotificationsActionButtons ids={ids} />
        )}
      </div>
      <hr className="h-px bg-gray-800 w-full" />
      <div className="flex flex-col p-6 divide-y divide-gray-200 rounded-none max-h-[600px] overflow-auto scrollbar-hide">
        {notifications.length === 0 ? (
          <span className="w-full text-center text-gray-400">
            You don&apos;t have any notifications
          </span>
        ) : (
          notifications?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </section>
  );
}

const colorLookup: Record<Props["notifications"][0]["category"], string> = {
  Application: "bg-gray-700/30 text-gray-700",
  Requisition: "bg-yellow-400/30 text-yellow-400",
  UserAccount: "bg-primary/30 text-primary",
  Document: "bg-primary/30 text-primary",
  General: "bg-primary/30 text-primary",
};

const iconLookup: Record<Props["notifications"][0]["category"], LucideIcon> = {
  Application: MonitorIcon,
  Requisition: CalendarDays,
  UserAccount: Wallet2Icon,
  Document: Wallet2Icon,
  General: Wallet2Icon,
};

function NotificationItem({
  notification,
}: {
  notification: Props["notifications"][0];
}) {
  const [loading, setLoading] = React.useState(false);
  const Icon = iconLookup[notification.category] ?? HelpCircleIcon;
  const color = colorLookup[notification.category] ?? "gray-700";
  const category = notification.category;

  const links = {
    application: `/application/${notification.refId}`,
    requisition: `/requisition/${notification.refId}`,
    profile: `/users/${notification.refId}`,
  };

  const url =
    category === NotificationCategory.Application
      ? links.application
      : category === NotificationCategory.Requisition
      ? links.requisition
      : category === NotificationCategory.UserAccount
      ? links.profile
      : "";

  const date = format(
    new Date(notification.createdAt),
    "dd MMM yyyy : hh:mm a"
  );

  const router = useRouter();

  const handleClick = async () => {
    try {
      setLoading(true);
      await executeApi("updateNotificationStatus", {
        status: NotificationStatus.Seen,
        id: notification.id,
      });
      setLoading(false);
      router.push(url);
      closeDialog();
    } catch (error) {
      console.log(error);
      closeDialog();
      setLoading(false);
    }
  };

  return (
    <div className="py-1">
      <Button
        onClick={handleClick}
        variant="ghost"
        className="py-4 w-full h-max px-2 cursor-pointer rounded-md flex place-items-center gap-4 hover:bg-gray-200"
      >
        <div
          className={`${color} h-16 w-16 rounded-full flex place-items-center p-2`}
        >
          <Icon className="self-center mx-auto" size={26} />
        </div>
        <div className="flex flex-col items-start w-full gap-1 flex-1">
          <span className="text-sm font-normal text-gray-600">
            {notification.message}
          </span>
          <span className="text-xs font-normal text-gray-400">{date}</span>
        </div>
        {loading ? (
          <Loader size={26} className="text-primary" />
        ) : (
          <CheckCheckIcon
            className={
              notification.status === NotificationStatus.New
                ? "text-green-500"
                : "text-gray-500"
            }
            size={26}
          />
        )}
      </Button>
    </div>
  );
}
export interface Props {
  notifications: NotificationFragment[] | [];
}
