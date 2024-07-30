import { Prisma, Ticket } from '@prisma/client'
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import TicketStatusBadge from './TicketStatusBadge'
import Link from 'next/link'
import TicketPriority from './TicketPriority'

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedTo: true }
}>

interface Props {
  tickets: TicketWithUser[]
}

const DashboardRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {tickets
            ? tickets.map((ticket) => (
                <div
                  className='flex items-center'
                  key={ticket.id}
                >
                  <div className='ml-4 space-y-1'>
                    <Link href={`'tickets/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.assignedTo?.name || 'Unassigned'}</p>
                    </Link>
                  </div>
                  <div className='flex ml-auto'>
                    <div className='mr-4'>
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardRecentTickets
