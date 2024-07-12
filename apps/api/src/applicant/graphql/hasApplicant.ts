import { builder } from '~/graphql/builder';

import { getUserApplicant } from '../queries';
import { ApplicantSchema } from './applicant';

//@ts-ignore
export const HasApplicantType = builder.interfaceType('HasApplicant', {
  fields: (t) => ({
    applicant: t.field({
      type: ApplicantSchema,
      args: {},
      description: 'An applicant object',
      resolve: async (root, _args, ctx) => {
        //@ts-ignore
        return getUserApplicant(root.id, ctx)
      },
    }),
  }),
});


