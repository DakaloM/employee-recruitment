"use client";

import {
  Briefcase,
  ClipboardList,
  Component,
  Contact,
  LayoutDashboard,
  LucideProps,
  UserCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ForwardRefExoticComponent } from "react";
import num_logo from "~/assets/logo.png";
import { NavLink } from "./NavLink";

interface Link {
  title: string;
  Icon: ForwardRefExoticComponent<LucideProps>;
  link: string;
}

export function SideNav() {
  return (
    <div className="flex flex-col fixed h-screen overflow-y-hidden bg-gray-100 md:w-80 w-24 px-8   gap-2">
      <div className="flex border-b border-gray-300 w-full justify-center items-center">
        <Link href="/" className="flex place-items-center gap-2 w-52 py-6">
          <Image src={num_logo} alt="logo" className="h-10 w-10 mx-auto" />
          <span className="whitespace-normal hidden md:flex text-sm font-bold">
            National Union of Mineworkers
          </span>
        </Link>
      </div>

      <div className="flex flex-col items center space-y-4 mt-20">
        <NavLink url="/dashboard/" title="Dashboard" Icon={LayoutDashboard} />
        <NavLink
          url="/dashboard/requisitions"
          title="Requisitions"
          Icon={ClipboardList}
        />
        <NavLink
          url="/dashboard/interviews"
          title="Interviews"
          Icon={Component}
        />
        <NavLink url="/dashboard/jobs" title="Jobs" Icon={Briefcase} />
        <NavLink
          url="/dashboard/applications"
          title="Applications"
          Icon={Contact}
        />
        <NavLink url="/dashboard/users" title="Users" Icon={Users} />
        <NavLink
          url="/dashboard/candidates"
          title="Candidates"
          Icon={UserCheck}
        />
      </div>
    </div>
  );
}
