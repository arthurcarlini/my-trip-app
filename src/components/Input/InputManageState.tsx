'use client'
import { useState } from "react"
import { useApiContext } from "@/app/context/ApiContext"
import InputTextField from "./InputTextField"

export default function ManageState() {

    const { setOrigin, setDestination } = useApiContext()

    const [pointA, setPointA] = useState<google.maps.LatLngLiteral | null>(null)
    const [pointB, setPointB] = useState<google.maps.LatLngLiteral | null>(null)

    const setOriginAndDestination = () => {
        setOrigin(pointA)
        setDestination(pointB)
    }

    return (
        <>
            <InputTextField onPlacesChange={setPointA} placeholder="Origem" />
            <InputTextField onPlacesChange={setPointB} placeholder="Destino" />
            <button onClick={setOriginAndDestination} className="w-16 md:w-20 lg:w-28 h-10 md:h-14 mx-3 rounded-xl bg-blue-500 text-white lg:text-xl">Buscar</button>
        </>
    )
}