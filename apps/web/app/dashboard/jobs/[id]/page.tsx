import { ArrowLeftIcon, Briefcase, User } from "lucide-react";
import Link from "next/link";
import { apiClient } from "~/client/index";
import { ViewJob } from "~/modules/jobs/components/ViewJob";
import { ViewUser } from "~/modules/user";

async function Page(props: Props) {
  const { params } = props;

  const job = await apiClient.advert({ id: params.id });
  const requisition = await apiClient.requisition({ id: job?.requisitionId });

  if (!job || !requisition) {
    return;
  }

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="flex gap-4 place-items-center border-b pb-4">
        <Link
          href="/dashboard/jobs"
          className="hover:bg-gray-300/50 rounded-lg"
        >
          <ArrowLeftIcon className="p-2" size={38} />
        </Link>
        <Briefcase className="bg-primary rounded-lg p-2 text-white" size={38} />
        <span className="text-lg font-semibold">{job.positionTitle}</span>
      </div>

      <ViewJob job={job} requisition={requisition!} />
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default Page;
