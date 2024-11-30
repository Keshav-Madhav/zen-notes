'use client'

import { doc, updateDoc } from "firebase/firestore"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState, useTransition } from "react"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Editor from "./Editor"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "./DeleteDocument"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import InviteUser from "./InviteUser"
import ManageUsers from "./ManageUsers"
import Avatars from "./Avatars"

type Props = {
  id: string
}

const Document = ({id}: Props) => {
  const [nameInput, setNameInput] = useState('')
  const [isUpdating, startUpdating] = useTransition()
  const [docData, loading, error] = useDocumentData(doc(db, 'documents', id));
  const isOwner = useOwner();
  const router = useRouter();

  const handleNameUpdate = async () => {
    if (nameInput.trim()) {
      startUpdating(async() => {
        try {
          await updateDoc(doc(db, 'documents', id), {
            title: nameInput,
          });
          toast.success("Title updated successfully");
          router.replace(`/${nameInput.replaceAll(' ', '_')}/${id}`);
        } catch (error) {
          console.error("Error updating title:", error);
        }
      });
    }
  };

  useEffect(() => {
    if(docData){
      setNameInput(docData.title)
    }
  },[docData])

  return (
    <div className="flex-1 h-full bg-white dark:bg-slate-950 p-5">

      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form
          className="flex flex-1 space-x-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleNameUpdate()
          }}
        >
          <Input
            type="text"
            placeholder="Zen name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />

          <Button
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>

          {isOwner && (
            <>
              <InviteUser />

              <DeleteDocument />
            </>
          )}
        </form>
      </div>
      
      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />

        <Avatars />
      </div>

      <hr className="pb-10"/>

      <Editor />
    </div>
  )
}
export default Document