import { isDashboardOperator } from "~/account/shield/user";
import { builder } from "~/graphql/builder";
import { updateApplicationStatus } from "../mutation";
import { ApplicationSchema } from "./application";



const UpdateApplicationStatusInput = builder.inputType('UpdateApplicationStatusInput', {
  fields: (t) => ({
    id: t.field({type: 'String', required: true}),
    status: t.field({type: 'String', required: true})
  })
});

builder.mutationField('updateApplicationStatus', (t) => (
  t.field({
    shield: isDashboardOperator,
    description: 'Update application status',
    args: {
      input: t.arg({type: UpdateApplicationStatusInput, required: true})
    },
    type: ApplicationSchema,
    resolve: async (_root, args, ctx) => {
      return updateApplicationStatus(args.input, ctx);
    }
  })
))