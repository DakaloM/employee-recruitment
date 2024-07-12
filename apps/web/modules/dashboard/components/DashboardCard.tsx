'use client'
import { cn } from '@erecruitment/ui'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const DashboardCard = ({className, count, title, Icon, url}: DashboardCardProps) => {
  return (
    <Link href={`/dashboard/${url}`} className={cn('flex-1 h-max p-8 rounded-lg hover:scale-110 transition-all flex flex-col gap-4 bg-white text-black shadow-lg border border-gray-200', className)}>
      <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-inherit'>{count}</h1>
            <p className='text-sm font-semibold'>{title}</p>
        </div>

        <div className='w-fit h-fit p-4 rounded-full bg-primary text-gray-500'>
            <Icon size={24} className='text-white' />
        </div>
      </div>

    </Link>
  )
}

type DashboardCardProps = {
    className?: string,
    count: number,
    title: string,
    Icon: LucideIcon,
    url: string
    
}

