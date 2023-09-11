import { NextResponse, NextRequest } from 'next/server'
import { queryDB, writeDB } from '@/lib/db_connect';
import { Duplicati, QuerySearchParams, RequestUrl } from '@/types';
import { HttpError, Point } from '@influxdata/influxdb-client';
import { envars } from '@/lib/envars';
const jsonFilePath =  + '/logs/data.json'; 

type Context = {
  params: {
    id:string
  }
}
 
export async function GET(request: NextRequest, context:Context) {
  
  // console.log('==== GET Backup by Id ====');
  const { id } = context.params
  const { searchParams, pathname } = request.nextUrl

  // todo figure out how to type .get() functions
  // @ts-ignore
  const start = searchParams.get('start') === 'undefined' ||
                // @ts-ignore
                searchParams.get('start') === null
                  ? '-40d' 
                // @ts-ignore
                  : searchParams.get('start')
  // @ts-ignore
  const stop = searchParams.get('stop') === 'undefined' ||
              // @ts-ignore
              searchParams.get('stop') === null
              ? 'now()' 
              // @ts-ignore
              : searchParams.get('stop')

  // @ts-ignore
  const isLast = searchParams.get('last') === 'undefined' ||
              // @ts-ignore
              searchParams.get('last') === null
              ? '' 
              // @ts-ignore
              : '|> last()'

  // @ts-ignore
  const isFirst = searchParams.get('first') === 'undefined' ||
              // @ts-ignore
              searchParams.get('first') === null
              ? '' 
              // @ts-ignore
              : '|> first()'
  // // @ts-ignore
  // const stop = searchParams.get('stop') === 'undefined'|null ? 'now()' : searchParams.get('stop')  
  // const start = '-12h'
  // const stop = 'now()'

  let fluxQuery = `
    from(bucket: "${envars.INFLUX_BUCKET}")
      |> range(start: ${start}, stop: ${stop} )
      |> filter(fn: (r) => r._measurement == "duplicati_backup_logs")
      |> filter(fn: (r) => r.duplicati_id == "${id}")
      ${isLast}
      ${isFirst}
  `

  // console.log({fluxQuery});
  

  const myQuery = async () => {

    const table:any[] = []

    for await (const {values, tableMeta} of queryDB.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      table.push(o)
    }

    return table
  }

  try {
    const points = await myQuery()
    
    const result = points.length > 0 ? points : [{message: 'no_data_found'}]
    // console.log(result);
    
    return NextResponse.json(result)
    
  } catch (error:any) {
    console.log({error});
    return NextResponse.json({status: 'error', message: error.json.message, code: error.json.code} )
    
  }
 
  // return NextResponse.json(points)
}
