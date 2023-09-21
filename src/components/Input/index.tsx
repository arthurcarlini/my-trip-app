"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import InputTextField from "./autocompleteInput"
import { SearchRoundedIcon, CloseIcon } from "../ui/icons"

interface Input {
    show: boolean
    setShow: (value: boolean) => void
}

interface Place {
    placeId: string | undefined
    address: string | undefined
}

export default function Input({ show, setShow }: Input) {
    const [origin, setOrigin] = useState({} as Place)
    const [destination, setDestination] = useState({} as Place)

    const router = useRouter()

    const handleClick = () => {
        router.push(`/place?origin=${origin.placeId}&destination=${destination.placeId}`)
        setShow(false)
    }

    if (show) {
        document.body.style.overflow = "hidden"
    } else document.body.style.overflow = "auto"

    return (
        <div className={`${show ? "block" : "hidden"} fixed inset-0 lg:p-40 z-10 bg-transparent backdrop-blur-md`}>
            <div className="h-full lg:h-auto p-5 bg-white rounded-lg">
                <div className="flex justify-between">
                    <button
                        className="h-10"
                        onClick={() => setShow(false)}>
                        <CloseIcon />
                    </button>
                    <button
                        className="h-10"
                        onClick={handleClick}>
                        <SearchRoundedIcon />
                    </button>
                </div>
                <div className="h-10 p-2 mb-2 border border-neutral-500 rounded-md">
                    <InputTextField
                        setPlaceDetails={setOrigin}
                        placeholder="Origem" />
                </div>
                <div className="h-10 p-2 mb-2 border border-neutral-500 rounded-md">
                    <InputTextField
                        setPlaceDetails={setDestination}
                        placeholder="Destino" />
                </div>
            </div>
        </div>
    )
}
