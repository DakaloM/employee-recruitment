import { BaseModel } from '@erecruitment/datakit';
import Objection from 'objection';

import { User } from '~/account';
import { Context } from '~/context';
import { TypeIdentifier } from '~/type';

export enum NotificationCategory {
  General = 'General',
  Application = 'Application',
  Document = 'Document',
  UserAccount = 'UserAccount',
  Requisition = 'Requisition',
}

export enum NotificationMessage { 
  NewApplication = 'Your application has been submitted',
  NewRequisition = 'New requisition has been created',
}

export enum NotificationStatus {
  New = 'New',
  Seen = 'Seen',
}

export class Notification extends BaseModel {
  static tableName = 'notification';
  static typeIdentifier = TypeIdentifier.Notification;

  id: string;
  userId: string;
  refId: string;
  category: NotificationCategory;
  message: NotificationMessage;
  status: NotificationStatus;
  createdAt: Date;
  user: User;

  static applySearch(
    query: Objection.QueryBuilder<Notification, Notification[]>,
    db: Context['db'],
    text?: string | null,
  ) {
    if (text) {
      const rank = `ts_rank(search, websearch_to_tsquery('simple', ?))`;
      query
        .select(db.raw(`*, ${rank} as rank`, text))
        .whereRaw(`search @@ websearch_to_tsquery('simple', ?)`, text)
        .andWhereRaw(`${rank} > 0`, text)
        .orderBy('rank', 'desc');
    } else {
      query.select('*');
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: Notification,
        join: {
          from: 'notification.userId',
          to: 'user.id',
        },
      },

      
    };
  }
}
