import { datePretty } from "@/lib/dateFormatter";
import { labelPretty } from "@/lib/labelFormatter";
import stylesTable from "@styles/table.module.scss";
import Link from "next/link";

type Props = {
  entry: {
    duplicati_id:string,
    times:{
      _time:string,
      items: {
        _field:string,
        _value:string|number,
      }[]
    }[],
  }
  uniqueFields:string[],
}

export function TableLogs({entry, uniqueFields}:Props) {
  return (
    <div key={entry.duplicati_id} className={stylesTable.cont}>
          
      <header className={stylesTable.header}>
        <h3> {entry.duplicati_id} </h3>
        <Link 
          href={`/backups/${entry.duplicati_id}`}
          className="button"
        > logs </Link>

        <Link 
          href={`/backups/last/${entry.duplicati_id}`}
          className="button"
        > last </Link>
      </header>

      <table className={stylesTable.rwdTable} >

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
  )
}
