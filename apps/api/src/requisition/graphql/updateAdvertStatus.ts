import { builder } from '~/graphql/builder';

import { isDashboardOperator } from '~/account/shield/user';

import { updateAdvertStatus } from '../mutation';
import { AdvertSchema } from './advert';

const UpdateAdvertStatusInput = builder.inputType('UpdateAdvertStatusInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    status: t.string({ required: true }),
  }),
});

builder.mutationField('updateAdvertStatus', (t) =>
  t.field({
    args: {
      input: t.arg({ type: UpdateAdvertStatusInput, required: true }),
    },
    type: AdvertSchema,
    description: 'Update a requisition',
    shield: isDashboardOperator,
    resolve: async (_root, args, ctx) => {
      return await updateAdvertStatus(args.input, ctx);
    },
  }),
);
