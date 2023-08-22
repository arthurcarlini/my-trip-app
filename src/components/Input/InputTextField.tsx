'use client'

import { useEffect, useRef, useState } from "react"

import { useApiContext } from "@/app/context/ApiContext"

interface DestinationInputType {
    placeholder: string
    onPlacesChange: (value: {
        lat: number
        lng: number
    }) => void
}

export default function InputTextField({ placeholder, onPlacesChange }: DestinationInputType) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        initSearchBox()
    }, [])

    function initSearchBox() {
        if (inputRef.current !== null) {
            const searchbox = new window.google.maps.places.SearchBox(inputRef.current)

            searchbox.addListener("places_changed", () => {
                const places = searchbox.getPlaces()

                if (places?.length == 0) {
                    return
                }

                const place = places![0]

                const location = {
                    lat: place.geometry?.location?.lat() || 0,
                    lng: place.geometry?.location?.lng() || 0
                }

                onPlacesChange(location)
            })
        }
    }

    return (
        <>
            <input ref={inputRef} placeholder={placeholder} className="w-1/2 ml-3 text-black text-sm md:text-xl focus:outline-none" type="text" />
        </>
    )

}