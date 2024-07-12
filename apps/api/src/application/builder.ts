
import { createBuilder } from "@erecruitment/datakit";
import { faker } from "@erecruitment/testkit";

import { Gender, Race, Title, User, UserRole } from "~/account";
import { Context } from "~/context";

import { Application, ApplicationStatus } from "./application";
import { Requisition } from "~/requisition";
import { EmploymentType, RequisitionHierarchy, RequisitionStatus, WorkPlace } from "~/requisition/requisition";
import { Applicant } from "~/applicant";

const getUserId = async (ctx: Context) => {
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  const role = UserRole.Admin;
  const race = Race.African;
  const birthDate = faker.date.past({
    refDate: new Date(),
    years: 20,
  });
  const email = faker.internet.email();
  const gender = Gender.Female;
  const idNumber = faker.string.numeric(13);
  const sortName = `${name}${surname}`.toLowerCase();
  const title = Title.Mrs;

  const userId = (
    await User.query(ctx.db).insert({
      name,
      surname,
      role,
      race,
      birthDate,
      email,
      gender,
      idNumber,
      sortName,
      title,
    })
  ).id;

  return userId;
};

const getApplicantId = async (ctx: Context, attrs: Partial<Application>) => {
  const applicantId = attrs.applicantId || attrs.applicant?.id;

  const applicant = await Applicant.query(ctx.db).insert({
    userId: await getUserId(ctx),
    applicantNumber: faker.string.alphanumeric(10),
  });

  return applicantId || applicant.id;
};

const getRequisitionId = async (ctx: Context) => {
  const title = faker.word.adjective();
  const endDate = faker.date.future({
    refDate: new Date(),
    years: 1 / 12 + 1,
  });
  const positionTitle = faker.person.jobTitle();
  const workplace = faker.helpers.enumValue(WorkPlace);
  const employmentType = faker.helpers.enumValue(EmploymentType);
  const hierarchy = faker.helpers.enumValue(RequisitionHierarchy);
  const hiringDate = faker.date.future({
    refDate: new Date(),
    years: 1 / 12 + 2,
  });
  const status = faker.helpers.enumValue(RequisitionStatus);
  const experience = 4;
  const qualifications = faker.helpers.arrayElements([
    "Tertiary degree or equivalent",
    "Passion for social working",
  ]);
  const responsibilities = faker.helpers.arrayElements([
    "Tertiary degree or equivalent",
    "Passion for social working",
  ]);
  const manager = {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
  };

  return (
    await Requisition.query(ctx.db).insert({
      title,
      positionTitle,
      endDate,
      hiringDate,
      workplace,
      employmentType,
      hierarchy,
      status,
      experience,
      qualifications,
      responsibilities,
    })
  ).id;
};

export const applicationBuilder = createBuilder(
  async (input: Partial<Application>, ctx: Context) => {
    const applicantId = await getApplicantId(ctx, input);
    const requisitionId = await getRequisitionId(ctx);
    const status = faker.helpers.enumValue(ApplicationStatus);

    return Application.fromJson({
      applicantId,
      requisitionId,
      status,
    });
  }
);
