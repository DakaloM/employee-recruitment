import { Context } from "~/context";
import { EmploymentType, Requisition, RequisitionHierarchy, RequisitionStatus, WorkPlace } from "./requisition";
import { faker } from "@erecruitment/testkit";
import { createBuilder } from "@erecruitment/datakit";
import { subtract } from "lodash";



export const requisitionBuilder = createBuilder(
  async ({objectId, ...attrs}: Partial<Requisition>, _factory, ctx) => {

   
    const title = faker.word.adjective();
    const endDate = faker.date.future({
      refDate: new Date(),
      years: (1 / 12 )+ 1
    });
    const positionTitle = faker.person.jobTitle();
    const workplace = faker.helpers.enumValue(WorkPlace);
    const employmentType = faker.helpers.enumValue(EmploymentType);
    const hierarchy = faker.helpers.enumValue(RequisitionHierarchy);
    const hiringDate = faker.date.future({
      refDate: new Date(),
      years: (1 / 12) + 2,
    })
    const status = faker.helpers.enumValue(RequisitionStatus);
    const experience = 4;
    const qualifications = faker.helpers.arrayElements(['Tertiary degree or equivalent', 'Passion for social working']);
    const manager = {
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
    }

    return Requisition.fromJson({
      objectId: objectId || faker.string.uuid(),
      manager,
      title,
      endDate,
      positionTitle,
      workplace,
      employmentType,
      hierarchy,
      hiringDate,
      status,
      experience,
      qualifications,
      ...attrs
    })
  }
)