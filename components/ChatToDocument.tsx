'use client'

import * as Y from "yjs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { BotIcon, MessageCircleCode } from "lucide-react"
import { toast } from "sonner"
import Markdown from "react-markdown"
import { Input } from "./ui/input"

type Props = {
  doc: Y.Doc
}

const ChatToDocument = ({ doc }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [summary, setSummary] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [input, setInput] = useState<string>('')

  const handleChat = () => {
    setQuestion(input)
    startTransition(async() => {
      const documentdata = doc.get("document-store").toJSON();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatWithDoc`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          docData: documentdata,
          question: input
        })
      })

      if(res.ok){
        toast.success('Question answered successfully')
        const { message } = await res.json()
        setSummary(message)
        setInput("")
      } 
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageCircleCode size={16}/>
          Chat to Document
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Chat with the Zen-do content</DialogTitle>
          <DialogDescription className="!mt-1">
            Ask a question to the Zen-do content and get an answer.
          </DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500 dark:text-gray-400">Q: {question}</p>}
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-auto gap-2 p-5 bg-gray-100 dark:bg-gray-900">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GBT {isPending ? "is translating..." : "translated:"}
              </p>
            </div>
            <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleChat()
          }}
          className="flex gap-2 items-center justify-start"
        >
          <Input
            type="text"
            placeholder="Ask a question"
            value={input}
            onInput={(e) => setInput(e.currentTarget.value)}
            className="w-full"
          />

          <Button 
            type="submit" 
            disabled={isPending || !input}
          >
            {isPending ? "Asking..." : "Answer"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ChatToDocument