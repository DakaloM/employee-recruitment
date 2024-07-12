import { BaseModel } from '@erecruitment/datakit';
import { Knex } from 'knex';
import Objection from 'objection';

import { TypeIdentifier } from '~/type';

export enum InterviewStatus {
  Cancelled = 'Cancelled',
  Scheduled = 'Scheduled',
  Rescheduled = 'Rescheduled',

}



export class Interview extends BaseModel {
  static tableName = 'interview';
  static typeIdentifier = TypeIdentifier.Interview;

  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  applicantId: string;
  name: string;
  surname: string;
  status: InterviewStatus;
  date: Date;
  time: string;
  location: string;
  description: string;
  sequence: number;

  static applySearch(
    query: Objection.QueryBuilder<Interview, Interview[]>,
    db: Knex,
    text?: string | null,
  ) {
    if (text) {
      const rank = `ts_rank(search, websearch_to_tsquery('simple', ?))`;
      query
        .select(db.raw(`*, ${rank} as rank`, [text]))
        .whereRaw(`search @@ websearch_to_tsquery('simple', ?)`, [text])
        .orderBy('rank', 'desc');
    } else {
      query.select('*');
    }
  }
  
}
