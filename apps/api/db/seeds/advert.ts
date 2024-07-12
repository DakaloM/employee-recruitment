import { AdvertStatus, RequisitionStatus } from "@erecruitment/client";
import { faker } from "@erecruitment/testkit";
import { Knex } from "knex";
import { newId } from "~/domain/id";

export async function seed(knex: Knex): Promise<void> {
  const requisitions: Requisition[] = await knex("requisition").where({
    status: RequisitionStatus.Approved,
  });

  if (requisitions.length === 0) {
    return;
  }

  const adverts: Advert[] = requisitions.map((requisition) => ({
    id: newId("uuid"),
    requisitionId: requisition.id,
    title: requisition.title,
    positionTitle: requisition.positionTitle,
    status: AdvertStatus.Open,
    location: requisition.location,
  }));


  await knex.transaction(async (trx) => {
    await trx("advert").insert(adverts);
  });
}

type Requisition = {
  id: string;
  objectId: string;
  managerId: string;
  title: string;
  endDate: Date;
  positionTitle: string;
  hierarchy: string;
  hiringDate: Date;
  location: string;
  status: RequisitionStatus;
  qualifications: string[];
  experience: number;
};

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
  jobId: string;
  question: string;
  answer: string;
};
