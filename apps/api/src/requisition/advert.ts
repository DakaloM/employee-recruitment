import { BaseModel } from "@erecruitment/datakit";
import { Knex } from "knex";
import Objection from "objection";
import { TypeIdentifier } from "~/type";
import { Requisition } from "./requisition";
import { Question } from "~/question";
// import { Question } from "~/question";


export enum AdvertStatus {
  Open = 'Open',
  Closed = 'Closed'
}

export class Advert extends BaseModel {
  static tableName = 'advert';
  static typeIdentifier = TypeIdentifier.Advert;

  id: string;
  requisitionId: string;
  title: string;
  positionTitle: string;
  status: AdvertStatus;
  location: string;
  sequence: number;
  requisition: Requisition;
  questions: Question[];

  static applySearch(query: Objection.QueryBuilder<Advert, Advert[]>, db: Knex, text?: string | null) {
    if (text) {
      const englishTsQuery = db.raw('websearch_to_tsquery(?, ?)', ['english', text]);
      const simpleTsQuery = db.raw('websearch_to_tsquery(?, ?)', ['simple', text]);
      const rank = `ts_rank(search, ${englishTsQuery}) + ts_rank(search, ${simpleTsQuery})`;
  
      query
        .select(db.raw(`*, ${rank} as rank`))
        .whereRaw(`search @@ ${englishTsQuery}`)
        .orWhereRaw(`search @@ ${simpleTsQuery}`)
        .andWhereRaw(`${rank} > 0`)
        .whereNotNull('advert.id') // Ensure advert.id is not null
        .orderBy('advert.id', 'desc')
        .orderBy('rank', 'desc');
    }
  }
  
  

  static get relationMappings() {
    return {
      requisition: {
        relation: BaseModel.HasOneRelation,
        modelClass: Requisition,
        join: {
          from: 'advert.requisitionId',
          to: 'requisition.id'
        } 
      },
      questions: {
        relation: BaseModel.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'advert.id',
          to: 'question.refId'
        } 
      }
    }
  }
}