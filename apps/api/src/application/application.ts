
import { BaseModel } from "@erecruitment/datakit";
import { Knex } from "knex";
import Objection from "objection";
import { User } from "~/account";
import { Applicant } from "~/applicant";
import { Advert, Requisition } from "~/requisition";
import { TypeIdentifier } from "~/type";

export enum ApplicationStatus {
  Created = 'Created',
  Submitted = 'Submitted',
  ShortListed = 'ShortListed',
  Declined = 'Declined',
  Approved = 'Approved',
}

export class Application extends BaseModel {

  static tableName = 'application';
  static typeIdentifier = TypeIdentifier.Application;

  id: string;
  applicantId: string;
  requisitionId: string;
  userId: string;
  jobId: string;
  jobTitle: string;
  name: string;
  surname: string; 
  status: ApplicationStatus;
  createdAt: Date;
  applicant: Applicant;
  sequence: number;
  requisition: Requisition;
  job: Advert;
  user: User

  static applySearch(
    query: Objection.QueryBuilder<Application, Application[]>,
    db: Knex,
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

  static get relationMappings(){
    return {
      applicant: {
        relation: BaseModel.HasOneRelation,
        modelClass: Applicant,
        join: {
          from: 'application.applicantId',
          to: 'applicant.id'
        }
      },
      requisition: {
        relation: BaseModel.HasOneRelation,
        modelClass: Requisition,
        join: {
          from: 'application.requisitionId',
          to: 'requisition.id'
        }
      },
      job: {
        relation: BaseModel.HasOneRelation,
        modelClass: Advert,
        join: {
          from: 'application.jobId',
          to: 'advert.id'
        }
      },
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'application.userId',
          to: 'user.id'
        }
      }
    }
  }
}
