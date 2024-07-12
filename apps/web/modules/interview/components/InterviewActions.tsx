
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@erecruitment/ui';

import {
  MoreHorizontalIcon,
} from 'lucide-react';
import { NewInterView } from '~/modules/interview';
import { ReScheduleInterview } from './ReScheduleInterview';
import { CancelInterview } from './CancelInterview';


export function InterviewActionButtons({interviewId}: InterviewActionButtonsProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0">
      <ReScheduleInterview interviewId={interviewId}/>
      <CancelInterview interviewId={interviewId}/>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type InterviewActionButtonsProps = {
  interviewId: string;

}

