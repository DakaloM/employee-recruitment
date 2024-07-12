import { EducationLevel, FinalGrade, Region } from "@erecruitment/client";
import { faker } from "@erecruitment/testkit";
import { Knex } from "knex";
import { newId } from "~/domain/id";

export async function seed(knex: Knex): Promise<void> {
  const applicants = await knex("applicant");

  if (applicants.length === 0) {
    return;
  }

  const education = applicants.flatMap((applicant) => {
    return [
      {
        id: newId("uuid"),
        userId: applicant.userId,
        institution: faker.company.name(),
        startDate: faker.date.past(),
        endDate: faker.date.past(),
        country: faker.location.country(),
        region: faker.helpers.enumValue(Region),
        location: faker.location.city(),
        education_level: faker.helpers.enumValue(EducationLevel),
        finalGrade: faker.helpers.enumValue(FinalGrade),
      },
      {
        id: newId("uuid"),
        userId: applicant.userId,
        institution: faker.company.name(),
        startDate: faker.date.past(),
        endDate: faker.date.past(),
        country: faker.location.country(),
        region: faker.helpers.enumValue(Region),
        location: faker.location.city(),
        education_level: faker.helpers.enumValue(EducationLevel),
        finalGrade: faker.helpers.enumValue(FinalGrade),
      },
    ];
  });

  const experience = applicants.flatMap((applicant) => {
    return [
      {
        id: newId("uuid"),
        userId: applicant.userId,
        employer: faker.company.name(),
        startDate: faker.date.past(),
        endDate: faker.date.past(),
        country: faker.location.country(),
        region: faker.helpers.enumValue(Region),
        industry: faker.person.jobType(),
        jobTitle: faker.person.jobTitle(),
        workContract: faker.helpers.arrayElement(["Full-time", "Part-time"]),
      },
      {
        id: newId("uuid"),
        userId: applicant.userId,
        employer: faker.company.name(),
        startDate: faker.date.past(),
        endDate: faker.date.past(),
        country: faker.location.country(),
        region: faker.helpers.enumValue(Region),
        industry: faker.person.jobType(),
        jobTitle: faker.person.jobTitle(),
        workContract: faker.helpers.arrayElement(["Full-time", "Part-time"]),
      },
    ];
  });

  await knex.transaction(async (trx) => {
    await trx("education").insert(education);
    await trx("experience").insert(experience);
  });
}
