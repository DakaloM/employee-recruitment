import { builder } from '~/graphql/builder';

import { isDashboardOperator, isSecretaryGeneral } from '~/account/shield/user';

// import { updateRequisition, updateRequisitionStatus } from '../mutation';
import {
  EmploymentTypeSchema,
  RequisitionHierarchySchema,
  RequisitionSchema,
  RequisitionStatusSchema,
  WorkPlaceSchema,
} from './requisition';
import { updateRequisition, updateRequisitionStatus } from '../mutation';

const UpdateRequisitionInput = builder.inputType('UpdateRequisitionInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string({ required: false }),
    endDate: t.field({ type: 'Date', required: false }),
    location: t.string({required: false}),
    positionTitle: t.string({ required: false }),
    hierarchy: t.field({ type: RequisitionHierarchySchema, required: false }),
    hiringDate: t.field({ type: 'Date', required: false }),
    qualifications: t.stringList({ required: false }),
    responsibilities: t.stringList({ required: false }),
    workPlace: t.field({ type: WorkPlaceSchema, required: false }),
    employmentType: t.field({ type: EmploymentTypeSchema, required: false }),
    experience: t.int({ required: false }),
    managerId: t.string({ required: false }),
    managerObjectId: t.string({ required: false }),
    managerName: t.string({ required: false }),
    managerSurname: t.string({ required: false }),
  }),
});

const UpdateRequisitionStatusInput = builder.inputType('UpdateRequisitionStatusInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    status: t.string({ required: true }),
  }),
});

builder.mutationField('updateRequisition', (t) =>
  t.field({
    args: {
      input: t.arg({ type: UpdateRequisitionInput, required: true }),
    },
    type: RequisitionSchema,
    description: 'Update a requisition',
    shield: isDashboardOperator,
    resolve: async (_root, args, ctx) => {
      return await updateRequisition(args.input, ctx);
    },
  }),
);

builder.mutationField('updateRequisitionStatus', (t) =>
  t.field({
    args: {
      input: t.arg({ type: UpdateRequisitionStatusInput, required: true }),
    },
    type: RequisitionSchema,
    description: 'Update a requisition status',
    shield: isSecretaryGeneral,
    resolve: async (_root, args, ctx) => {

      return await updateRequisitionStatus(args.input, ctx);
    },
  }),
);
