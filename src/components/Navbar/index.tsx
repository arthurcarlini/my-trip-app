import NavigationLink from "@/components/Navbar/navigationLink"

import { MenuRoundedIcon } from "@/components/ui/icons"

export default function Navbar() {
    return (
        <div className="fixed inset-x-0 grid grid-cols-3 items-center z-10 w-full h-16 md:h-20 px-2 lg:px-12 bg-white">
            <span className="font-montserrat font-bold text-xl md:text-2xl">MyTrip</span>
            <nav>
                <ul className="hidden lg:flex justify-center space-x-7">
                    <NavigationLink navLinks={[{ href: "/", name: "Início" }, { href: "/about", name: "Sobre" }]} />
                </ul>
            </nav>
            <button className="lg:hidden justify-self-end"><MenuRoundedIcon className="text-3xl md:text-4xl" /></button>
        </div>
    )
}