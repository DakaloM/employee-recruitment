import { ArrowLeftIcon, User } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '~/client/index';
import { ViewUser } from '~/modules/user';

async function Page(props: Props) {
  const { params } = props;

  const currentUser = await apiClient.user({ id: params.id });

  return (
    <section className="grid gap-8 w-full">
      <div className="flex gap-4 place-items-center">
        <Link href="/user" className="hover:bg-gray-300/50 rounded-lg">
          <ArrowLeftIcon className="p-2" size={38} />
        </Link>
        <User className="bg-primary rounded-lg p-2 text-white" size={38} />
        <span className="text-md font-semibold">Viewing User #{currentUser.sequence}</span>
      </div>
      <div className="dark:bg-gray-800 bg-gray-200 h-px w-full" />
      {/* <ViewUser user={currentUser} /> */}
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default Page;
