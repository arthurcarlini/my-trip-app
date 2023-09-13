"use client"
import { useState } from "react"
import Link from "next/link"

import { MenuRoundedIcon, SearchRoundedIcon } from "@/components/ui/icons"
import NavigationLink from "@/components/Navbar/navigationLink"
import Input from "../Input"

export default function Navbar() {
    const [show, setShow] = useState(false)

    return (
        <div className="sticky top-0 z-10 w-full h-16 md:h-20 px-2 lg:px-12 bg-white">
            <nav className="flex items-center justify-between h-full">
                <Link href="/">
                    <span className="font-montserrat font-bold text-xl md:text-2xl">
                        MyTrip
                    </span>
                </Link>

                <ul className="hidden lg:flex justify-center space-x-7">
                    <NavigationLink navLinks={[{ href: "/", name: "Início" }, { href: "/about", name: "Sobre" }]} />
                </ul>

                <Input show={show} setShow={setShow} />

                <div className="flex items-center">
                    <button
                        onClick={() => setShow(true)}
                        className="w-10 h-10">
                        <SearchRoundedIcon />
                    </button>

                    <button className="w-10 h-10 lg:hidden">
                        <MenuRoundedIcon className="text-3xl md:text-4xl" />
                    </button>
                </div>
            </nav>
        </div>
    )
}