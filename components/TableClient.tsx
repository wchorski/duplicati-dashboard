// @ts-nocheck
'use client'
import { envars } from "@/lib/envars";
import { useEffect, useState } from "react";

interface OrganizedData {
  duplicati_id: string;
  times: {
    _time: string;
    items: any[];
  }[];
}


export default function BackupsPage() {

  const [data, setdata] = useState([])

  async function handleData(){
    const res = await getData()
    console.log(res);
    setdata(res)
  }
  
  useEffect(() => {
    handleData()
  
    // return () => 
  }, [])
  

  return (
    <div>

      {data.map((entry) => (
        <div key={entry.duplicati_id}>
          <h2>Duplicati ID: {entry.duplicati_id}</h2>
          {entry.times.map((timeEntry) => (
            <div key={timeEntry._time}>
              <h3>Time: {timeEntry._time}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {timeEntry.items.map((item) => (
                    <tr key={item._field}>
                      <td>{item._field}</td>
                      <td>{item._value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}

      <table>
        <thead>
          <tr>
            <th> id </th>
            <th> status </th>
            <th> Bytes Down </th>
            <th> Bytes Up </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>

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