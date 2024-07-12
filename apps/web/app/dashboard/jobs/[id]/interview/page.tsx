
import { ArrowLeftIcon, Briefcase, Info, MapPin, User } from "lucide-react";
import Link from "next/link";
import { apiClient } from "~/client/index";
import { DisplayInterviewPackage } from "~/modules/interviewPackage";
import { ItemLabel } from "~/modules/shared";


async function Page(props: Props) {
  const { params } = props;

  const interviewPackage = await apiClient.interviewPackage(params.id);

  if (!interviewPackage) {
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
        <h1 className="text-xl font-semibold text-gray-500">Interview preparations</h1>
       
      </div>

      <DisplayInterviewPackage interviewPackage={interviewPackage} />

      
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default Page;
