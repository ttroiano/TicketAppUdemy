import dynamic from 'next/dynamic'
import React from 'react'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
})

const NewTicket = async () => {
  const session = await getServerSession(options)

  if (session?.user.role !== 'ADMIN') {
    return <p className='text-destructive'>Admin Access Required</p>
  }

  return <TicketForm />
}

export default NewTicket
