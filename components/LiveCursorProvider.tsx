'use client'

import { useMyPresence, useOthers } from "@liveblocks/react/suspense"
import FollowPointer from "./FollowPointer"

type Props = {
  children: React.ReactNode
}

const LiveCursorProvider = ({children}: Props) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const cursor = {x: Math.floor(event.pageX), y: Math.floor(event.pageY)};
    updateMyPresence({cursor});
  }

  const handlePointerLeave = () => {
    updateMyPresence({
      cursor: null
    });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {others.filter((others)=> others.presence.cursor !== null).map(({connectionId, presence, info}) => (
        <FollowPointer
          key={connectionId}
          info={info}
          x={presence.cursor!.x}
          y={presence.cursor!.y}
        />
      ))}

      {children}
    </div>
  )
}
export default LiveCursorProvider