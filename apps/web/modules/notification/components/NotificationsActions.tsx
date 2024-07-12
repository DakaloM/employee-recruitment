import {  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@erecruitment/ui';

import { SettingsIcon } from 'lucide-react';
import { UpdateBulkNotifications } from './UpdateBulkNotification';

export function NotificationsActionButtons({ ids }: NotificationsActionButtonsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SettingsIcon className="rounded-lg p-2" size={38} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0 gap-1">
        <UpdateBulkNotifications ids={ids} title='Mark all as read' task='readAllNotifications'/>
        <UpdateBulkNotifications ids={ids} title='Delete all' task='deleteAllNotifications'/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type NotificationsActionButtonsProps = {
  ids: string[];
};
