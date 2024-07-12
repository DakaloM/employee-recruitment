
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@erecruitment/ui';

import {
  MoreHorizontalIcon,
} from 'lucide-react';
import { NewInterView } from '~/modules/interview';
import { ShortlistApplication } from './ShortlistApplication';
import { ApplicationStatus } from '@erecruitment/client';
import { ChangeApplicationStatus } from './UpdateApplicationStatus';

export function ApplicationActionButtons({jobId, applicantId, applicationId, status}: ApplicationActionButtonsProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0">
        <NewInterView jobId={jobId} applicantId={applicantId} applicationId={applicationId}/>
        {
          status === ApplicationStatus.Approved ?
          <ChangeApplicationStatus applicationId={applicationId} status={ApplicationStatus.Declined} title='Decline'/> :
          <ChangeApplicationStatus applicationId={applicationId} status={ApplicationStatus.Approved} title='Approve' buttonClassName='hover:bg-green-600 hover:text-white'/>
        }
       {/* <ShortlistApplication jobId={jobId} applicantId={applicantId} applicationId={applicationId}/> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ApplicationActionButtonsProps = {
  applicationId: string;
  applicantId: string;
  jobId: string;
  status: ApplicationStatus
}

