import { ErrorFromDB } from "@/components/ErrorFromDB"
import { FilterForm } from "@/components/FilterForm"
import { Section } from "@/components/Section"
import { TableLogs } from "@/components/TableLogs"
import { AsideBar } from "@/components/layouts/AsideBar"
import { Card } from "@/components/layouts/Card"
import { MainContainer } from "@components/layouts/MainContainer"
import { envars } from "@/lib/envars"
import { OrganizedData, QuerySearchParams } from "@/types"
import Link from "next/link"
import { ReactNode } from "react"
import styles from '@styles/page.module.scss'
import styleList from '@styles/list.module.scss'
import { BackupIdsList } from "@components/backups/BackupIdsList"
import { List } from "@components/layouts/List"
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates"
import { LoadingAnim } from "@components/LoadingAnim"


type Props = {
  searchParams:QuerySearchParams,
}

export default async function BackupsPage ({
  searchParams,
}:Props) {

  const data = await getData(searchParams?.start, searchParams?.stop)
  // console.log(JSON.stringify(data, null, 2))  

  const uniqueFields = data[0]?.times[0].items.reduce((uniqueFieldsArray:any, item:any) => {
    const field = item["_field"];
    if (!uniqueFieldsArray.includes(field)) {
      uniqueFieldsArray.push(field);
    }
    return uniqueFieldsArray;
  }, []);

  if(data.statusCode === 400 || data.statusCode === 401) return <ErrorFromDB code={data.code} message={data.message}/>
  

  return (
    <PageTHeaderMainAside 
      header={Header()}
      main={Main({data, uniqueFields})}
      aside={Aside()}
    />
  )
}


//? Content
function Header(){

  return <>
    <h1> Backup Logs </h1>
    <FilterForm baseUrl={`/backups`}/>
  </>
}


type DupData = {
  duplicati_id:string,
  times:any[],
}

function Main({data, uniqueFields}:{data:DupData[], uniqueFields:string[]}){

  return <>
    <section>
      <List isAnimated={true}>
        {data?.map((entry:any, i:number) => (
          <TableLogs entry={entry} uniqueFields={uniqueFields} key={i}/>
        ))}
      </List>
    </section>
  </>
}

function Aside(){
  return <>
    <Card>
      <h2> Quick Nav </h2>
      <BackupIdsList />
    </Card>
  </>
}


//? Data Fetching
async function getData(start?:string|number, stop?:string|number) {
  const res = await fetch(envars.FRONTEND_URL + `/api/backups?start=${start}&stop=${stop}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  const data = await res.json()

  if(data.statusCode === 400 || data.statusCode === 401) return data  
  

  const result:  Record<string, Record<string, any[]>> = data?.reduce((acc:any, item:any) => {
    const duplicatiId = item.duplicati_id;
    const time = item._time;
  
    if (!acc[duplicatiId]) {
      acc[duplicatiId] = {};
    }
  
    if (!acc[duplicatiId][time]) {
      acc[duplicatiId][time] = [];
    }
  
    acc[duplicatiId][time].push(item);
    return acc;
  }, {});
  
  const organizedArrays: OrganizedData[] = Object.entries(result).map(([duplicatiId, times]) => {
    return {
      duplicati_id: duplicatiId,
      times: Object.entries(times).map(([time, items]) => ({
        _time: time,
        items,
      })),
    };
  });
  // console.log(result);
  

  return organizedArrays

}