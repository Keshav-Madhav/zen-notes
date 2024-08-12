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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { BotIcon, LanguagesIcon } from "lucide-react"
import { toast } from "sonner"
import Markdown from "react-markdown"

type Props = {
  doc: Y.Doc
}

type language = "english" | "french" | "spanish" | 'german' | 'hindi' | 'mandarin' | 'japanese' | 'russian' | 'arabic' 

const languages: language[] = ['english', 'french', 'spanish', 'german', 'hindi', 'mandarin', 'japanese', 'russian', 'arabic']

const TranslateDocument = ({ doc }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [language, setLanguage] = useState<language | ''>('')
  const [summary, setSummary] = useState<string>('')
  const [question, setQuestion] = useState<string>('')

  const handleTranslate = () => {
    startTransition(async() => {
      const documentdata = doc.get("document-store").toJSON();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDoc`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          docData: documentdata,
          targetLang: language
        })
      })

      if(res.ok){
        toast.success('Document translated successfully')
        const { translated_text } = await res.json()
        setSummary(translated_text)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LanguagesIcon size={16}/>
          Translate
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Translate Zen-do content</DialogTitle>
          <DialogDescription className="!mt-1">
            Select a language to translate the summary of the Zen-do.
          </DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-auto gap-2 p-5 bg-gray-100">
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
            handleTranslate()
          }}
          className="flex gap-2 items-center justify-start"
        >
          <Select
            value={language}
            onValueChange={(val) => setLanguage(val as language)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem
                  value={lang}
                  key={lang}
                  onSelect={() => setLanguage(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            type="submit" 
            disabled={isPending || !language}
          >
            {isPending ? "Translating..." : "Translate"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  )
}
export default TranslateDocument