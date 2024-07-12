import { builder } from "~/graphql/builder";
import { Position } from "../position";
import { isActiveUser, isDashboardOperator } from "~/account/shield";
import { getPositionById, getPositions } from "../queries";

export const PositionFilter = builder.inputType("PositionFilter", {
  fields: (t) => ({
    search: t.field({ type: "String", required: false }),
  }),
});


export const PositionSchema = builder.objectType(Position, {
  name: "Position",
  description: "Position",
  shield: isActiveUser,
  fields: (t) => ({
    id: t.exposeID("id"),
    positionTitle: t.exposeString("positionTitle"),
    location: t.exposeString("location"),
    qualifications: t.exposeStringList("qualifications"),
    manager: t.expose("manager", {
      type: "JSON",
    }),
  }),
})

builder.queryField("positions", (t) =>
  t.field({
    shield: isActiveUser,
    description: "A list of vacant positions",
    args: {},
    type: [PositionSchema],
    resolve: async (_root, args, ctx) => {
      return await getPositions(ctx);
    },
  })
);

builder.queryField("position", (t) =>
  t.field({
    shield: isActiveUser,
    description: "A list of vacant positions",
    args: {
      id: t.arg.id({  required: true }),
    },
    type: PositionSchema,
    resolve: async (_root, args, ctx) => {
      return await getPositionById(args.id.toString(), ctx);
    },
  })
);