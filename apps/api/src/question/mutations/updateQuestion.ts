import { UpdateQuestionInput } from '@erecruitment/client';
import { NotFoundError } from '@erecruitment/serverkit';

import { Context } from '~/context';

import { Question } from '../question';

export async function updateQuestion(input: UpdateQuestionInput, ctx: Context) {
  const { id, ...rest } = input;

  const existingQuestion = await Question.query(ctx.db).findById(id);

  if (!existingQuestion) {
    throw new NotFoundError({
      message: 'Question not found',
    });
  }

  const patchInput = JSON.parse(JSON.stringify(rest));

  const updatedQuestion = existingQuestion.$query(ctx.db).updateAndFetch({
    ...patchInput,
  });

  return updatedQuestion;
}
