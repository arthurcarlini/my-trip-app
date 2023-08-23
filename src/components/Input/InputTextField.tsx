'use client'

import { useEffect, useRef } from "react"

interface DestinationInputType {
    placeholder: string
    onPlacesChange: (value: {
        name: string
        location: google.maps.LatLngLiteral
    }) => void
}

export default function InputTextField({ placeholder, onPlacesChange }: DestinationInputType) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const searchboxRef = useRef<google.maps.places.SearchBox | null>(null)

    useEffect(() => {
        if (inputRef.current !== null) {
            initSearchBox(inputRef.current, onPlacesChange)
        }
    }, [])

    function initSearchBox(input: HTMLInputElement, onPlacesChange: (value: { name: string, location: google.maps.LatLngLiteral }) => void) {
        if (!searchboxRef.current) {
            searchboxRef.current = new window.google.maps.places.SearchBox(input)
        }

        searchboxRef.current.addListener("places_changed", () => {
            const places = searchboxRef.current?.getPlaces()

            if (places?.length == 0) {
                return
            }

            const place = places![0]
            const name = place.name

            const location = {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0
            }

            if (name !== undefined) {
                onPlacesChange({
                    name,
                    location,
                })
            }
        })
    }

    return (
        <>
            <input ref={inputRef} placeholder={placeholder} className="w-1/2 ml-3 text-black text-sm md:text-xl focus:outline-none" type="text" />
        </>
    )
}