import { Context } from "~/context";
import { Education } from "../education";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getEducationById(id: string, ctx:Context) {
  const education = await Education.query(ctx.db).findById(id);

  if(!education){
    throw new NotFoundError({
      message: 'Education not found'
    })
  }

  return education;
}