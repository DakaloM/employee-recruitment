import { Context } from "~/context";
import { Advert } from "../advert";
import { NotFoundError } from "@erecruitment/serverkit";

export async function getAdvertById(id: string, ctx: Context) {
  const advert = await Advert.query(ctx.db)
    .findById(id)
    .withGraphFetched("requisition")
    .withGraphFetched("questions")
    

  if (!advert) {
    throw new NotFoundError({
      message: "Advert not found",
    });
  }

  return advert;
}
