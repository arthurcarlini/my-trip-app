'use client'
import { useApiContext } from "@/app/context/ApiContext"

export default function InputButton() {
    const { setIsActive } = useApiContext()

    return (
        <button onClick={() => setIsActive(true)} className="w-16 md:w-20 lg:w-28 h-10 md:h-14 mr-3 rounded-xl bg-blue-500 text-white lg:text-xl">Buscar</button>
    )
}