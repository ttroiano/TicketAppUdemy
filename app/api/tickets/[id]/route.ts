import { ticketPatchSchema } from '@/ValidationSchemas/ticket'
import prisma from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'
import options from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

interface Props {
  params: {
    id: string
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(options)

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const validation = ticketPatchSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId)
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  })

  return NextResponse.json(updateTicket)
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
  }

  await prisma.ticket.delete({ where: { id: ticket.id } })

  return NextResponse.json({ message: 'Ticket Deleted' })
}
