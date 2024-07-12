import { TypeIdentifier } from "~/type";
import { BaseModel } from "@erecruitment/datakit";
import { Advert } from "~/requisition";

export enum QuestionType {
  Job = 'Job',
  Interview = 'Interview',
}

export class Question extends BaseModel {
  static tableName = "question";
  static typeIdentifier = TypeIdentifier.Question;

  id: string;
  refId: string;
  question: string;
  answer: string;
  type: QuestionType;
  createdAt: Date;
  updatedAt: Date;
  job: Advert;

  static get relationMappings() {
    return {
      job: {
        relation: BaseModel.HasOneRelation,
        modelClass: Advert,
        join: {
          from: "question.jobId",
          to: "advert.id",
        },
      },
    };
  }
}
