import { builder } from "~/graphql/builder";
import { RequisitionSchema } from "./requisition";
import { getRequisitionById } from "../queries";

//@ts-ignore
export const HasRequisitionType = builder.interfaceType('HasRequisition', {
  fields: (t) => ({
    requisition: t.field({
      type: RequisitionSchema,
      args: {},
      description: 'A requisition the application belongs to',
      resolve: async (root, _args, ctx) => {
        //@ts-ignore
        return getRequisitionById(root.requisitionId, ctx)
      }
    })
  })
})