import { Context } from "~/context";
import { Position } from "../position";
import { NotFoundError } from "@erecruitment/serverkit";

export async function getPositionById(id: string, ctx: Context) {
  const position = await Position.query(ctx.db).findById(id);

  if (!position) {
    throw new NotFoundError({
      message: `Position not found`,
    });
  }

  return position;
}
