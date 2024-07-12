import { QuestionFragment } from '@erecruitment/client';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@erecruitment/ui';

import { MoreHorizontalIcon } from 'lucide-react';
import { NewInterView } from '~/modules/interview';

import { DeleteJobQuestion } from './DeleteQuestion';
import { EditQuestion } from './EditQuestion';

export function QuestionActionButtons({ question }: QuestionActionButtonsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0">
        <div className="flex flex-col gap-y-2">
          <EditQuestion question={question} />
          <DeleteJobQuestion questionId={question.id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type QuestionActionButtonsProps = {
  question: QuestionFragment;
};
