'use client';
import { FullAdvertFragment } from '@erecruitment/client';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@erecruitment/ui';

import { MoreHorizontalIcon, ViewIcon } from 'lucide-react';
import { NewInterViewPackage } from '~/modules/interviewPackage';

import { DeleteJob } from './DeleteJob';
import { useRouter } from 'next/navigation';

export function JobActionButtons({ job }: JobActionButtonsProps) {

    const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0">
        <NewInterViewPackage jobId={job.id} />
        <Button
          className="flex my-auto hover:bg-green-600 hover:text-white w-full "
          variant={'ghost'}
          onClick={() => router.push(`/dashboard/jobs/${job.id}/interview`)}
        >
          <ViewIcon className="w-4 h-4" />
          <span className="ml-2">View interview package</span>
        </Button>
        <DeleteJob jobId={job.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type JobActionButtonsProps = {
  job: FullAdvertFragment;
};
