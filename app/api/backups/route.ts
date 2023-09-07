import { NextResponse } from 'next/server'
import * as fs from 'fs'
import { queryDB, writeDB } from '@/lib/db_connect';
import { Duplicati, RequestUrl } from '@/types';
import { HttpError, Point } from '@influxdata/influxdb-client';
import { envars } from '@/lib/envars';
const jsonFilePath =  + '/logs/data.json'; 
 
export async function GET(request: RequestUrl, ) {
  
  console.log('==== GET Backups ====');
  // const { id } = context.params
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

  let fluxQuery = `
    from(bucket: "${envars.INFLUX_BUCKET}")
      |> range(start: ${start}, stop: ${stop} )
      |> filter(fn: (r) => r._measurement == "duplicati_backup_logs")
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
  // console.log({newArray});
 
  return NextResponse.json(points)
}


export async function POST(request: Request) {
  const res:Duplicati = await request.json()
  // console.log(res);
  console.log('======== ' + res.Extra['backup-name'] + ' ===========');
  
  const name = res.Extra['backup-name']
  const data = res.Data
  const stats = data.BackendStatistics
  // console.log(data.Duration);
  
  // todo make adding variables accessable through frontend. prob would need another db like sqlite
  // ? here you can add new fields to be put into the database
  let point = new Point(`duplicati_backup_logs`)
    .tag(`duplicati_id`, name)
    .stringField('duration', data.Duration)
    .stringField('status', data.ParsedResult)
    .intField('bytes_uploaded', stats.BytesUploaded)
    .intField('bytes_downloaded', stats.BytesDownloaded)
    .intField('files_uploaded', stats.FilesUploaded)
    .intField('files_downloaded', stats.FilesDownloaded)

  writeDB.writePoint(point)
  // writing to plain json file
  // await writeJsonFile('./public/logs/data.json', res);

  try {
    // todo why is 'close' causing problems on 2nd run?
    // await writeDB.close().then(() => { console.log('WRITE FINISHED') })
    await writeDB.flush()
    console.log('FINISHED ... ' + res.Extra['backup-name'])
    return NextResponse.json({
        code: 'success', 
        message: 'backup complete'
      }, 
      { status: 201 },
    )
    
  } catch (e) {
    console.error(e)
    if (e instanceof HttpError && e.statusCode === 401) {
      console.log('backup log create error')
    }
    console.log('\n API Backups POST ERROR')
  }
  
}

// function writeJsonFile(filePath: string, jsonData: any): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print with 2 spaces
//     fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log(`JSON data written successfully to ${filePath}`);
//         resolve();
//       }
//     });
//   });
// }

// function readJsonFile(filePath: string): Promise<any> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         try {
//           const jsonData = JSON.parse(data);
//           resolve(jsonData);
//         } catch (parseError) {
//           reject(parseError);
//         }
//       }
//     });
//   });
// }