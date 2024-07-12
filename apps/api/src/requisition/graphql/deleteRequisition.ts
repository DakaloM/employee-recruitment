import { isAdmin, isDashboardOperator} from "~/account/shield/user";
import { builder } from "~/graphql/builder";
import { deleteRequisition } from "../mutation";


builder.mutationField('deleteRequisition', (t) => 
  t.field({
    args: {
      id: t.arg.id({required: true})
    },
    shield: isDashboardOperator,
    type: "JSON",
    resolve: async(_root, args, ctx) => {
      return await deleteRequisition(args.id.toString(), ctx);
    }
  })
)