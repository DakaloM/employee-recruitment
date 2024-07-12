import { UserRole } from '@erecruitment/client';
import '@erecruitment/ui/globals.css';

import { cookies } from 'next/headers';
import { apiClient } from '~/client/server-proxy';
import { SideNav, TopNav } from '~/modules/shared/';

export default async function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    
        <Content>{children}</Content>
    
  );
}
async function Content({ children }: any) {
  const token = cookies().get('token');
  const profile = token ? await apiClient.profile() : undefined;

  const role = profile?.role;

  if (!profile || role === UserRole.Applicant) {
    return children;
  }

  return (
    <div className="flex w-full h-full m-0 p-0">
      <div className="w-80">
        <SideNav />
      </div>
      <div className="flex-1 flex flex-col overflow-clip bg-white">
        <TopNav profile={profile} />
        <div className="py-8 px-10 border h-full border-none overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
