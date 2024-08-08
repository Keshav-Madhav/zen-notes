"use client"

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";

type Props = {}

const Header = (props: Props) => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5 max-h-20 h-20">
      {user && (
        <div className="h-fit w-fit flex items-center gap-2">
          <Image
            src='/zen-notes-logo.svg'
            alt='Zen Notes'
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl mb-1">{user?.firstName}{`'s`} Sanzen-dō</h1>
        </div>
      )}

      <BreadCrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>  
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Header