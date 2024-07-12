import { builder } from '~/graphql/builder';

import { isActiveUser } from '~/account/shield';

import { Application, ApplicationStatus } from '../application';
import { getApplicationById, getApplications } from '../queries';
import { ApplicantSchema, HasApplicantType } from '~/applicant/graphql';
import { AdvertSchema, HasRequisitionType, RequisitionSchema } from '~/requisition/graphql';
import { HasJobSchema } from '~/requisition/graphql/hasJob';
import { HasUserSchema, UserSchema } from '~/account/graphql';
import { sequence } from '@erecruitment/testkit/dist/faker';


export const ApplicationStatusSchema = builder.enumType(ApplicationStatus, {
  name: 'ApplicationStatus',
  description: 'Application status',
});

export const ApplicationSchema = builder.objectType(Application, {
  name: 'Application',
  description: 'Job application submitted by an applicant',
  shield: isActiveUser,
  interfaces: [HasApplicantType, HasRequisitionType, HasUserSchema, HasJobSchema],
  fields: (t) => ({
    id: t.exposeID('id'),
    applicantId: t.exposeString('applicantId'),
    jobId: t.exposeString('jobId'),
    jobTitle: t.exposeString('jobTitle'),
    name: t.exposeString('name'),
    sequence: t.exposeInt('sequence'),
    surname: t.exposeString('surname'),
    requisitionId: t.exposeString('requisitionId'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
      description: 'Creation date of the application',
    }),
    status: t.expose('status', {
      type: ApplicationStatusSchema,
      description: 'Application status',
    }),
    applicant: t.expose('applicant', {
      type: ApplicantSchema,
      description: 'Applicant'
    }),
    requisition: t.expose('requisition', {
      type: RequisitionSchema,
      description:'Requisition'
    }),
    job: t.expose('job', {
      type: AdvertSchema,
      description:'Requisition'
    }),
    user: t.expose('user', {
      type: UserSchema,
      description:'User'
    })
  }),
});

const applicationFilter = builder.inputType('ApplicationFilter', {
  fields: (t) => ({
    limit: t.field({ type: "Int", defaultValue: 10 }),
    page: t.field({ type: "Int", defaultValue: 1 }),
    search: t.field({ type: "String", required: false }),
  })
});

builder.queryField('applications', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'List of application',
    args: {
      input: t.arg({type: applicationFilter, required: false})
    },
    type: [ApplicationSchema],
    resolve: async (_root, args, ctx) => {
      return getApplications(args.input || {}, ctx)
    }
  })
));

builder.queryField('application', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'One application',
    args: {
      id: t.arg.id({required: true})
    },
    type: ApplicationSchema,
    resolve: async (_root, args, ctx) => {
      return getApplicationById(args?.id.toString(), ctx)
    }
  })
));


