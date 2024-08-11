"use client"

import { MenuIcon } from "lucide-react"
import NewDocButton from "./NewDocButton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCollection } from "react-firebase-hooks/firestore"
import { useUser } from "@clerk/nextjs"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import SideBarOption from "./SideBarOption"

type Props = {}

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: 'owner' | 'editor';
  roomId: string;
  userId: string;
} 

const Sideabar = (props: Props) => {
  const [groupData, setGroupData] = useState<{
    owner: RoomDocument[],
    editor: RoomDocument[]
  }>({
    owner: [],
    editor: []
  })

  const { user }= useUser()
  const [data] = useCollection(
    user && (
      query(
        collectionGroup(db, 'rooms'), 
        where(
          'userId', 
          '==', 
          user.emailAddresses[0].toString()
        )
      )
    )
  )

  const [data2] = useCollection(
    query(collectionGroup(db, 'documents'))
  )

  useEffect(() => {
    if (data) {
      const grouped = data.docs.reduce<{
        owner: RoomDocument[],
        editor: RoomDocument[]
      }>((acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if(roomData.role === 'owner') {
          acc.owner.push({
            id: curr.id,
            ...roomData
          })
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData
          })
        }

        return acc;
      }, {
        owner: [],
        editor: []
      })

      setGroupData(grouped)
    }
  }, [data])

  const menuOptions = (
    <>
      <NewDocButton/>

      <div className="flex flex-col py-2 mt-2 space-y-3">
        <h2 className="text-gray-700 font-semibold text-md">
          My Zen Gardens
        </h2>
        {groupData.owner.length > 0 ? (
          groupData.owner.map((doc) => (
            <SideBarOption
              key={doc.id} 
              id={doc.id}
              href={`/${data2?.docs.find((d) => d.id === doc.roomId)?.data().title.replaceAll(" ","_")}/${doc.roomId}`}
            />
          ))
        ) : (
          <h2 className="text-gray-500 font-semibold text-sm ">No zen-dō{`'`}s Created</h2>
        )}
      </div>

      <div className="flex flex-col py-2 mt-2 space-y-3">
        <h2 className="text-gray-700 font-semibold text-md">
          Shared Zen Gardens
        </h2>
        {groupData.editor.length > 0 ? 
          (groupData.editor.map((doc) => (
            <SideBarOption
              key={doc.id} 
              id={doc.id}
              href={`/${data2?.docs.find((d) => d.id === doc.roomId)?.data().title.replaceAll(" ","_")}/${doc.roomId}`}
            />
          ))
        ) : (
          <h2 className="text-gray-500 font-semibold text-sm ">No zen-dō{`'`}s Shared</h2>
        )}
      </div>
    </>
  )

  return (
    <div className="md:px-5 md:py-7 bg-gray-200 relative h-[calc(100dvh-5rem)] md:w-[13%] md:min-w-[11rem] max-w-[17rem]">
      <Sheet>
        <SheetTrigger className="md:hidden absolute bg-white rounded-full bottom-3 left-3 shadow-md hover:p-0.5 hover:bottom-2.5 hover:left-2.5 transition-all">
          <MenuIcon size={40} className="p-2 hover:opacity-30 rounded-lg"/>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col gap-8 w-[65%] max-w-[20rem]">
          <SheetHeader className="flex items-center justify-center">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <SheetDescription>
            {menuOptions}
          </SheetDescription>
        </SheetContent>
      </Sheet>

      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  )
}

export default Sideabar