import { LoadingAnim } from "@components/LoadingAnim"
import { PageTMain } from "@components/layouts/PageTemplates"

type Props = {
  prop:string
}

export default function BackupsLoading ({ prop }:Props) {
  return (
    <PageTMain 
      main={Main()}
    />
  )
}

function Main(){
  return (
    <div>
      <LoadingAnim />
    </div>
  )
}