'use client'

import { doc, updateDoc } from "firebase/firestore"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState, useTransition } from "react"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"

type Props = {
  id: string
}

const Document = ({id}: Props) => {
  const [nameInput, setNameInput] = useState('')
  const [isUpdating, startUpdating] = useTransition()
  const [docData, loading, error] = useDocumentData(doc(db, 'documents', id));

  const handleNameUpdate = () => {
    if(nameInput.trim()){
      startUpdating(async() => {
        await updateDoc(doc(db, 'documents', id), {
          title: nameInput,
        })
      })
    }
  }

  useEffect(() => {
    if(docData){
      setNameInput(docData.title)
    }
  },[docData])

  const addEmoji = (emoji: any) => {
    setNameInput((prevInput) => prevInput + emoji.native);
  };

  return (
    <div>

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
        </form>
      </div>
      
      <div>

      </div>

    </div>
  )
}
export default Document