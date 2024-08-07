'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { createNewDocument } from "@/actions/actions"

type Props = {}

const NewDocButton = (props: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleCreate = () => {
    startTransition(async() => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`)
    })
  }

  return (
    <Button 
      className="w-full"
      onClick={handleCreate}
      disabled={isPending}
    >
      {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}

export default NewDocButton