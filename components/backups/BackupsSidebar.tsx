import Link from "next/link"
import { AsideBar } from "../layouts/AsideBar"
import { Card } from "../layouts/Card"

type Props = {
  prop:string
}

export function BackupsSidebar ({ prop }:Props) {
  return (
    <AsideBar>
      <Card>
        <Link href={`/`}> backup </Link>
      </Card>
      <Card>
        <Link href={`/`}> backup </Link>
      </Card>
      <Card>
        <Link href={`/`}> backup </Link>
      </Card>
      <Card>
        <Link href={`/`}> backup </Link>
      </Card>
    </AsideBar>
  )
}