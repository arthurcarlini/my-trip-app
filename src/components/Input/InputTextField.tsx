'use client'

import { useEffect, useRef, useState } from "react"

import { googleMapsApi } from "@/app/api/googleApi"

interface DestinationInputType {
    setText: (value: string) => void
    placeholder: string
}

export default function InputTextField({ setText, placeholder }: DestinationInputType) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    function initAutocomplete(inputElement: HTMLInputElement) {
        googleMapsApi
            .importLibrary("places")
            .then(() => {
                const autocomplete = new google.maps.places.Autocomplete(inputElement)
                autocomplete.setFields(["name"])
                autocomplete.setTypes(["(cities)"])

                autocomplete.addListener("place_changed", () => {
                    const placeName = autocomplete.getPlace().name
                    if (placeName != undefined) {
                        setText(placeName)
                    }
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (inputRef.current != null) {
            initAutocomplete(inputRef.current)
        }
    }, [])


    return (
        <input ref={inputRef} placeholder={placeholder} className="grow mx-5 lg:mx-0 text-black text-sm md:text-xl focus:outline-none" type="text" />
    )

}