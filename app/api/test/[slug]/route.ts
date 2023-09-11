import { queryDB } from '@/lib/db_connect';
import { envars } from '@/lib/envars';
import { NextRequest, NextResponse } from 'next/server'

type Context = {
  params: {
    slug:string
  }
}


export async function GET(request: NextRequest, context:Context) {
  console.log('==== GET sluggy ====');
  const { slug } = context.params
  const { searchParams, pathname } = request.nextUrl

  let fluxQuery = `
    from(bucket: "${envars.INFLUX_BUCKET}")
      |> range(start: -90m)
      |> filter(fn: (r) => r._measurement == "duplicati_backup_logs")
      |> yield(name: "last")
  `

  const myQuery = async () => {

    const table:any[] = []

    for await (const {values, tableMeta} of queryDB.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      table.push(o)
    }

    return table
  }

  const points = await myQuery()
  // // console.log({newArray});
 
  return NextResponse.json({slug})
}