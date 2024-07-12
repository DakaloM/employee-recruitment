import { Context } from "~/context";
import { Shortlist } from "../shortlist";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getShortlistById( id: string, ctx: Context) {

    const shortlist = await Shortlist.query(ctx.db).findById(id);
    if (!shortlist) {
        throw new NotFoundError({
            message: "Shortlist not found",
        });
    }
    return shortlist;
}