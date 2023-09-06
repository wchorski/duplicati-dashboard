import { NextResponse } from 'next/server'
import * as fs from 'fs'
import { queryDB, writeDB } from '@/lib/db_connect';
import { Duplicati } from '@/types';
import { HttpError, Point } from '@influxdata/influxdb-client';
import { envars } from '@/lib/envars';
const jsonFilePath =  + '/logs/data.json'; 
 
export async function GET() {
  console.log('==== GET Backup ====');

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
  console.log(data.Duration);
  

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
    console.log('\nFinished ERROR')
  }
  
}

function writeJsonFile(filePath: string, jsonData: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print with 2 spaces
    fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`JSON data written successfully to ${filePath}`);
        resolve();
      }
    });
  });
}

function readJsonFile(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}