import { builder } from "~/graphql/builder";
import { EmploymentTypeSchema, RequisitionHierarchySchema, RequisitionSchema, WorkPlaceSchema } from "./requisition";
import { isDashboardOperator } from "~/account/shield/user";
import { createRequisition } from "../mutation";


const CreateRequisitionInput = builder.inputType('CreateRequisitionInput', {
  fields: (t) => ({
    objectId: t.string({required: true}),
    title: t.string({required: true}),
    endDate: t.field({type: 'Date', required: true}),
    hierarchy: t.field({type: RequisitionHierarchySchema, required: true}),
    hiringDate: t.field({type: 'Date', required: true}),
    experience: t.int({required: true}),
    workplace: t.field({type: WorkPlaceSchema, required: true}),
    employmentType: t.field({type: EmploymentTypeSchema, required: true}),
  })
});

builder.mutationField('createRequisition', (t) => 
  t.field({
    shield: isDashboardOperator,
    description: 'Create a requisition for a job post',
    args: {
      input: t.arg({required: true, type: CreateRequisitionInput})
    },
    type: RequisitionSchema,
    resolve: async (_root, args, ctx) => {
      return await createRequisition(args.input, ctx);
    }
  })
)