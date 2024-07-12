import { NotificationFilter } from '@erecruitment/client';

import { Context } from '~/context';
import { applyPagination } from '~/domain/search';

import { Notification } from '../notification';

export async function getNotifications(search: NotificationFilter, ctx: Context) {
  const { page = 1, limit = 20, ...filter } = search;
  const category = filter.category ? filter.category : null;
  const message = filter.message ? filter.message : null;

  const userId = ctx.auth.user?.id as string;

  const query = Notification.query(ctx.db).where('userId', userId);

  Notification.applySearch(query, ctx.db, search?.category ? category : message);

  query
    .select('notification.*')
    .distinctOn('notification.id')
    .join(
      'notification.category'.toLocaleLowerCase(),
      'notification.refId',
      `${'notification.category'.toLocaleLowerCase()}.id`,
    )
    .whereIn('userId', ctx.auth.actorIds)
    .withGraphFetched('notification.category'.toLowerCase());

  applyPagination(query, search);

  const notifications = await query;

  return notifications;
}
