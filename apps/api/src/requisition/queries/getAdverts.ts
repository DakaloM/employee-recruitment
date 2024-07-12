import { AdvertFilter } from "@erecruitment/client";
import { Context } from "~/context";
import { Advert } from "../advert";
import { applyPagination } from "~/domain/search";


export async function getAdverts(ctx: Context, input: AdvertFilter) {
  const query = Advert.query(ctx.db).select('advert.*');

  Advert.applySearch(query, ctx.db, input?.search);

  query
    .withGraphFetched('requisition')
    .withGraphFetched('questions');

  applyPagination(query, input);

  const adverts = await query;

  return adverts;
}