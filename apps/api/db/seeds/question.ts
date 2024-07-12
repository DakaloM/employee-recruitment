import { AdvertStatus, RequisitionStatus } from "@erecruitment/client";
import { faker } from "@erecruitment/testkit";
import { Knex } from "knex";
import { newId } from "~/domain/id";
import { QuestionType } from "~/question";

export async function seed(knex: Knex): Promise<void> {
  
    const jobs = await knex("advert");

  if (jobs.length === 0) {
    return;
  }


  const questions: Question[] = jobs.flatMap((job) => {
    return [
      {
        id: newId("uuid"),
        refId: job.id,
        question: "How many years of experience do you have",
        type: QuestionType.Job,
        answer: String(faker.number.int({ min: 1, max: 10 })),
      },
      {
        id: newId("uuid"),
        refId: job.id,
        type: QuestionType.Job,
        question: "Do you have any criminal record",
        answer: faker.helpers.arrayElement(["Yes", "No"]),
      },
      {
        id: newId("uuid"),
        refId: job.id,
        type: QuestionType.Job,
        question: "Do you have any disability?",
        answer: faker.helpers.arrayElement(["Yes", "No"]),
      },
     
    ];
  });

  await knex.transaction(async (trx) => {
    await trx("question").insert(questions);
  });
}


type Advert = {
  id: string;
  requisitionId: string;
  title: string;
  positionTitle: string;
  status: AdvertStatus;
  location: string;
};

type Question = {
  id: string;
  refId: string;
  type: QuestionType;
  question: string;
  answer: string;
};
