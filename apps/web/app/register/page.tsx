'use client';

import { Button } from '@erecruitment/ui';

import { DatabaseBackup, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import login_bg from '~/assets/login-bg.png';


export default function Register() {
  return (
    <section className="relative w-screen h-screen bg-gray-100 flex items-center justify-center ">
      <Image src={login_bg} alt="bg" className="absolute w-full h-full object-cover" />
      <div className="absolute w-full h-full bg-gray-100/95"></div>
      <div className="w-full flex items-stretch md:w-1/3 bg-white h-fit shadow-lg rounded-lg relative min-h-[200px]">
        <Link
          href="/register/new-applicant"
          className="flex-1 flex flex-col items-center w-full gap-4 hover:bg-primary hover:text-white justify-center text-gray-500 rounded-tl-lg rounded-bl-lg"
        >
          <UserPlus size={40} className="text-inherit" />
          <span className="font-semibold text-xl">New applicant</span>
        </Link>

        <Link
          href="/register/num-employee"
          className="flex-1 flex flex-col items-center w-full gap-4 hover:bg-primary hover:text-white justify-center text-gray-500 rounded-tr-lg rounded-br-lg"
        >
          <DatabaseBackup size={40} className="text-inherit" />
          <span className="font-semibold text-xl">Num employee</span>
        </Link>
      </div>
    </section>
  );
}
