'use client'

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


type Props = {}
const BreadCrumbs = (props: Props) => {
  const pathname = usePathname()

  const segments = pathname.split('/')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
          
        <BreadcrumbSeparator/>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/${segments[1]}/${segments[2]}`}>
            <BreadcrumbPage>
              {segments[1].replaceAll('_', ' ')}
            </BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default BreadCrumbs