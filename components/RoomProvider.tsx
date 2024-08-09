'use client'

import { RoomProvider as LiveblocksRoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import LiveCursorProvider from './LiveCursorProvider'

type Props = {
  roomId: string
  children: React.ReactNode
}

const RoomProvider = ({roomId, children}: Props) => {
  return (
    <LiveblocksRoomProvider
      id={roomId}
      initialPresence={{
        cursor: null
      }}
    >
      <ClientSideSuspense  fallback={
        <div className='w-full h-full flex items-center justify-center'>
          <div className="loader m-auto"/>
        </div>
      }>
        <LiveCursorProvider>
          {children}
        </LiveCursorProvider>
      </ClientSideSuspense>
    </LiveblocksRoomProvider>
  )
}
export default RoomProvider