

import { ReadAllNotificationsInput } from '@erecruitment/client';
import { NotFoundError } from '@erecruitment/serverkit';
import { Notification, NotificationStatus } from '../notification';

export async function readAllNotifications(input: ReadAllNotificationsInput, ctx: any) {

  const {ids} = input;
  const updates = [];

  const existingUpdates = await Notification.query(ctx.db).whereIn('id', ids);

  if(!existingUpdates || existingUpdates.length === 0) {
    
    throw new NotFoundError({message: 'Updates not found'})
  }

  for(const id of ids) {
    const updatedRecord = await Notification.query(ctx.db).where('id', id).patch({ status: NotificationStatus.Seen });
    updates.push(updatedRecord);
  }

  return updates;
  
}
  