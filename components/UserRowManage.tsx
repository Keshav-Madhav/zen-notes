'use client'

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { usePathname } from "next/navigation"
import { makeOwnerOfDoc, removeOwnerOfDoc, removeUserFromDoc } from "@/actions/actions"
import { toast } from "sonner"
import useOwner from "@/lib/useOwner"
import { useUser } from "@clerk/nextjs"

type Props = {
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
}

const UserRowManage = ({doc}: Props) => {
  const isOwner = useOwner();
  const [isPendingRemove, startTransitionRemove] = useTransition()
  const [isPendingMake, startTransitionMake] = useTransition()
  const [isPendingDelete, startTransitionDelete] = useTransition()
  const pathname = usePathname();
  const roomId = pathname.split('/')[2]
  const {user} = useUser();
  
  const handleDelete = (userId: string) => {
    startTransitionDelete(async () => {
      if(!user) return;

      const { success } = await removeUserFromDoc(roomId, userId);

      if(success){
        toast.success(`User ${userId} removed successfully`)
      } else {
        toast.error(`An error occured while removing ${userId}`)
      }
    })
  } 

  const handleMakeOwner = (userId: string) => {
    startTransitionMake(async () => {
      if(!user) return;

      const { success } = await makeOwnerOfDoc(roomId, userId);

      if(success){
        toast.success(`User ${userId} is now an owner`)
      } else {
        toast.error(`An error occured while making ${userId} an owner`)
      }
    })
  }

  const handleRemoveOwner = (userId: string) => {
    startTransitionRemove(async () => {
      if(!user) return;

      const { success } = await removeOwnerOfDoc(roomId, userId);

      if(success){
        toast.success(`User ${userId} is no longer an owner`)
      } else {
        toast.error(`An error occured while removing ${userId} as an owner`)
      }
    })
  }

  return (
    <div key={doc.data().userId} className="flex items-center justify-between">
      <p className="font-light">
        {doc.data().userId === user?.emailAddresses[0].toString() ? `You (${doc.data().userId})` : `${doc.data().userId}`}
      </p>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => 
            doc.data().role === 'owner' ? handleRemoveOwner(doc.data().userId) : handleMakeOwner(doc.data().userId)
          }
          disabled={!isOwner || isPendingRemove || isPendingMake || doc.data().userId === user?.emailAddresses[0].toString()}
          className="w-[7.5rem]"
        >
          {doc.data().role === 'owner' ? 
            `${isPendingRemove ? 'Removing...' : 'Remove owner'}` :
            `${isPendingMake ? 'Making...' : 'Make owner'}`
          }
        </Button>

        {isOwner && doc.data().userId !== user?.emailAddresses[0].toString() && (
          <Button 
            variant="destructive" 
            onClick={() => handleDelete(doc.data().userId)}
          >
            {isPendingDelete ? 'Deleting...' : 'X'}
          </Button>
        )}
      </div>
    </div>
  )
}
export default UserRowManage