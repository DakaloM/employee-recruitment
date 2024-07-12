import { RequisitionHierarchy, RequisitionStatus } from '@erecruitment/client';
import { EmploymentType, WorkPlace } from '~/requisition/requisition';
import { faker } from '@erecruitment/testkit';
import pluginName from '@pothos/plugin-with-input';

import { Knex } from 'knex';
import { newId } from '~/domain/id';

export async function seed(knex: Knex): Promise<void> {
  const requisitions = await knex('requisition').select('id');
  //   if (requisitions.length > 0) {
  //     return;
  //   }

  const vacantPositions: VacantPositionType[] = [];
  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const id = newId('uuid');
      const manager = {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
      }
      const positionTitle = faker.person.jobTitle();
      const location = faker.location.streetAddress();
      const qualifications: string[] = Array.from({length: 7}).map(() => {
        const qualification = faker.word.words(10);
        return qualification
      })

      const vacantPosition = {
        id: newId('uuid'),
        positionTitle,
        location,
        qualifications,
        manager
      }
      vacantPositions.push(vacantPosition);
      return vacantPosition;
    }),
  );


  const newRequisitions: Requisition[] = [];
  await Promise.all(
    vacantPositions.map(async (position) => {
      const objectId = position.id
      const title = faker.person.jobType();
      const positionTitle = position.positionTitle;
      const workplace = faker.helpers.enumValue(WorkPlace);
      const employmentType = faker.helpers.enumValue(EmploymentType)
      const endDate = faker.date.future({
        refDate: new Date(),
        years: 1 / 12 + 2,
      });
      const hierarchy = faker.helpers.enumValue(RequisitionHierarchy) as RequisitionHierarchy;
      const hiringDate = faker.date.future({
        refDate: new Date(),
        years: 1 / 12 + 2,
      });
      const location = position.location;
      const status = faker.helpers.enumValue(RequisitionStatus);
      const qualifications = position.qualifications;
      const responsibilities: string[] = Array.from({length: 7}).map(() => {
        const responsibility = faker.word.words(10);
        return responsibility
      })
      const experience = 4;

      const newRequisition = {
        objectId,
        title,
        positionTitle,
        workplace,
        employmentType,
        endDate,
        hiringDate,
        hierarchy,
        location,
        status,
        qualifications,
        responsibilities,
        experience,
      };

      newRequisitions.push(newRequisition);
      return newRequisition;
    }),
  );

  await knex('position').insert(vacantPositions);
  await knex('requisition').insert(newRequisitions).onConflict('objectId').ignore();
}



type Requisition = {
  objectId: string;
  title: string;
  endDate: Date;
  positionTitle: string;
  hierarchy: string;
  hiringDate: Date;
  location: string;
  status: RequisitionStatus;
  workplace: WorkPlace;
  employmentType: EmploymentType;
  qualifications: string[];
  experience: number;
};

type VacantPositionType = {
  id: string;
  positionTitle: string;
  location: string;
  qualifications: string[];
  manager: {
    name: string;
    surname: string;
  }
}
