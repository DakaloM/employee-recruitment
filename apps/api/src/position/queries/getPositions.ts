
import { Context } from "~/context";
import { Position } from "../position";

export async function getPositions(ctx: Context) {
  const positions = await Position.query(ctx.db).select("*");

  return positions;
}
