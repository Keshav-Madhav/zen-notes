import LiveBlocksProvider from "@/components/LiveBlocksProvider"

type Props = {
  children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <LiveBlocksProvider>
      {children}
    </LiveBlocksProvider>
  )
}
export default layout