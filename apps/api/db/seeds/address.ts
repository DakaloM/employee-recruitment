import { AddressType, AdvertStatus, RequisitionStatus } from "@erecruitment/client";
import { faker } from "@erecruitment/testkit";
import { Knex } from "knex";
import { newId } from "~/domain/id";
import { Region } from "~/education";

export async function seed(knex: Knex): Promise<void> {

    const applicants = await knex("applicant");

    if (applicants.length === 0) {
        return;
    }

    const addresses = applicants.map((applicant) => {

        return {
            id: newId("uuid"),
            userId: applicant.userId,
            addressType: faker.helpers.enumValue(AddressType),
            streetAddress: faker.location.streetAddress(),
            country: faker.location.country(),
            city: faker.location.city(),
            region: faker.helpers.enumValue(Region),
            postalCode: faker.location.zipCode(),
            contactAddress: faker.helpers.arrayElement([true, false]),

        }
    })



  await knex.transaction(async (trx) => {
    await trx("address").insert(addresses);
  });
}

