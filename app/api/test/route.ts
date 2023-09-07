import { NextResponse } from 'next/server'

export async function GET() {
  console.log('==== GET Backup ====');

  // let fluxQuery = `
  //   from(bucket: "${envars.INFLUX_BUCKET}")
  //     |> range(start: -90m)
  //     |> filter(fn: (r) => r._measurement == "duplicati_backup_logs")
  //     |> yield(name: "last")
  // `

  // const myQuery = async () => {

  //   const table:any[] = []

  //   for await (const {values, tableMeta} of queryDB.iterateRows(fluxQuery)) {
  //     const o = tableMeta.toObject(values)
  //     table.push(o)
  //   }

  //   return table
  // }

  // const points = await myQuery()
  // // console.log({newArray});
 
  return NextResponse.json({yo: 'brooo'})
}