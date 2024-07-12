
import { BaseModel } from "@erecruitment/datakit";
import { Question } from "~/question";
import { TypeIdentifier } from "~/type";

export class Answer extends BaseModel {
  static tableName = "answer";
  static typeIdentifier = TypeIdentifier.Answer;

  id: string;
  questionId: string;
  refId: string;
  applicantId: string;
  answer: string;
  question: Question;

  static get relationMappings() {
    return {
      question: {
        relation: BaseModel.HasOneRelation,
        modelClass: Question,
        join: {
          from: "answer.questionId",
          to: "question.id",
        },
      },
    };
  }
}
