import { builder } from "~/graphql/builder";
import { AdvertSchema } from "./advert";
import { getAdvertById } from "../queries";


//@ts-ignore
export const HasJobSchema = builder.interfaceType('HasJob', {
 
  fields: (t) => ({
    job: t.field({
      type: AdvertSchema,
      args: {},
      description: 'Job object',
      
      resolve: async (root, args, ctx) => {
        //@ts-ignore
        return await getAdvertById(root.userId, ctx);
      },
    }),
  }),
});
