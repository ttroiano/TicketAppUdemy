import React from 'react'
import prisma from '@/prisma/db'
import DashboardRecentTickets from '@/components/DashboardRecentTickets'
import DashboardChart from '@/components/DashboardChart'

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: 'CLOSED' }],
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: 0,
    take: 5,
    include: {
      assignedTo: true,
    },
  })

  const groupTicket = await prisma.ticket.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })

  const data = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    }
  })

  return (
    <div>
      <div className='grid gap-4 md:grid-cols-2 px-2'>
        <div className='flex flex-col'>
          <DashboardRecentTickets tickets={tickets} />
        </div>
        <div className='flex flex-col'>
          <DashboardChart data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
