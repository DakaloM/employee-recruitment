import { UpdateNotificationStatusInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Notification, NotificationStatus } from "../notification";
import { NotFoundError } from "@erecruitment/serverkit";


export async function updateNotificationStatus(input: UpdateNotificationStatusInput, ctx: Context) {
  const {id} = input;
  const status = input.status as NotificationStatus;

  // find notification
  const notification = await Notification.query(ctx.db).findById(id);
  if(!notification){
    throw new NotFoundError({
      message: 'Notification not found'
    })
  }

  const updatedNotification = notification.$query(ctx.db).patchAndFetch({status});

  return updatedNotification;
}