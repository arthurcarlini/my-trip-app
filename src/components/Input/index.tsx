"use client"
import { useState, FormEvent } from "react"

import { useRouter } from "next/navigation"

import InputTextField from "./autocompleteInput"

interface InputType {
    setShow: (value: boolean) => void
}

interface Place {
    placeId: string | undefined
    address: string | undefined
}

export default function Input({ setShow }: InputType) {
    const [origin, setOrigin] = useState({} as Place)
    const [destination, setDestination] = useState({} as Place)

    const router = useRouter()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setShow(false)
        router.push(`/place?origin=${origin.placeId}&destination=${destination.placeId}`)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <InputTextField
                label="Origem"
                placeholder="New York, USA"
                setPlaceDetails={setOrigin}
            />

            <InputTextField
                label="Destino"
                placeholder="Washington, USA"
                setPlaceDetails={setDestination}
            />

            <button className="w-20 h-10 p-2 transition-colors border border-neutral-400 hover:border-neutral-500 rounded-md">
                Buscar
            </button>
        </form>
    )
}
