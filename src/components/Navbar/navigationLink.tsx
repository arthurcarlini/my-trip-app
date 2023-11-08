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

                return (
                    <li key={link.name}>
                        <Link
                            className={`font-bold transition-colors hover:text-black 
                            ${isActive ? "border-b-2 border-b-blue-500" : "text-neutral-500 hover:text-black"}`}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    </li>
                )
            })}
        </>
    )
}