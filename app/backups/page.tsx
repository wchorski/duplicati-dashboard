import { datePretty } from "@/lib/date";
import { envars } from "@/lib/envars";
import { OrganizedData } from "@/types";

export default async function BackupsPage() {


  const data = await getData()
  console.log(data[0])  

  return (
    <div>
      <h1> Backup Logs </h1>

      {data.map((entry) => (
        <div key={entry.duplicati_id}>
          {entry.times.map((timeEntry) => (
            <div key={timeEntry._time}>
              <h3>Time: { datePretty(timeEntry._time) }</h3>
              <table>
                <caption> Duplicati ID: {entry.duplicati_id} </caption>
                <thead>
                  <tr>
                    <th> Time Stamp </th>
                    {timeEntry.items.map((item) => (
                      <th key={item._field}> {item._field} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {datePretty(timeEntry._time) } </td>
                    {timeEntry.items.map((item, i) => (
                      <td key={i}>{item._value}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}

      {/* <p> {JSON.stringify(data)}</p> */}
    </div>
  )
}

async function getData() {
  const res = await fetch(envars.FRONTEND_URL + '/api/backups')
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
