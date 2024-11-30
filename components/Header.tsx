"use client"

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";
import DarkLightToggle from "./ui/DarkLightToggle";

type Props = {}

const Header = (props: Props) => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5 max-h-20 h-20 bg-gray-100 dark:bg-gray-900 ">
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

      <div className="flex items-center">
        <DarkLightToggle />

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>  
          <UserButton 
            appearance={{
              elements:{
                userButtonAvatarBox:{
                  height: 44,
                  width: 44
                }
              }
            }}
          />
        </SignedIn>
      </div>
    </div>
  )
}

export default Header