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

  const start = searchParams.get('start') === 'undefined' ||
                searchParams.get('start') === null
                  ? '-40d' 
                  : searchParams.get('start')

  const stop =  searchParams.get('stop') === 'undefined' ||
                searchParams.get('stop') === null
                ? 'now()' 
                : searchParams.get('stop')

  const isLast =  searchParams.get('last') === 'undefined' ||
                  searchParams.get('last') === null
                  ? '' 
                  : '|> last()'


  const isFirst = searchParams.get('first') === 'undefined' ||
              searchParams.get('first') === null
              ? '' 
              : '|> first()'

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
