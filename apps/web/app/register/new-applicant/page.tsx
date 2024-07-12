'use client';

import Image from 'next/image';
import Link from 'next/link';
import login_bg from '~/assets/login-bg.png';
import logo from '~/assets/logo.png';
import { RegisterForm } from '~/modules/account';

export default function Page() {
  return (
    <section className="relative w-screen h-screen bg-gray-100 flex items-center justify-center ">
      <Image 
      src={login_bg}
      alt='bg'
      className='absolute w-full h-full object-cover'
      />
      <div className='absolute w-full h-full bg-gray-100/95'>

      </div>
      <div className="w-full flex flex-col md:w-1/3 bg-white h-fit shadow-lg rounded-lg p-8 relative min-h-[200px]">
        <div className="flex items-center justify-between mb-8">
          <Image src={logo} className="w-16 h-auto object-cover" alt="logo" />

          <div className="flex flex-col gap-0 items-center">
            <h1 className="font-bold text-2xl">Applicant register!</h1>
            <p className="text-primary font-semibold text-xs">E-Recruitment</p>
          </div>
        </div>

        <div className="w-full px-10 grid gap-2">
          <div className="flex flex-col w-full items-start">
           
            <h6 className="font-normal text-sm text-gray-400 w-full text-center">Please fill in the form below to register</h6>
          </div>
          <RegisterForm />
          <div className="flex flex-col gap-2 text-center">
            <span className='text-sm font-normal text-gray-700'>
              Already have an account?   
              <Link href='/login' className='text-primary ml-1 hover:underline'>Login here</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
