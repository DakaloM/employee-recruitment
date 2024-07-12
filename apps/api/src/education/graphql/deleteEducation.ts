import { number } from "zod";
import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { deleteEducation } from "../mutation";


builder.mutationField('deleteEducation', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Delete education',
    args: {
      id: t.arg.id({required: true})
    },
    type: 'Int',
    resolve: async(_root, args, ctx) => {
      return deleteEducation(args.id.toString(), ctx);
    }
  })
))