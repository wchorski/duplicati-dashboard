import { FilterForm } from "@/components/FilterForm";
import { Section } from "@/components/Section";
import { TableLogs } from "@/components/TableLogs";
import { datePretty } from "@/lib/dateFormatter"
import { envars } from "@/lib/envars"
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
  const dataById = data?.find(d => d.duplicati_id === params.id) 
  // console.log(JSON.stringify(dataById, null, 2))
  
  const uniqueFields = dataById?.times[0].items.reduce((uniqueFieldsArray:any, item:any) => {
    const field = item["_field"];
    if (!uniqueFieldsArray.includes(field)) {
      uniqueFieldsArray.push(field);
    }
    return uniqueFieldsArray;
  }, []);

  // console.log(JSON.stringify(uniqueFields, null, 2))
  
  if(!dataById) return <p>no data found</p>

  return (
 
    <Section col={1}>
      <h1> ID: {dataById.duplicati_id}</h1>

      <FilterForm baseUrl={`/backups/${dataById.duplicati_id}`}/>

      {data?.map((entry:any) => (
        <TableLogs entry={entry} uniqueFields={uniqueFields} key={entry.duplicati_id}/>
      ))}


      {/* <p> {JSON.stringify(data)}</p> */}
    </Section>
  )
}


async function getData(id:string, start?:string|number, stop?:string|number) {
  const res = await fetch(envars.FRONTEND_URL + `/api/backups/${id}?start=${start}&stop=${stop}` )
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
  // console.log({data});

  const result:  Record<string, Record<string, any[]>> = data.reduce((acc:any, item:any) => {
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