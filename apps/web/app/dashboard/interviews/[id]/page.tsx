import { ArrowLeftIcon, ClipboardList, Component, User } from "lucide-react";
import Link from "next/link";
import { apiClient } from "~/client/index";
import { DisplayInterview } from "~/modules/interview";

async function Page(props: Props) {
  const { params } = props;

  const interview = await apiClient.interview(params.id);

  return (
    <div className="grid gap-8 w-full">
      <div className="flex gap-4 place-items-center">
        <Link
          href="/dashboard/interviews"
          className="hover:bg-gray-300/50 rounded-lg"
        >
          <ArrowLeftIcon className="p-2" size={38} />
        </Link>
        <Component className="bg-primary rounded-lg p-2 text-white" size={38} />
        {/* <span className="text-md font-semibold">Viewing Requisition #{requisition.sequence}</span> */}
      </div>

      <DisplayInterview interview={interview} />
    </div>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default Page;
