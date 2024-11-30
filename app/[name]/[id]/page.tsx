import Document from "@/components/Document"
import { Metadata } from "next"

type Props = {
  params: {
    name: string
    id: string
  }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Zen Notes - ${params.name.replaceAll('_', ' ')}`,
    description: `You're viewing the Zen-do ${params.name}`,
  }
}

const Page = ({ params: { name, id } }: Props) => {
  return (
    <div className="flex flex-col flex-1 min-h-[calc(100dvh-7rem)]">
      <Document id={id} />
    </div>
  )
}

export default Page