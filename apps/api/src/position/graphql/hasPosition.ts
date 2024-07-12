import { builder } from "~/graphql/builder";
import { PositionSchema } from "./position";
import { getPositionById } from "../queries";

//@ts-ignore
export const HasPositionType = builder.interfaceType('HasPosition', {
  fields: (t) => ({
    position: t.field({
      type: PositionSchema,
      args: {},
      description: 'List of vacant positions',
      resolve: async (root, _args, ctx) => {
        //@ts-ignore
        return getPositionById(root.id || root.position.id, ctx);
      }
    })
  })
})