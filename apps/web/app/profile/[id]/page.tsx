import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { apiClient } from "~/client/server-proxy";
import { ProfileDisplay } from "~/modules/profile";

export default async function Page(props: Props) {
  const { searchParams } = props;
  const params = props.params;

  const { search: name, page = "1", count = "20" } = searchParams;
  const profile = await apiClient.userApplicant(params.id);

  return (
    <div className="flex flex-col gay-4 items-center py-10 gap-8 w-full px-2 lg:px-8 lg:h-full justify-center">
      <div className="w-max flex items-center gap-2">
        <Link href={"/"} className="w-fit h-fit cursor-pointer">
          <ChevronLeft
            className="p-2 bg-white text-gray-400 rounded-full hover:scale-110 transition-all"
            size={40}
          />
        </Link>
        <span className="text-gray-500">Browse jobs</span>
      </div>
      <ProfileDisplay profile={profile} />
    </div>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
