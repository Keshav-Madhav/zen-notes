"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { inviteUserToDoc } from "@/actions/actions"
import { toast } from "sonner"
import { Input } from "./ui/input"

type Props = {}

const InviteUser = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname();
  const router = useRouter();
  const roomId = pathname.split('/')[2]
  const roomName = pathname.split('/')[1].replaceAll('_', ' ')

  const handleInvite = (e : React.MouseEvent<HTMLButtonElement>) =>{
    if(!roomId) return;

    startTransition(async () => {
      const {success} = await inviteUserToDoc(roomId, email);

      if(success){
        setEmail('')
        toast.success(`User invited successfully`,{
          description: `An invitation has been sent to ${email}`
        })
      } else {
        toast.error("An error occured while inviting the user")
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite users to collaborate on {roomName}!</DialogTitle>
          <DialogDescription className="!mt-1">
            This will allow invited users to edit the contents of the Zen-do.
          </DialogDescription>
        </DialogHeader>

        <DialogDescription className="flex flex-col gap-1">
          <p className="font-medium">Enter the email address to invite user to collaborate on this Zen-do.</p>

          <div
            className="flex gap-2 "
          >
            <Input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full"
              required
            />  
            <Button
              type="submit"
              disabled={!email || isPending}
              onClick={(e) => {
                e.preventDefault()
                handleInvite(e)
              }}
            >
              {isPending ? 'Inviting...' : 'Invite'}
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default InviteUser