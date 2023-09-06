import { NextResponse } from 'next/server'
import * as fs from 'fs'
import { db_connect, queryDB } from '@/lib/db_connect';
import { envars } from '@/lib/envars';
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL

const jsonFilePath =  + '/logs/data.json'; 
 
export async function GET() {

  let fluxQuery = `
    from(bucket: "admin")
    |> range(start: -30m)
    |> filter(fn: (r) => r._measurement == "measurement1")
  `

  // let table:any[] = []

  const table = await queryDB.queryRows(fluxQuery, {
    next: (row:any, tableMeta:any) => {
      const tableObject = tableMeta.toObject(row)
      // console.log(tableObject)
      // console.log('-----');
    },
    error: (error:any) => {
      console.error('\nError', error)
    },
    complete: () => {
      console.log('\nSuccess')
    },
  })

  // console.log({table})

  calcMean('-60m')
  
 
  return NextResponse.json({test: 'me'})
  // return NextResponse.json(table)
}


export async function POST(request: Request) {
  const res = await request.json()
  console.log(res);
  
  return NextResponse.json({ res })
}

function calcMean(start:string){

  const fluxQuery = `from(bucket: "${envars.INFLUX_BUCKET}")
  |> range(start: -60m)
  |> filter(fn: (r) => r._measurement == "measurement1")
  |> mean()`

  queryDB.queryRows(fluxQuery, {
    next: (row:any, tableMeta:any) => {
      const tableObject = tableMeta.toObject(row)
      console.log({tableObject})
    },
    error: (error:any) => {
      console.error('\nError', error)
    },
    complete: () => {
      console.log('\nSuccess')
    },
  })
}
