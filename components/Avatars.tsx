'use client'

import { useOthers, useSelf } from "@liveblocks/react/suspense"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type Props = {}
const Avatars = (props: Props) => {
  const others = useOthers()
  const self = useSelf()

  const all = [self, ...others]

  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">
        Users currently editing this page
      </p>

      <div className="flex -space-5">
        {all.map((user, i) => (
          <TooltipProvider
            key={i}
            delayDuration={0}
          >
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="border-2 hover:z-50">
                  <AvatarImage src={user.info.avatar} />
                  <AvatarFallback>{user.info.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                {self.id === user.id ? "You" : user.info.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}
export default Avatars