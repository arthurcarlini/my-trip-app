'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

interface NavigationLinkProps {
    navLinks: Array<LinkType>
}

interface LinkType {
    href: string
    name: string
}

export default function NavigationLink({ navLinks }: NavigationLinkProps) {
    const pathname = usePathname()
    return (
        <>
            {navLinks.map((link: LinkType) => {
                const isActive = pathname === link.href

                const activeStyle = "font-bold text-black transition-colors hover:text-black border-b-2 border-b-blue-500"
                const disableStyle = "font-bold text-neutral-500 transition-colors hover:text-black"
                return (
                    <Link
                        className={isActive ? activeStyle : disableStyle}
                        href={link.href}
                        key={link.name}
                    >
                        <li>
                            {link.name}
                        </li>
                    </Link>
                )
            })}
        </>
    )
}