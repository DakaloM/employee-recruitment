import { BaseModel } from '@erecruitment/datakit';
import { Knex } from 'knex';
import Objection from 'objection';

import { TypeIdentifier } from '~/type';

export class Shortlist extends BaseModel {
  static tableName = 'shortlist';
  static typeIdentifier = TypeIdentifier.Shortlist;

  id: string;
  applicationId: string;
  jobTitle: string;
  jobId: string;
  applicantId: string;
  name: string;
  surname: string;
  sequence: number;

  static applySearch(
    query: Objection.QueryBuilder<Shortlist, Shortlist[]>,
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
