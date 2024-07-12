import { NotificationStatus } from '@erecruitment/client';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@erecruitment/ui';

import { filter } from 'lodash';
import { BellIcon } from 'lucide-react';

import { NotificationList, Props } from './NotificationList';

export function Notifications({ notifications }: Props) {
  const newNotifications = filter(notifications, { status: NotificationStatus.New });
  return (
    <section>
      <Popover>
        <PopoverTrigger>
          <Button variant="link" className="my-auto flex gap-4 text-foreground">
            <div className="rounded-full bg-secondary text-white h-8 w-8 grid place-items-center relative">
              <BellIcon size={16} />

              <span className="absolute -top-1 -right-1 bg-gray-500 w-3 h-3 rounded-full p-0 flex items-center justify-center text-[10px]">
                {newNotifications.length}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[500px]">
          <NotificationList notifications={notifications} />
        </PopoverContent>
      </Popover>
    </section>
  );
}
