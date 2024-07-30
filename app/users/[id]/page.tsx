import UserForm from '@/components/UserForm'
import prisma from '@/prisma/db'
import React from 'react'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

interface Props {
  params: {
    id: string
  }
}

const EditUser = async ({ params }: Props) => {
  const session = await getServerSession(options)

  if (session?.user.role !== 'ADMIN') {
    return <p className='text-destructive'>Admin Access Required</p>
  }

  const user = await prisma?.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!user) {
    return <p className='text-destructive'>User Not Found</p>
  }

  console.log(user)
  user.password = ''
  return <UserForm user={user} />
}

export default EditUser
