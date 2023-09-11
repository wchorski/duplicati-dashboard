import { NextResponse, NextRequest } from 'next/server'
import { queryDB, writeDB } from '@/lib/db_connect';
import { Duplicati, InfluxPoint, QuerySearchParams, RequestUrl } from '@/types';
import { HttpError, Point } from '@influxdata/influxdb-client';
import { envars } from '@/lib/envars';

type Context = {
  params: {
    id:string
  }
}
 
export async function GET(request: NextRequest, context:Context) {
  
  const { id } = context.params
  const { searchParams, pathname } = request.nextUrl
  // console.log(`==== GET LAST Backup by Id: ${id} ====`);

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


  let fluxQuery = `
    from(bucket: "${envars.INFLUX_BUCKET}")
      |> range(start: ${start}, stop: ${stop} )
      |> filter(fn: (r) => r._measurement == "duplicati_backup_logs")
      |> filter(fn: (r) => r.duplicati_id == "${id}")
      |> last()
  `

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
    const lastPoint = formatOnePoint(result)
  
    
    return NextResponse.json(lastPoint)
    
  } catch (error:any) {
    console.log({error});
    return NextResponse.json({status: 'error', message: error.json.message, code: error.json.code} )
    
  }
 
  // return NextResponse.json(points)
}

interface PrettyPoint {
  duplicati_id: string;
  _time: string;
  _field: string;
  _value: any;
}

const fieldMap: Record<string, string> = {
  bytes_downloaded: "bytes_downloaded",
  bytes_uploaded: "bytes_uploaded",
  duration: "duration",
  files_downloaded: "files_downloaded",
  files_uploaded: "files_uploaded",
  status: "status",
};


function formatOnePoint(points:InfluxPoint[]){


  const uniqueFields = points.reduce((uniqueFieldsArray:any, item:any) => {
    const field = item["_field"];
    if (!uniqueFieldsArray.includes(field)) {
      uniqueFieldsArray.push(field);
    }
    return uniqueFieldsArray;
  }, []);

  const prettyPoint = points.reduce((result:any, point) => {
    result.duplicati_id = point.duplicati_id;
    result.time = point._time;
  
    const field = point._field;
    uniqueFields.map((uField:string) => {
      if(field === uField){
        result[uField] = point._value
      }
    })
  
    return result;
  }, {
    duplicati_id: "",
    time: "",
  });

  // console.log(JSON.stringify(prettyPoint, null, 2));

  return prettyPoint
  
}