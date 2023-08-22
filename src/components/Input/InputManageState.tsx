'use client'
import { useState } from "react"
import { useApiContext } from "@/app/context/ApiContext"
import InputTextField from "./InputTextField"

interface City {
    name: string
    location: google.maps.LatLngLiteral
}

export default function ManageState() {

    const { setOriginCity, setDestinationCity } = useApiContext()

    const [pointA, setPointA] = useState({} as City)
    const [pointB, setPointB] = useState({} as City)

    const handleClick = () => {
        setOriginCity(pointA)
        setDestinationCity(pointB)
    }

    return (
        <>
            <InputTextField onPlacesChange={setPointA} placeholder="Origem" />
            <InputTextField onPlacesChange={setPointB} placeholder="Destino" />
            <button onClick={handleClick} className="w-16 md:w-20 lg:w-28 h-10 md:h-14 mx-3 rounded-xl bg-blue-500 text-white lg:text-xl">Buscar</button>
        </>
    )
}