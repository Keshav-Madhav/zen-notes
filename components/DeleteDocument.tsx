"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { usePathname, useRouter } from "next/navigation"
import { deleteDoc } from "@/actions/actions"
import { toast } from "sonner"

type Props = {}

const DeleteDocument = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname();
  const router = useRouter();
  const roomId = pathname.split('/')[2]
  const roomName = pathname.split('/')[1].replaceAll('_', ' ')

  const handleDelete = () =>{
    if(!roomId) return;

    startTransition(async () => {
      const {success} = await deleteDoc(roomId);

      if(success){
        setIsOpen(false)
        router.replace("/")
        toast.success(`Room "${roomName}" deleted successfully`)
      } else {
        toast.error("An error occured while deleting the room")
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete &quot;{roomName}&quot;?</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          This will delete all the contents of the Zen-do as well as remove all the collaborators.
          This action cannot be undone. 
        </DialogDescription>

        <DialogFooter className="flex w-full items-center justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>

          <DialogClose asChild className="w-full">
            <Button variant="secondary" type="button">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteDocument