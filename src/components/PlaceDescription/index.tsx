"use client"
import { useState, useEffect, useRef } from "react"

import { useSearchParams } from "next/navigation"

import { generateGPTResponse } from "@/app/utils/openai"

import PlaceDescriptionSkeleton from "./PlaceDescriptionSkeleton"

export default function PlaceDescription() {

    const searchParams = useSearchParams()
    const destinationPlaceId = searchParams.get("destination")

    const [GPTResponse, setGPTResponse] = useState("")

    const [placeAddress, setPlaceAddress] = useState<null | string>(null)

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
                    }
                })
            }
        }
    }, [destinationPlaceId])

    useEffect(() => {
        setGPTResponse("")
        getGPTResponse()
        async function getGPTResponse() {
            if (!placeAddress) {
                return
            }

            const res = await generateGPTResponse(placeAddress)

            if (res) {
                setGPTResponse(res)
            }
        }
    }, [placeAddress])

    return (
        <>
            <div ref={divRef}></div>
            {GPTResponse ?
                <div className="lg:w-1/2 md:mr-20">
                    <h2 className="font-semibold text-2xl mb-2">
                        Sobre o local
                    </h2>
                    <p>{GPTResponse}</p>
                </div>
                : <PlaceDescriptionSkeleton />
            }
        </>
    )
}