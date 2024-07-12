import { Context } from "~/context";
import { Advert } from "../advert";
import { NotFoundError } from "@erecruitment/serverkit";

export async function deleteAdvert(id: string, ctx: Context) {
   
    const job = await Advert.query(ctx.db).findById(id);

    if (!job) {
      throw new NotFoundError({
        message: "Job not found",
      });
    }

    return await Advert.query(ctx.db).deleteById(id);
}