"use client"
import { useState, useEffect, useRef } from "react"

import { useSearchParams } from "next/navigation"

export default function CityResume() {
    const searchParams = useSearchParams()
    const destinationPlaceId = searchParams.get("destination")

    const [placeAddress, setPlaceAddress] = useState("")

    const divRef = useRef(null)
    const placeServiceRef = useRef<null | google.maps.places.PlacesService>()

    useEffect(() => {
        if (!placeServiceRef.current && divRef.current) {
            placeServiceRef.current = new google.maps.places.PlacesService(divRef.current)
        }

        getPlaceAddressFromPlaceId()

        function getPlaceAddressFromPlaceId() {
            if (destinationPlaceId) {
                const request = {
                    placeId: destinationPlaceId,
                    fields: ["formatted_address"]
                }

                placeServiceRef.current?.getDetails(request, (res, status) => {
                    if (status === "OK" && res?.formatted_address) {
                        setPlaceAddress(res.formatted_address)
                        console.log(placeAddress)
                    }
                })
            }
        }
    }, [destinationPlaceId])

    return (
        <h1 ref={divRef} className="text-center font-semibold text-2xl mb-2">
            {placeAddress}
        </h1>
    )
}