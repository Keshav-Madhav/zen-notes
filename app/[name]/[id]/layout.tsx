import RoomProvider from "@/components/RoomProvider"
import { auth } from "@clerk/nextjs/server"

type Props = {
  children: React.ReactNode
  params: {
    name: string
    id: string
  }
}

const layout = ({children, params: {name, id}}: Props) => {
  auth().protect();

  return (
    <RoomProvider
      roomId={id}
    >
      {children}
    </RoomProvider>
  )
}
export default layout