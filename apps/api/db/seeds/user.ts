import { Gender, Race, Title, UserRole } from "@erecruitment/client";
import { faker } from "@erecruitment/testkit";

import * as argon from "argon2";
import { Knex } from "knex";
import { User, UserStatus } from "~/account";
import { newId } from "~/domain/id";

const usersList = Array.from({ length: 200 }).map((_, index) =>
  faker.internet.email()
);

const list = [
  "dakalo-admin@ndt.co.za",
  "dakalo-applicant@ndt.co.za",
  "dakalo-SGeneral@ndt.co.za",
  "dakalo-recruiter@ndt.co.za",
  "dakalo-superAdmin@ndt.co.za",
];

const users = usersList.concat(list);

export async function seed(knex: Knex): Promise<void> {
  const hasRan = Boolean(
    await knex("user").select("id").whereIn("email", users).first()
  );

  if (hasRan) {
    return;
  }

  const user = async (email: string) => {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const middleName = faker.person.middleName();
    const password = await argon.hash(email);
    const birthDate = faker.date.past({
      refDate: new Date(),
      years: 20,
    });
    const title = faker.helpers.enumValue(Title);
    const race = faker.helpers.enumValue(Race);
    const idNumber = faker.string.alphanumeric(13);
    const sortName = User.getSortName(name, surname);
    const gender = faker.helpers.enumValue(Gender);
    const role = email.includes("superAdmin")
      ? UserRole.SuperAdmin
      : email.includes("applicant")
      ? UserRole.Applicant
      : email.includes("recruiter")
      ? UserRole.Recruiter
      : email.includes("superAdmin")
      ? UserRole.SuperAdmin
      : email.includes("SGeneral")
      ? UserRole.SecretaryGeneral
      : faker.helpers.enumValue(UserRole);

    return {
      id: newId("uuid"),
      name,
      surname,
      email,
      gender,
      middleName,
      password,
      birthDate,
      idNumber,
      title,
      race,
      role,
      sortName,
      status: UserStatus.Active,
    };
  };

  const data = await Promise.all(users.map(async (email) => user(email)));

  const applicantFromUsers = data.filter((user) => user.role === UserRole.Applicant);


  const applicants: Applicant[] =  applicantFromUsers.map( applicant => {

      return {
        id: newId("uuid"),
        userId: applicant.id,
        applicantNumber: faker.string.numeric(6),
        name: applicant.name,
        surname: applicant.surname,
      };

    })


  await knex("user").insert(data).onConflict("email").ignore();
  await knex("applicant").insert(applicants).onConflict("userId").ignore();
}

type Applicant = {
  userId: string;
  applicantNumber: string;
  name: string;
  surname: string;
};
