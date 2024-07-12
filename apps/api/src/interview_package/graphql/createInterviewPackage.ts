import { builder } from '~/graphql/builder';

import { isDashboardOperator } from '~/account/shield';

import { createInterviewPackage } from '../mutation';
import { InterviewPackageSchema } from './interview_package';

const CreateInterviewPackageInput = builder.inputType('CreateInterviewPackageInput', {
  fields: (t) => ({
    jobId: t.string({ required: true }),
    date: t.field({ type: 'Date', required: true }),
    time: t.string({ required: true }),
    location: t.string({ required: true }),
    description: t.string({ required: true }),
  }),
});

builder.mutationField('createInterviewPackage', (t) =>
  t.field({
    shield: isDashboardOperator,
    description: 'Create interview package for a job',
    args: {
      input: t.arg({ type: CreateInterviewPackageInput, required: true }),
    },
    type: InterviewPackageSchema,
    resolve: async (_root, args, ctx) => {
      return createInterviewPackage(args.input, ctx);
    },
  }),
);
