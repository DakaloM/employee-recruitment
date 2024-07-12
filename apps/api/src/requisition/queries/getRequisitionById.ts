import { Context } from "~/context";
import { Requisition } from "../requisition";
import { NotFoundError } from "@erecruitment/serverkit";

export async function getRequisitionById(id: string, ctx: Context) {
  const requisition = await Requisition.query(ctx.db)
    .findById(id)
    .withGraphFetched("position");

  if (!requisition) {
    throw new NotFoundError({
      message: "Requisition not found",
    });
  }

  return requisition;
}
