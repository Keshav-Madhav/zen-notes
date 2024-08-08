'use client'

import Document from "@/components/Document"

type Props = {
  params:{
    id: string
  }
}

const page = ({params: {id}}: Props) => {
  return (
    <div className="flex flex-col flex-1 min-h-[calc(100dvh-7rem)]">
      <Document id={id}/>
    </div>
  )
}
export default page