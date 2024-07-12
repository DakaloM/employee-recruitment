import { BaseModel } from '@erecruitment/datakit';
import { Question } from '~/question';
import { Advert } from '~/requisition';

import { TypeIdentifier } from '~/type';

export enum InterviewStatus {
  Cancelled = 'Cancelled',
  Scheduled = 'Scheduled',
  Rescheduled = 'Rescheduled',
}

export enum InterviewType {
  Job = 'Job',
  Applicant = 'Applicant',
}

export class InterviewPackage extends BaseModel {
  static tableName = 'interview_package';
  static typeIdentifier = TypeIdentifier.InterviewPackage;

  id: string;
  jobId: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  job: Advert;
  questions: Question[];

  static get relationMappings() {
    return {
      job: {
        relation: BaseModel.HasOneRelation,
        modelClass: Advert,
        join: {
          from: 'interview_package.jobId',
          to: 'advert.id',
        },
      },
      questions: {
        relation: BaseModel.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'interview_package.id',
          to: 'question.refId',
        },
      },
    };
  }
}
