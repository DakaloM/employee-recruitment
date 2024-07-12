
import { faker } from "@erecruitment/testkit";
import { Knex } from "knex";
import { User } from "~/account";
import { newId } from "~/domain/id";


export async function seed(knex: Knex): Promise<void> {

    const applicants = (await knex("applicant"));

    if (applicants.length === 0) {
        return;
    }

    const users = await knex("user");

    

    const applicantList = applicants.map(applicant => {

        const user = users.find(user => user.id === applicant.userId);

        return {
          ...applicant,
          user: {
            ...user
          }
        }
    })

    console.log("applicantList: ", applicantList)

    const contact = applicantList.map(async(applicant) => {

        return {
            id: newId("uuid"),
            userId: applicant.userId,
            email: applicant.user.email,
            mobileNumber: faker.phone.number(),
            businessNumber: faker.phone.number(),
            privateNumber: faker.phone.number(),

        }
    })

    const data = await Promise.all(contact);



  await knex.transaction(async (trx) => {
    await trx("contact").insert(data).onConflict('email').ignore();
  });
}

