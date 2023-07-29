'use client'

import { useRef } from "react"

import { Loader } from "@googlemaps/js-api-loader"

const API_KEY = 'AIzaSyBxC2hxuRJ-HjyfgIUKekDIw_ndNOd9yQA'

export default function DestinationInput() {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const loader = new Loader({
        apiKey: API_KEY,
        version: "weekly",
        libraries: ["places"]
    })

    loader
        .importLibrary("places")
        .then(({ Autocomplete }) => {
            if (inputRef.current != null) {
                new Autocomplete(inputRef.current)
            }
        })
        .catch((e) => {
            console.log(e)
        })
    return (
        <input ref={inputRef} placeholder="Qual seu destino?" className="grow mx-5 lg:mx-0 text-black text-sm md:text-xl focus:outline-none" type="text" />
    )

}