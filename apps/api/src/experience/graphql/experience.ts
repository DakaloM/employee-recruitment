import { builder } from '~/graphql/builder';

import { isActiveUser } from '~/account/shield';

import { Experience } from '../experience';
import { getExperienceById, getUserExperiences } from '../queries';
import { RegionSchema } from '~/education/graphql';

export const ExperienceSchema = builder.objectType(Experience, {
  name: 'Experience',
  description: 'A user work experience',
  shield: isActiveUser,

  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    employer: t.exposeString('employer'),
    startDate: t.expose('startDate', { type: 'Date', description: 'Experience start date' }),
    endDate: t.expose('endDate', { type: 'Date', description: 'Experience end date' }),
    country: t.exposeString('country'),
    region: t.expose('region', {type: RegionSchema, description: 'Region'}),
    industry: t.exposeString('industry'),
    jobTitle: t.exposeString('jobTitle'),
    workContract: t.exposeString('workContract'),
  }),
});

builder.queryField('experience', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Get single experience by id',
    args: {
      id: t.arg.id({required: true})
    },
    type: ExperienceSchema,
    resolve: async(_root, args, ctx) => {
      return getExperienceById(args.id.toString(), ctx);
    }
  })
));

builder.queryField('userExperiences', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'User experiences',
    args: {
      userId: t.arg({type: 'String', required: true})
    },
    type: [ExperienceSchema],
    resolve: async(_root, args, ctx) => {
      return getUserExperiences(args.userId.toString(), ctx);
    }
  })
));

