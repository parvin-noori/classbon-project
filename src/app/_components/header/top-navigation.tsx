'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems:navigationMenuItem[]=[
    {
        title:'صفحه اصلی',
        href:'/'
    },
    {
        title:'دوره های ری اکت و نکست',
        href:'/courses'
    },{
        title:'مطالب و مقالات',
        href:"/blog"
    }
]


export const TopNavigation:React.FC=()=> {
    const pathname=usePathname()
    return (
        <ul className="flex gap-x-8">
{menuItems.map((item)=>{

const isActive=pathname===item.href
return <li key={`navigation-${item.href}`}>
    <Link href={item.href} className={`dark:hover:text-primary transition-colors ms-12 pb-2 ${isActive && `border-b-2 dark:text-primary dark:border-primary/30`}`}>{item.title}</Link>
</li>
})}
   </ul>
  )
}
