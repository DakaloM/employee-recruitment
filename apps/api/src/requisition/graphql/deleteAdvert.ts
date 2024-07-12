import { isDashboardOperator} from "~/account/shield/user";
import { builder } from "~/graphql/builder";
import { deleteAdvert } from "../mutation";


builder.mutationField('deleteAdvert', (t) => 
  t.field({
    args: {
      id: t.arg.id({required: true})
    },
    shield: isDashboardOperator,
    type: "JSON",
    resolve: async(_root, args, ctx) => {
      return await deleteAdvert(args.id.toString(), ctx);
    }
  })
)