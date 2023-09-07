import { datePretty } from "@/lib/dateFormatter"
import { envars } from "@/lib/envars"
import { labelPretty } from "@/lib/labelFormatter";
import { OrganizedData, QuerySearchParams } from "@/types"
import stylesTable from "@styles/table.module.scss";

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
  // console.log(JSON.stringify(dataById, null, 2))
  
  const uniqueKeys = Object.keys(data);

  // console.log(JSON.stringify(uniqueFields, null, 2))
  
  if(!data) return <p>no data found</p>

  return (<>

      <h1> Last: {params.id}</h1>

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

  </>)
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