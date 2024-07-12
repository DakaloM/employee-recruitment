import { JobSearch, JobsDisplay } from "~/modules/jobs";
import { apiClient } from "../client";
import { cookies } from "next/headers";


export default async function Page(props: Props) {

  const { searchParams } = props;

  const { search, page = '1', count = '20' } = searchParams;

  const jobs = await apiClient.adverts({
    limit: Number(count),
    page: Number(page),
    search: search
  })

  const token = cookies().get('token')


  return (
    <div className="flex flex-col items-center py-10 gap-8 w-full lg:p-8">
      <JobSearch />

      <h1 className="text-xl font-bold underline text-gray-500 ">Job feed</h1>
      <hr className="border-none h-[1px] w-full bg-gray-200"/>

      <JobsDisplay jobs={jobs} token={token}/>
    </div>
  );
}




interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

