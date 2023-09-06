const {InfluxDB, Point} = require('@influxdata/influxdb-client')
import { envars } from './envars'

const token = envars.INFLUX_TOKEN
const url = envars.INFLUX_URL

const client = new InfluxDB({url, token})

let org = envars.INFLUX_ORG
let bucket = envars.INFLUX_BUCKET


export const writeDB = client.getWriteApi(org, bucket, 'ns')
export const queryDB = client.getQueryApi(org)

export function db_connect(){

  console.log('-- db connected --');

  console.log('-- data written --');
}