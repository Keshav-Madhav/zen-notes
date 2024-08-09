'use client'

import { LiveblocksProvider } from '@liveblocks/react/suspense'

type Props = {
  children: React.ReactNode
}
const LiveBlocksProvider = ({children}: Props) => {
  if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY){
    throw new Error('Missing NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY')
  }

  return (
    <LiveblocksProvider 
      authEndpoint='/auth-endpoint'
      throttle={16}
    >
      {children}
    </LiveblocksProvider>
  )
}
export default LiveBlocksProvider