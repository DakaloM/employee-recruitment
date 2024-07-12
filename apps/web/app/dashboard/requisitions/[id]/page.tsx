import { ArrowLeftIcon, ClipboardList, User } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '~/client/index';
import { DisplayRequisition } from '~/modules/requisition';

async function Page(props: Props) {
  const { params } = props;

  const requisition = await apiClient.requisition({ id: params.id });


  return (
    <div className="grid gap-8 w-full">
      <div className="flex gap-4 place-items-center">
        <Link href="/dashboard/requisitions" className="hover:bg-gray-300/50 rounded-lg">
          <ArrowLeftIcon className="p-2" size={38} />
        </Link>
        <ClipboardList className="bg-primary rounded-lg p-2 text-white" size={38} />
        {/* <span className="text-md font-semibold">Viewing Requisition #{requisition.sequence}</span> */}
      </div>
      

      <DisplayRequisition requisition={requisition}/>
      
    </div>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default Page;
