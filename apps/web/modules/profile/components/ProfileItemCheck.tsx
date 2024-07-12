import { CheckCircle, LucideIcon, XCircle } from 'lucide-react'
import React from 'react'

export const ProfileItemCheck = (props: ProfileItemCheckProps) => {

  const {check, title} = props;

  return (
    <div className='flex items-center gap-2 lg:gap-4 w-max lg:w-full min-w-[150px]'>
      <span className='text-sm font-light text-gray-500 w-3/5'>{title}</span>
     {
      check ? <CheckCircle size={20} className='text-green-600'/> : <XCircle size={20} className='text-primary'/>
     }
    </div>
  )
}

type ProfileItemCheckProps = {
  check: boolean,
  title: string,
}
