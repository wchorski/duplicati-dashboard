import { envars } from "@lib/envars"
import Link from "next/link"
import styles from '@styles/list.module.scss'
import { ErrorFromDB } from "@components/ErrorFromDB"
import { List } from "@components/layouts/List"

type Props = {
  prop?:string
}

export async function BackupIdsList ({ prop }:Props) {

  const data = await getData()
  // console.log(JSON.stringify(data, null, 2))

  if(data.statusCode === 400 || data.statusCode === 401) return <ErrorFromDB code={data.code} message={data.message}/>

  return (
    <List isAnimated={false}>
      {data.map((id:string) => (
        <Link href={`/backups#${id}`} key={id}> {id} </Link>
      ))}
    </List>
  )
}


async function getData(start?:string|number, stop?:string|number) {
  const res = await fetch(envars.FRONTEND_URL + `/api/backups?start=${start}&stop=${stop}`)
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  const data = await res.json()

  if(data.statusCode === 400 || data.statusCode === 401) return data 

  const uniqueDuplicatiIds = data.reduce((accumulator:any, currentObject:any) => {
    const duplicatiId = currentObject.duplicati_id;
  
    // Check if the duplicatiId is not already in the accumulator array
    if (!accumulator.includes(duplicatiId)) {
      accumulator.push(duplicatiId);
    }
  
    return accumulator;
  }, []);
  
  return uniqueDuplicatiIds
  
}