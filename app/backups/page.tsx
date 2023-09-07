import { datePretty } from "@/lib/dateFormatter";
import { envars } from "@/lib/envars";
import { labelPretty } from "@/lib/labelFormatter";
import { OrganizedData, QuerySearchParams } from "@/types";
import stylesTable from "@styles/table.module.scss";

type Props = {
  searchParams:QuerySearchParams,
}


export default async function BackupsPage({
  searchParams
}:Props) {


  const data = await getData(searchParams?.start, searchParams?.stop)
  console.log(JSON.stringify(data, null, 2))  

  const uniqueFields = data[0]?.times[0].items.reduce((uniqueFieldsArray:any, item:any) => {
    const field = item["_field"];
    if (!uniqueFieldsArray.includes(field)) {
      uniqueFieldsArray.push(field);
    }
    return uniqueFieldsArray;
  }, []);

  return (
    <div>
      <h1> Backup Logs </h1>

      {data.map((entry) => (
        <div key={entry.duplicati_id}>
         
          <table className={stylesTable.rwdTable} >
            <caption> {entry.duplicati_id} </caption>
            <thead>
              <tr>
                  <th> Time Stamp </th>
                {uniqueFields.map((field:string) => (
                  <th key={field}> {labelPretty(field)} </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entry.times.map((timeEntry) => (
                <tr key={timeEntry._time}>
                    <td data-th="_time"> {datePretty(timeEntry._time) } </td>
                  {timeEntry.items.map((item, i) => (
                    <td data-th={labelPretty(item._field)} key={i}>{item._value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          
        </div>
      ))}

      {/* <p> {JSON.stringify(data)}</p> */}
    </div>
  )
}

async function getData(start?:string|number, stop?:string|number) {
  const res = await fetch(envars.FRONTEND_URL + `/api/backups?start=${start}&stop=${stop}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  const data = await res.json()

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
  console.log(result);
  

  return organizedArrays

}


