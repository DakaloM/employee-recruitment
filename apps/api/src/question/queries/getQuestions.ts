import { Context } from "@apollo/client";
import { Question } from "../question";


export async function getQuestions(ctx: Context) {

    const questions = await Question.query(ctx.db);
    
    return questions;
}