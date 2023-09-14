import { Section } from "@/components/Section";
import { datePretty } from "@/lib/dateFormatter"
import { envars } from "@/lib/envars"
import { labelPretty } from "@/lib/labelFormatter";
import { OrganizedData, QuerySearchParams } from "@/types"
import stylesTable from "@styles/table.module.scss";
import styles from '@styles/page.module.scss'
import { MainContainer } from "@components/layouts/MainContainer";
import { FilterForm } from "@components/FilterForm";
import { List } from "@components/layouts/List";
import { AsideBar } from "@components/layouts/AsideBar";
import { Card } from "@components/layouts/Card";
import { BackupIdsList } from "@components/backups/BackupIdsList";
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates";

type Props = {
  params: {
    id:string
  },
  searchParams:QuerySearchParams,
}

export default async function BackupById({
  params, 
  searchParams
}:Props) {

  const data = await getData(params.id, searchParams?.start, searchParams?.stop)
  // console.log(JSON.stringify(data, null, 2))
  // console.log({data})
  // console.log('****** HEY *******')

  // console.log(JSON.stringify(uniqueFields, null, 2))
  
  if(!data) return <p>no data found</p>

  const uniqueKeys = Object.keys(data);


  return (
    <PageTHeaderMainAside 
      header={Header(params.id)}
      main={Main(uniqueKeys, data)}
      aside={Aside()}
    />
  )
}

//? Content
function Header(id:string){

  return <>
    <h1> Last: {id}</h1>
    <FilterForm baseUrl={`/backups/last/${id}`}/>
  </>
}


type DupData = {
  duplicati_id:string,
  times:any[],
}

function Main(uniqueKeys:string[], data:any){

  return <>
    <section>
      <List isAnimated={true}>
        <table className={stylesTable.rwdTable} >
    
          <thead>
            <tr>
              {uniqueKeys.map((field:string) => (
                <th key={field}> {labelPretty(field)} </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              {uniqueKeys.map((key, i) => (
                <td key={i} data-th={labelPretty(key)}>{data[key]}</td>
              ))}
            </tr>
          </tbody>
        </table>
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


async function getData(id:string, start?:string|number, stop?:string|number) {
  const res = await fetch(envars.FRONTEND_URL + `/api/backups/last/${id}?start=${start}&stop=${stop}` )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
 
  const response = await res.json()
  if(!response) return console.log('no data found');
  // @ts-ignore
  if(response.status === 'error') return console.log('error: ' + res.message);
  const data = response;
  

  return data
  

}