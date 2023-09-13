import { FilterForm } from "@/components/FilterForm"
import { TableLogs } from "@/components/TableLogs"
import { ReactNode } from "react"

type Props = {
  children:ReactNode
  data:any,
  uniqueFields:string[],
}

export default function BackupsPage ({ data, uniqueFields }:Props) {
  return (<>
      <h1> Backup Logs </h1>

      <FilterForm baseUrl={`/backups`}/>

      {data?.map((entry:any) => (
        <TableLogs entry={entry} uniqueFields={uniqueFields} key={entry.duplicati_id}/>
      ))}
  </>)
}