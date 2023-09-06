const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'no_frontend_url'
const INFLUX_URL = process.env.INFLUX_URL || 'no_db_url'
const INFLUX_TOKEN = process.env.INFLUX_TOKEN
const INFLUX_ORG = process.env.INFLUX_ORG || "no_db_org"
const INFLUX_BUCKET = process.env.INFLUX_BUCKET || "no_db_bucket"

export const envars = {
  FRONTEND_URL,
  INFLUX_URL,
  INFLUX_TOKEN,
  INFLUX_ORG,
  INFLUX_BUCKET,
}