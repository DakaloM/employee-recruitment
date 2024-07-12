import { builder } from '~/graphql/builder';

import { applyPagination, createPayload } from '~/domain/search';

import { Applicant } from '../applicant';
import { ApplicantSchema } from './applicant';
import { isActiveUser } from '~/account/shield';


const ApplicantsPayloadSchema = createPayload('ApplicantsPayload', ApplicantSchema)

builder.queryField('applicants', (t) =>
  t.field({
    shield: isActiveUser,
    description: 'A list of applicants',
    args: {
      limit: t.arg.int({ defaultValue: 20 }),
      page: t.arg.int({ defaultValue: 1 }),
    },
    type: [ApplicantSchema],
    resolve: async (_root, args, ctx) => {
      const query = Applicant.query(ctx.db).withGraphFetched('user');

      applyPagination(query, args);

      const applicants = await query;

      return applicants;
    },
  }),
);
