'use client'
import { useRouter } from "next/navigation"

type Props = {
  code:string|number,
  message:string,
}

export function ErrorFromDB({code, message}:Props) {

  const router = useRouter()

  return (
    <div>
      <h2> ERROR: </h2>
      <p>{String(code)}</p>
      <p>{message}</p>

      <button onClick={() => router.back()}> 
        Go Back 
      </button>
    </div>
  )
}
