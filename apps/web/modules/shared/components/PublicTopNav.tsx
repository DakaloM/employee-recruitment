"use client";

import { UserFragment } from "@erecruitment/client";
import { Button } from "@erecruitment/ui";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "~/assets/index";
import { TopNavDropDown } from "./TopNavDropDown";

export function PublicTopNav({ profile }: TopNavProps, { params }) {
  const pathname = usePathname();

  const isDashboard: boolean = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return null;
  }

  return (
    <nav className="grid bg-card px-4 py-2 gap-0 sticky w-full border-b border-gray-200 shadow-sm">
      <div className="flex justify-between py-2">
        <div className="flex items-center gap-4">
          <Image src={Logo} alt="logo" className="w-10" />

          <div className="hidden md:flex flex-col items-start gap-0">
            <h4 className="font-semibold text-sm ">National Union</h4>
            <h4 className="font-semibold text-sm ">of Mine workers</h4>
          </div>
        </div>

        <div className="flex items-center">
          {profile && (
            <Button
              variant="link"
              className="my-auto flex gap-4 text-foreground"
            >
              <div className="rounded-full bg-secondary text-white h-8 w-8 grid place-items-center">
                <BellIcon size={16} />
              </div>
            </Button>
          )}

          <TopNavDropDown profile={profile} />
        </div>
      </div>
    </nav>
  );
}
interface TopNavProps {
  profile?: UserFragment;
}
