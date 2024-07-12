import { isApplicant } from '~/account/shield/user';
import { builder } from '~/graphql/builder';
import { ApplicationSchema } from './application';
import { createApplication } from '../mutation';

const Args = builder.inputType("JobQuestionArgs", {
  fields: (t) => ({
    questionId: t.string({ required: true }),
    answer: t.string({ required: true }),
  }),
});


const CreateApplicationInput = builder.inputType('CreateApplicationInput', {
  fields: (t) => ({
    jobId: t.field({ type: 'String', required: true }),
    requisitionId: t.field({ type: 'String', required: true }),
    answers: t.field({type: [Args], required: true})
  }),
});


builder.mutationField('createApplication', (t) => (
  t.field({
    shield: isApplicant,
    description: 'Create an application',
    args: {
      input: t.arg({type: CreateApplicationInput, required: true})
    },
    type: ApplicationSchema,
    resolve: async (_root, args, ctx) => {
      return createApplication(args.input, ctx);
    }
  })
))