'use client'
import { Status } from '@prisma/client'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface dataProps {
  data: dataElements[]
}

interface dataElements {
  name: Status
  total: number
}

const DashboardChart = ({ data }: dataProps) => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width='100%'
          height={350}
        >
          <BarChart data={data}>
            <XAxis
              dataKey='name'
              stroke='#8b8680'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#8b8680'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey='total'
              fill='#4d7fff'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardChart
