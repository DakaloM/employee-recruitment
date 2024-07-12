import { BaseModel } from '@erecruitment/datakit';

import { User } from '~/account';
import { TypeIdentifier } from '~/type';

export class Contact extends BaseModel {
  static tableName = 'contact';
  static typeIdentifier = TypeIdentifier.Contact;

  id: string;
  userId: string;
  email: string;
  mobileNumber: string;
  businessNumber: string | null;
  privateNumber: string | null;
  user: User;

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'contact.userId',
          to: 'user.id',
        },
      },
    };
  }
}
