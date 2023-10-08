'use client'

import { useEffect, useRef } from "react"

interface DestinationInputType {
    placeholder: string
    setPlaceDetails: (value: {
        placeId: string | undefined
        address: string | undefined
    }) => void
}

export default function InputTextField({ placeholder, setPlaceDetails }: DestinationInputType) {
    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    useEffect(() => {
        initAutocomplete()
        function initAutocomplete() {
            if (inputRef.current != null) {

                const options = {
                    fields: ["place_id", "formatted_address"],
                    type: ["(cities)"]
                }

                if (!autocompleteRef.current) {
                    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, options)
                }

                autocompleteRef.current.addListener("place_changed", getAndSetPlaceDetails)
            }
        }

        function getAndSetPlaceDetails() {
            const placeResponse = autocompleteRef.current?.getPlace()

            const place = {
                placeId: placeResponse?.place_id,
                address: placeResponse?.formatted_address
            }

            setPlaceDetails(place)
        }
    }, [setPlaceDetails])

    return (
        <input
            ref={inputRef}
            placeholder={placeholder}
            className="w-full h-10 p-2 mb-2 transition-color focus:outline-none border border-neutral-400 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 rounded-md"
            type="text"
        />
    )
}
