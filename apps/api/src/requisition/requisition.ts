import { BaseModel } from "@erecruitment/datakit";
import { TypeIdentifier } from "~/type";
import Objection from "objection";
import { Context } from "~/context";
import { Position } from "~/position";
import { Knex } from "knex";


export enum RequisitionStatus {
  WaitingApproval = 'WaitingApproval',
  Approved = 'Approved',
  Declined = 'Declined',
}

export enum RequisitionHierarchy {
  Management = 'Management',
  SkilledWorker = 'SkilledWorker',
  Trainee = 'Trainee',
}

export enum EmploymentType {
  FullTime = 'FullTime',
  PartTime = 'PartTime'
}

export enum WorkPlace {
  Remote = 'Remote',
  OnSite = 'OnSite',
  Hybrid = 'Hybrid',
}


export class Requisition extends BaseModel {
  static tableName = 'requisition';
  static typeIdentifier = TypeIdentifier.Requisition

  id: string;
  objectId: string;
  title: string;
  endDate: Date;
  positionTitle: string;
  hierarchy: RequisitionHierarchy;
  hiringDate: Date;
  location: string;
  status: RequisitionStatus;
  qualifications: string[];
  responsibilities: string[];
  experience: number;
  updatedAt: Date;
  createdAt: Date;
  workplace: WorkPlace;
  employmentType: EmploymentType;
  sequence: number;
  position: Position;


  static applySearch(
    query: Objection.QueryBuilder<Requisition, Requisition[]>,
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

  static get relationMappings() {
    return {
      position: {
        relation: BaseModel.HasOneRelation,
        modelClass: Position,
        join: {
          from: "requisition.objectId",
          to: "position.id",
        },
      },
    };
  }

}

