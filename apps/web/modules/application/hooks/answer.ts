import { AnswerFragment } from '@erecruitment/client';
import { get } from 'lodash';
import { useCallback } from 'react';

import { executeApi } from '~/client/api';

type Args = {
  refId: string;
  applicantId: string;
};

const getAnswers = async (input: Args) => {
  return async function answers() {
    const data = await executeApi('answers', { ...input });

    console.log(data)

    const items = data as AnswerFragment[];

    return items;
  };
};

export function useAnswers (input: Args) {
    const answers = useCallback(() => getAnswers(input), [input]);

    return answers;
}
