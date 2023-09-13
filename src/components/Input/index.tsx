"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import InputTextField from "./autocompleteInput"
import { SearchRoundedIcon, ArrowBackIcon } from "../ui/icons"


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
    }

    if (show) {
        document.body.style.overflow = "hidden"
    } else document.body.style.overflow = "auto"

    return (
        <>
            <div className={`${show ? "block" : "hidden"} fixed inset-0 p-5 z-10 overflow-hidden bg-white`}>
                <div className="flex justify-between">
                    <button
                        className="h-10"
                        onClick={() => setShow(false)}>
                        <ArrowBackIcon />
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
        </>
    )
}


// telas maiores
{/* <div className="w-11/12 lg:w-4/5 xl:w-1/2 h-14 md:h-20 rounded-xl top-7 lg:top-auto lg:-bottom-10 flex items-center bg-white shadow">
</div> */}
{/* <button onClick={handleClick} className="hidden lg:block w-16 md:w-20 lg:w-28 h-10 md:h-14 mx-3 rounded-xl bg-blue-500 text-white lg:text-xl">Buscar</button> */ }