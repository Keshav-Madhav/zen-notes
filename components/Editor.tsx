'use client'

import { useRoom } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react"
import * as Y from "yjs"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "./ui/button"
import BlockNote from "./BlockNote"
import TranslateDocument from "./TranslateDocument"
import ChatToDocument from "./ChatToDocument"
import { useTheme } from "next-themes"

type Props = {}

const Editor = (props: Props) => {
  const room = useRoom()
  const [ doc, setDoc ] = useState<Y.Doc>()
  const [ provider, setProvider ] = useState<LiveblocksYjsProvider>()
  const { theme } = useTheme()

  useEffect(() => {
    const yDoc = new Y.Doc()
    const yProvider = new LiveblocksYjsProvider(room, yDoc)

    setDoc(yDoc)
    setProvider(yProvider)

    return () => {
      yProvider?.destroy()
      yDoc?.destroy()
    }
  }, [room])

  if(!doc || !provider) return null

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        <TranslateDocument doc={doc} />

        <ChatToDocument doc={doc} />
      </div>

      <BlockNote
        doc={doc}
        provider={provider}
        darkMode={theme === 'dark'}
      />
    </div>
  )
}
export default Editor