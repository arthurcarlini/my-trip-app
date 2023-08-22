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
                const cityName = place.name

                const location = {
                    lat: place.geometry?.location?.lat() || 0,
                    lng: place.geometry?.location?.lng() || 0
                }
                
                if (cityName !== undefined) {
                    onPlacesChange({
                        name: cityName,
                        location,
                    })
                }
            })
        }
    }

    return (
        <>
            <input ref={inputRef} placeholder={placeholder} className="w-1/2 ml-3 text-black text-sm md:text-xl focus:outline-none" type="text" />
        </>
    )

}