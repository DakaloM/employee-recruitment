import { renderToStringWithData } from "@apollo/client/react/ssr";
import { Shortlist } from "../shortlist";
import { ShortlistFilter } from "@erecruitment/client";
import { applyPagination } from "~/domain/search";


export async function getShortlists(input: ShortlistFilter, ctx: any) {

    const query = Shortlist.query(ctx.db).select('shortlist.*');

    Shortlist.applySearch(query, ctx.db, input?.search);

    applyPagination(query, input);

    const shortlists = await Shortlist.query(ctx.db);

    return shortlists;
}