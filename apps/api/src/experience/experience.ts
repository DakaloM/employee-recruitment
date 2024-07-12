import { BaseModel } from '@erecruitment/datakit';

import { User } from '~/account';
import { Region } from '~/education';
import { TypeIdentifier } from '~/type';

export class Experience extends BaseModel {
  static tableName = 'experience';
  static typeIdentifier = TypeIdentifier.Experience;

  id: string;
  userId: string;
  employer: string;
  startDate: Date;
  endDate: Date;
  country: string;
  region: Region;
  industry: string;
  jobTitle: string;
  workContract: string;
  user: User;

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'experience.userId',
          to: 'user.id',
        },
      },
    };
  }
}
