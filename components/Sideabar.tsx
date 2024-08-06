import { MenuIcon } from "lucide-react"
import NewDocButton from "./NewDocButton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type Props = {}

const Sideabar = (props: Props) => {
  const menuOptions = (
    <>
      <NewDocButton/>
    </>
  )

  return (
    <div className="md:px-5 md:py-7 bg-gray-200 relative h-[calc(100dvh-5rem)]">
      <Sheet>
        <SheetTrigger className="md:hidden absolute bg-white rounded-full bottom-3 left-3 shadow-md hover:p-0.5 hover:bottom-2.5 hover:left-2.5 transition-all">
          <MenuIcon size={40} className="p-2 hover:opacity-30 rounded-lg"/>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col gap-8 w-[65%] max-w-[20rem]">
          <SheetHeader className="flex items-center justify-center">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <SheetDescription>
            {menuOptions}
          </SheetDescription>
        </SheetContent>
      </Sheet>

      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  )
}

export default Sideabar