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
import { useUser } from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react/suspense"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import UserRowManage from "./UserRowManage"

type Props = {}

const ManageUsers = (props: Props) => {
  const {user} = useUser();
  const room = useRoom()
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", '==', room.id))
  )
  const [isOpen, setIsOpen] = useState(false)


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Users ({usersInRoom?.docs.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription className="!mt-1">
            Manage users who have access to this Zen-do.
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div className="flex flex-col space-y-2">
          {usersInRoom?.docs.map((doc) => (
            <UserRowManage 
              key={doc.id}
              doc={doc}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ManageUsers