import { QuestionFragment } from '@erecruitment/client';
import { Button } from '@erecruitment/ui';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { executeApi } from '~/client/api';
import { ItemLabel } from '~/modules/shared';

import { QuestionActionButtons } from './QuestionActionButtons';

export const Question = ({ question }: QuestionsProps) => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-y-4 p-8 shadow-md rounded-lg border border-gray-100 relative">
      <div className="flex flex-col w-full gap-y-2">
        <ItemLabel label="Question" value={question.question} />

        <ItemLabel label="Answer" value={question.answer} />
      </div>

      <div className="absolute top-8 right-8 w-fit h-fit">
        <QuestionActionButtons question={question} />
      </div>
    </div>
  );
};

type QuestionsProps = {
  question: QuestionFragment;
};
